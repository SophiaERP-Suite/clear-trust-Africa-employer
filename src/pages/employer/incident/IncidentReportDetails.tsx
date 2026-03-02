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
  ArrowRight,
  User,
  MapPin,
  Calendar,
  Clock,
  Tag,
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

export interface IncidentReport {
  incidentReportId: number;
  incidentTitle: string;
  incidentTypeId: number;
  incidentType: string;
  incidentDate: string;
  description: string;
  incidentLocation: string;
  severityLevel: number;
  incidentStatus: number;
  dateCreated: string;
  hasInjury?: boolean;
  notifyEmployee?: boolean;
  accusedEmployee?: string;
  reporterName?: string;
  recorderName?: string;
}

export interface AccusedEmployee {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  profileImage: string;
  organisationId: number;
  identificationNumber: string;
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

export interface EscalationDto {
  partnerId: number;
  partnerName: string;
}

type ModalType = "add" | "edit" | "delete" | null;

export default function IncidentDetails() {
  const { irid } = useParams<{ irid: string }>();
  const decoded = hashids.decode(irid || "");
  const originalId = decoded.length > 0 ? Number(decoded[0]) : null;

  const [attachments, setAttachments] = useState<IncidentAttachment[]>([]);
  const [escalation, setEscalation] = useState<EscalationDto[]>([]);
  const [incident, setIncident] = useState<IncidentReport | null>(null);
  const [accused, setAccused] = useState<AccusedEmployee | null>(null);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const navigate = useNavigate();

  const [dbsPartners, setDbsPartners] = useState<DbsPartners[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string>("");

  const { user } = useAuth();
  const organisationId = user?.organisationId;

  // Load attachments
  useEffect(() => {
    if (!originalId) return;
    const loadAttachments = async () => {
      try {
        const data = await fetchIncidentAttachments(originalId);
        setAttachments(data);
        console.log("data", data)
      } catch (err: any) {
        console.error("Error loading attachments:", err);
      }
    };
    loadAttachments();
  }, [originalId]);

  // Load user info and incident details
  useEffect(() => {
    if (user) {
      setCurrentUserId(user?.userId);
      setCurrentUserName(user?.lastName + " " + user?.firstName);
    }
    fetchIncidentDetails();
  }, [user, originalId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchIncidentDetails = async () => {
    if (!originalId) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5181/api/IncidentReports/${originalId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch incident: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("result", result);
      const incidentData = result.data?.incident;
      const accusedData = result.data?.accussed;

      setIncident({
        ...incidentData,
        accusedEmployee: accusedData
          ? `${accusedData.firstName} ${accusedData.lastName}`
          : "-",
      });
      setAccused(accusedData || null);
    } catch (error) {
      console.error("Error fetching incident:", error);
      setIncident(null);
    } finally {
      setIsLoading(false);
    }
  };

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
    try {
      const deletion = await deleteIncidentAttachment(id);
      if (!deletion) { toast.error("Delete failed"); return; }
      const updatedAttachments = await fetchIncidentAttachments(Number(originalId));
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
        await uploadIncidentAttachment(originalId!, Number(organisationId), file, description);
        return file.name;
      });
      await Promise.all(uploadPromises);
      setNewFiles([]);
      const updatedAttachments = await fetchIncidentAttachments(Number(originalId));
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
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getStatusBadge = (status: number) => {
    const statuses: Record<number, { label: string; color: string }> = {
      1: { label: "Open", color: "bg-blue-100 text-blue-800" },
      2: { label: "In Progress", color: "bg-yellow-100 text-yellow-800" },
      3: { label: "Resolved", color: "bg-green-100 text-green-800" },
      4: { label: "Closed", color: "bg-gray-100 text-gray-800" },
    };
    const s = statuses[status] || statuses[1];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.color}`}>
        {s.label}
      </span>
    );
  };

  const handleCreateEscalation = async (dropdownValue?: string) => {
    if (!dropdownValue) { toast.error("Please select a partner"); return; }
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
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response) { toast.error("Escalation create unsuccessful"); return; }
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

  const closeModal = () => setModalType(null);

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
        <NavLink to="/IncidentMgt" className="btn btn-primary mt-4">Back to List</NavLink>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-8 footer-inner mx-auto main-container container">
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

      {/* Header */}
      <div className="mb-6">
        <div className="w-full mb-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex">
              <AlertTriangleIcon className="text-[rgb(112_22_208/0.9)] mr-2" size={36} />
              <div>
                <h3 className="mb-0 text-black">
                  Incident Report #{incident.incidentReportId}
                </h3>
                <p className="text-secondary-600 text-black flex items-center gap-1">
                  <NavLink to="/">Dashboard</NavLink>
                  <ChevronRightIcon size={14} />
                  <NavLink to="/IncidentMgt">Incident Management</NavLink>
                  <ChevronRightIcon size={14} />
                  Incident Details
                </p>
              </div>
            </div>

            <div className="flex gap-3 relative" ref={dropdownRef}>
              <NavLink to="/IncidentMgt" className="btn btn-warning flex items-center gap-2">
                <ArrowLeft size={18} /> Back to List
              </NavLink>

              <div className="relative inline-block text-left">
                <button
                  style={{ display: "none" }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="btn-primary btn flex items-center gap-2"
                >
                  <ChevronDown size={18} /> More Actions
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-3"
                        onClick={() => {
                          setIsOpen(false);
                          navigate(`/IncidentReportEdit/${hashids.encode(Number(originalId))}`);
                        }}
                      >
                        <Pen size={16} /> Edit Report
                      </button>

                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-3"
                        onClick={() => { setIsOpen(false); setShowChat(true); }}
                      >
                        <MessageSquareIcon size={16} /> Incident Comment
                      </button>

                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-3"
                        onClick={() => { setIsOpen(false); openAddModal(); }}
                      >
                        <ArrowUpNarrowWide size={16} /> Escalate Report
                      </button>

                      <div className="border-t my-1"></div>

                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 gap-3"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this incident report?")) {
                            console.log("Delete confirmed");
                          }
                          setIsOpen(false);
                        }}
                      >
                        <Trash2 size={16} /> Delete Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
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
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Incident Details Card */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b p-5 flex items-center justify-between">
              <h4 className="text-xl font-bold">Incident Details</h4>
              <div className="flex items-center gap-2">
                {getStatusBadge(incident.incidentStatus)}
                {getSeverityBadge(incident.severityLevel)}
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Tag size={12} /> Title
                  </p>
                  <p className="font-semibold text-black">{incident.incidentTitle || "-"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Tag size={12} /> Incident Type
                  </p>
                  <p className="font-semibold text-black">{incident.incidentType || "-"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <MapPin size={12} /> Location
                  </p>
                  <p className="font-semibold text-black">{incident.incidentLocation || "-"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Calendar size={12} /> Incident Date
                  </p>
                  <p className="font-semibold text-black">
                    {new Date(incident.incidentDate).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Clock size={12} /> Date Recorded
                  </p>
                  <p className="font-semibold text-black">
                    {new Date(incident.dateCreated).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Sustained Injury</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${incident.hasInjury ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                    {incident.hasInjury ? "Yes" : "No"}
                  </span>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Description</p>
                  <div
                    className="text-black bg-gray-50 rounded-lg p-4 border text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: incident.description || "-" }}
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Accused Employee Card */}
          {accused && (
            <div className="bg-white rounded-lg shadow-lg">
              <div className="border-b p-5">
                <h4 className="text-xl font-bold">Accused Employee</h4>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-5">
                  {accused.profileImage ? (
                    <img
                      src={accused.profileImage}
                      alt={`${accused.firstName} ${accused.lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={28} className="text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-black text-lg">
                      {accused.firstName} {accused.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{accused.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                    <p className="font-semibold text-black">{accused.phone || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Gender</p>
                    <p className="font-semibold text-black">{accused.gender || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date of Birth</p>
                    <p className="font-semibold text-black">
                      {accused.dateOfBirth
                        ? new Date(accused.dateOfBirth).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric",
                        })
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">ID Number</p>
                    <p className="font-semibold text-black">{accused.identificationNumber || "-"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Address</p>
                    <p className="font-semibold text-black">{accused.address || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attachments Card */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b p-5">
              <h4 className="text-xl font-bold">Attachments ({attachments.length})</h4>
            </div>

            <div className="p-5">
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
                  className={`cursor-pointer ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-black">Click to upload</p>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)</p>
                </label>
              </div>

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
                          <p className="text-sm font-medium text-black">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
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
                    {isUploading ? `Uploading ${newFiles.length} file(s)...` : `Upload ${newFiles.length} file(s)`}
                  </button>
                </div>
              )}

              {attachments.length > 0 ? (
                <div className="space-y-3 mt-6">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">Existing Attachments</h5>
                  {attachments.map((att) => (
                    <div
                      className="flex justify-between items-center border rounded-md p-4"
                      key={att.attachmentId}
                    >
                      <div className="flex items-center gap-3">
                        <FileIcon className="text-gray-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-black">{att.fileName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(att.dateCreated).toLocaleDateString("en-GB", {
                              day: "2-digit", month: "short", year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          className="btn btn-success btn-sm flex items-center gap-2"
                          href={att.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye size={16} /> View
                        </a>
                        <button
                          className="btn btn-danger btn-sm flex items-center gap-2"
                          onClick={() => handleDeleteAttachment(att.attachmentId)}
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">No attachments yet</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Quick Info */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b p-5">
              <h4 className="text-lg font-bold">Quick Info</h4>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Reported By</p>
                <p className="font-semibold text-black">{incident.reporterName || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Recorded By</p>
                <p className="font-semibold text-black">{incident.recorderName || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Accused Employee</p>
                <p className="font-semibold text-black">{incident.accusedEmployee || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Notify Employee</p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${incident.notifyEmployee ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                  {incident.notifyEmployee ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Accused Profile Summary */}
          {accused && (
            <div className="bg-white rounded-lg shadow-lg">
              <div className="border-b p-5">
                <h4 className="text-lg font-bold">Accused Profile</h4>
              </div>
              <div className="p-5 text-center">
                {accused.profileImage ? (
                  <img
                    src={accused.profileImage}
                    alt={`${accused.firstName} ${accused.lastName}`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 mx-auto mb-3"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
                    <User size={32} className="text-gray-500" />
                  </div>
                )}
                <p className="font-bold text-black">{accused.firstName} {accused.lastName}</p>
                <p className="text-sm text-gray-500 mt-1">{accused.email}</p>
                <p className="text-sm text-gray-500">{accused.phone}</p>
              </div>
            </div>
          )}

          {/* Escalations */}
          <div style={{ display: "none" }} className="bg-white rounded-lg shadow-lg">
            <div className="border-b p-5">
              <h4 className="text-lg font-bold">Escalations ({escalation.length})</h4>
            </div>
            {escalation.length > 0 ? (
              <div className="space-y-3 p-5">
                {escalation.map((e, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-black">
                    <ArrowRight size={14} className="text-gray-400" />
                    <span>{e.partnerName}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pb-5 pt-3 text-center text-gray-500 text-sm">
                There are no escalations
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}