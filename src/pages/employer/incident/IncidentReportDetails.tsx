import { useState, useEffect, useRef } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import {
  AlertTriangleIcon,
  ChevronRightIcon,
  Upload,
  FileIcon,
  Trash2,
  ArrowLeft,
  ChevronDown,
  MessageSquareIcon,
  Pen,
  Eye,
  ArrowUpNarrowWide,
  CheckCheck,
} from "lucide-react";
import hashids from "../../../utils/hashids";
import {
  deleteIncidentAttachment,
  fetchIncidentAttachments,
  uploadIncidentAttachment,
} from "../../../utils/Requests/IncidentRequests";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../../utils/useAuth";
import ChatPanel from "../../../utils/ChatPanel";
import Modal from "../../../utils/modal";
import { fetchDbsPartners } from "../../../utils/Requests/IncidentEscalationRequests";

interface IncidentReport {
  incidentReportId: number;
  incidentTitle: string;
  incidentTypeId: number;
  accusedEmployee: string;
  reporterName: string;
  recorderName: string;
  incidentDate: string;
  description: string;
  incidentLocation: string;
  severityLevel: number;
  incidentStatus: number;
  dateCreated: string;
}

export interface IncidentAttachment {
  attachmentId: number;
  incidentReportId: number;
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileSize: number;
  dateCreated: string;
}

export interface DbsPartners {
  partnerId: number;
  partnerName: string;
}

type ModalType = "add" | "edit" | "delete" | null;

export default function IncidentDetails() {
  const { irid } = useParams<{ irid: string }>();
  const decoded = hashids.decode(irid || "");
  const originalId = decoded.length > 0 ? Number(decoded[0]) : null;
  const [attachments, setAttachments] = useState<IncidentAttachment[]>([]);
  const [incident, setIncident] = useState<IncidentReport | null>(null);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const navigate = useNavigate();
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(
    null
  );
  const [dbsPartners, setDbsPartners] = useState<DbsPartners[]>([]);

  const { user } = useAuth();
  const organisationId = user?.organisationId;

  useEffect(() => {
    if (!originalId) return;

    const controller = new AbortController();

    const loadAttachments = async () => {
      try {
        setIsLoading(true);

        const data = await fetchIncidentAttachments(originalId);
        setAttachments(data);
        console.log("attachment:", data);
      } catch (err: any) {
        console.error("Error loading attachments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAttachments();

    return () => controller.abort();
  }, [originalId]);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string>("");

  useEffect(() => {
    getDbsPartners();
  }, []);

  const getDbsPartners = async () => {
    try {
      const data = await fetchDbsPartners();
      setDbsPartners(data);
      console.log("dbs", data);
    } catch (err: any) {
      console.error("Error fetching partners:", err);
      toast.error("Failed to load partners");
    }
  };

  useEffect(() => {
    if (user) {
      setCurrentUserId(user?.userId);
      setCurrentUserName(user?.lastName + " " + user?.firstName);
    }
  }, [user]);

  useEffect(() => {
    fetchIncidentDetails();
    if (originalId) {
      fetchIncidentAttachments(Number(originalId));
    }
  }, [originalId]);

  const fetchIncidentDetails = async () => {
    if (!originalId) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5181/api/employer/IncidentReports/${originalId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch incident: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      setIncident(data);
    } catch (error) {
      console.error("Error fetching incident:", error);
      setIncident(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const partnerOptions = dbsPartners.map((partner) => ({
    value: partner.partnerId.toString(),
    label: partner.partnerName,
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setNewFiles(Array.from(files));
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleDeleteAttachment = async (id: number) => {
    // if (!window.confirm("Are you sure you want to delete this attachment?")) {
    //   return;
    // }

    try {
      const deletion = await deleteIncidentAttachment(id);

      if (!deletion) {
        toast.error("Delete failed");
        return;
      }

      const updatedAttachments = await fetchIncidentAttachments(
        Number(originalId)
      );
      setAttachments(updatedAttachments);
      toast.success("Delete Successful");
    } catch (error) {
      console.error("Error deleting attachment:", error);
      toast.error("Delete failed");
    }
  };

  const handleUpload = async () => {
    if (newFiles.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = newFiles.map(async (file) => {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const description = `Evidence file (${fileExtension || "unknown"})`;

        await uploadIncidentAttachment(
          originalId!,
          Number(organisationId),
          file,
          description
        );
        return file.name;
      });

      await Promise.all(uploadPromises);

      setNewFiles([]);
      const updatedAttachments = await fetchIncidentAttachments(
        Number(originalId)
      );
      setAttachments(updatedAttachments);
      toast.success("Upload successful");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Upload Failed");
    } finally {
      setIsUploading(false);
    }
  };

  const getSeverityBadge = (level: number) => {
    const badges = {
      1: { label: "Low", color: "bg-green-100 text-green-800" },
      2: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
      3: { label: "High", color: "bg-orange-100 text-orange-800" },
      4: { label: "Critical", color: "bg-red-100 text-red-800" },
    };
    const badge = badges[level as keyof typeof badges] || badges[1];
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}
      >
        {badge.label}
      </span>
    );
  };

  if (isLoading && !incident) {
    return (
      <div className="p-6 text-center">
        <p>Loading incident details...</p>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="p-6 text-center">
        <p>Incident not found</p>
        <NavLink to="/incidentMgt" className="btn btn-primary mt-4">
          Back to List
        </NavLink>
      </div>
    );
  }

  const handleCreateEscalation = async (dropdownValue?: string) => {
    if (!dropdownValue) {
      toast.error("Please select a partner");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        partnerId: parseInt(dropdownValue),
        description: incident?.description || "",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        resolutionDetails: incident?.description || "",
        escalationStatus: 1,
      };

      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5181/api/employer/IncidentEscalation/${organisationId}/${decoded}/register`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response) {
        toast.error("Escalation create unsuccessful");
        return;
      }

      toast.success("Escalation created successfully");
      closeModal();
    } catch (error) {
      console.error("Escalation error:", error);
      toast.error("Escalation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    if (dbsPartners.length === 0) {
      toast.warning("No partners available. Please add partners first.");
      return;
    }
    setModalType("add");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedPartnerId(null);
  };

  return (
    <div className="p-5 lg:p-8 footer-inner mx-auto main-container container">
      {/* Header */}
      <ToastContainer />

      <Modal
        isOpen={modalType === "add"}
        title="Create Escalation"
        confirmText="Create Escalation"
        confirmColor="green"
        loading={isLoading}
        dropdownLabel="Select Partner"
        dropdownOptions={partnerOptions}
        dropdownPlaceholder="Choose a partner to escalate to..."
        headerIcon={<ArrowUpNarrowWide />}
        butonIcon={<CheckCheck />}
        onConfirm={({ dropdownValue }: { dropdownValue?: string }) =>
          handleCreateEscalation(dropdownValue)
        }
        onCancel={closeModal}
        message=""
      />

      <div className="mb-6">
        <div className="w-full mb-8">
          <div className="row">
            <div className="col-md-12">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex">
                  <AlertTriangleIcon
                    className="text-[rgb(112_22_208/0.9)] mr-2"
                    size={36}
                  />
                  <div>
                    <h3 className="mb-0 text-black">
                      Incident Report #{incident.incidentReportId}
                    </h3>
                    <p className="text-secondary-600 text-black">
                      <NavLink to="/">Dashboard</NavLink>
                      <ChevronRightIcon size={14} />
                      <NavLink to="/IncidentMgt">Incident Management </NavLink>
                      <ChevronRightIcon size={14} />
                      Incident Details
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 relative" ref={dropdownRef}>
                  <NavLink
                    to="/incidentMgt"
                    className="btn btn-warning flex items-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Back to List
                  </NavLink>

                  {/* Dropdown Container */}
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="btn-primary btn flex items-center gap-2"
                    >
                      <ChevronDown size={18} />
                      More Action
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-3"
                            onClick={() => {
                              setIsOpen(false);
                              navigate(
                                `/IncidentReportEdit/${hashids.encode(
                                  Number(originalId)
                                )}`
                              );
                            }}
                          >
                            <Pen size={16} />
                            Edit Report
                          </button>

                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-3"
                            onClick={() => {
                              setIsOpen(false);
                              openAddModal();
                            }}
                          >
                            <ArrowUpNarrowWide size={16} />
                            Escalate Report
                          </button>

                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-3"
                            onClick={() => {
                              setIsOpen(false);
                              setShowChat(true);
                            }}
                          >
                            <MessageSquareIcon size={16} />
                            Incident Comment
                          </button>

                          <div className="border-t my-1"></div>

                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-red-50 gap-3"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to close this report?"
                                )
                              ) {
                                console.log("Delete confirmed");
                                // Add delete logic here
                              }
                              // setIsOpen(false);
                            }}
                          >
                            <CheckCheck size={16} />
                            Confirm Closure
                          </button>
                          {/* <button
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 gap-3"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this incident report?"
                                )
                              ) {
                                console.log("Delete confirmed");
                                // Add delete logic here
                              }
                              setIsOpen(false);
                            }}
                          >
                            <Trash2 size={16} />
                            Delete Report
                          </button> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showChat &&
        originalId !== null &&
        currentUserId !== null &&
        organisationId !== null &&
        typeof organisationId === "number" && (
          <ChatPanel
            incidentReportId={originalId}
            currentUserId={currentUserId}
            organisationId={organisationId}
            currentUserName={currentUserName}
            onClose={() => setShowChat(false)}
          />
        )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Incident Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="border-b">
              <h4 className="text-xl font-bold p-5 flex items-center justify-between">
                <span>Incident Details</span>
                {getSeverityBadge(incident.severityLevel)}
              </h4>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-black mb-1">Title</p>
                  <p className="font-semibold text-black">
                    {incident.incidentTitle}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-black mb-1">Location</p>
                  <p className="font-semibold text-black">
                    {incident.incidentLocation}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-black mb-1">Incident Date</p>
                  <p className="font-semibold text-black">
                    {new Date(incident.incidentDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-black mb-1">Date Created</p>
                  <p className="font-semibold text-black">
                    {new Date(incident.dateCreated).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-black font-semibold mb-1">
                    Description
                  </p>
                  <p className="text-black">{incident.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b">
              <div className="p-5">
                <h4 className="text-xl font-bold">
                  Attachments ({attachments.length})
                </h4>
              </div>
            </div>

            {/* Upload New Files */}
            <div className="border-t p-5">
              <h5 className="text-sm font-semibold text-gray-700 mb-3">
                Add New Attachments (Evidence, convictions, etc)
              </h5>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center mb-4">
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                  disabled={isUploading}
                />
                <label
                  htmlFor="fileUpload"
                  className={`cursor-pointer ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-black">Click to upload</p>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                  </p>
                </label>
              </div>

              {/* Selected Files (Not yet uploaded) */}
              {newFiles.length > 0 && (
                <div className="space-y-2 mb-4">
                  {newFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center gap-3">
                        <FileIcon className="text-blue-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-black">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNewFile(index)}
                        className="text-red-600 hover:text-red-800"
                        disabled={isUploading}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleUpload}
                    disabled={isUploading || newFiles.length === 0}
                    className="btn btn-success disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full"
                  >
                    <Upload size={18} />
                    {isUploading
                      ? `Uploading ${newFiles.length} file(s)...`
                      : `Upload ${newFiles.length} file(s)`}
                  </button>
                </div>
              )}

              {/* Existing Attachments */}
              {attachments.length > 0 ? (
                <div className="space-y-3 mt-6">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">
                    Existing Attachments
                  </h5>
                  {attachments.map((att) => (
                    <div
                      className="flex justify-between items-center border rounded-md p-4"
                      key={att.attachmentId}
                    >
                      <div className="flex items-center gap-3">
                        <FileIcon className="text-gray-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-black">
                            {att.fileName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(att.dateCreated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          className="btn btn-success btn-sm flex items-center gap-2"
                          href={`http://localhost:5181${att.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye size={16} /> View
                        </a>

                        <button
                          className="btn btn-danger btn-sm flex items-center gap-2"
                          onClick={() =>
                            handleDeleteAttachment(att.attachmentId)
                          }
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No attachments yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div>
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b">
              <div className="p-5">
                <h4 className="text-lg font-bold">Quick Info</h4>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="text-sm text-gray-600 mb-1">Reported By</p>
                <p className="font-semibold text-black">
                  {incident.reporterName || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Recorded By</p>
                <p className="font-semibold text-black">
                  {incident.recorderName || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Accused Employee</p>
                <p className="font-semibold text-black">
                  {incident.accusedEmployee || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
