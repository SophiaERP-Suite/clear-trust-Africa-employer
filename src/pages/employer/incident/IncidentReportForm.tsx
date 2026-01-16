import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AlertTriangleIcon,
  ChevronRightIcon,
  X,
  CheckCheck,
} from "lucide-react";
import { fetchApplicants } from "../../../utils/Requests/EmployeeRequests";
import hashids from "../../../utils/hashids";
import { useAuth } from "../../../utils/useAuth";

interface IncidentType {
  id: number;
  name: string;
}

interface Employee {
  userId: number;
  firstName: string;
  lastName: string;
}

interface IncidentReportFormData {
  incidentTitle: string;
  incidentTypeId: number;
  incidentDate: string;
  description: string;
  incidentLocation: string;
  reporterId: number | "";
  accusedEmployeeId: number | "";
  // recorderId: number | "";
  severityLevel: number;
  notifyEmployee: boolean;
  hasInjury: boolean;
  incidentStatus: number;
  organisationId: number;
}

export default function IncidentReportForm() {
  const { id } = useParams<{ id: string }>();
  const decoded = hashids.decode(id || "");
  const originalId = decoded.length > 0 ? Number(decoded[0]) : null;
  const navigate = useNavigate();
  const isEditMode = !!id;
  const decodedId = id ? (hashids.decode(id)[0] as number) : null;

  // Form state
  const [formData, setFormData] = useState<IncidentReportFormData>({
    incidentTitle: "",
    incidentTypeId: 0,
    incidentDate: "",
    description: "",
    incidentLocation: "",
    reporterId: "",
    accusedEmployeeId: "",
    // recorderId: "",
    severityLevel: 1,
    notifyEmployee: false,
    hasInjury: false,
    incidentStatus: 1,
    organisationId: 1,
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { user } = useAuth();
  const organisationId = user?.organisationId;

  // Incident Types
  const incidentTypes: IncidentType[] = [
    { id: 1, name: "Safety Violation" },
    { id: 2, name: "Policy Breach" },
    { id: 3, name: "Misconduct" },
    { id: 4, name: "Accident" },
    { id: 5, name: "Harassment" },
    { id: 6, name: "Other" },
  ];

  const severityLevels = [
    { value: 1, label: "Low", color: "text-green-600" },
    { value: 2, label: "Medium", color: "text-yellow-600" },
    { value: 3, label: "High", color: "text-orange-600" },
    { value: 4, label: "Critical", color: "text-red-600" },
  ];

  // Fetch employees
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetchApplicants(1, 200);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Employees data:", data.data?.users); // Debug log
        setEmployees(data.data?.users || []);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!isEditMode || !originalId) return;

    const fetchIncidentData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Authentication required");

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
          throw new Error(`Failed to fetch incident: ${errorText}`);
        }

        const incidentData = await response.json();
        console.log("Fetched incident data:", incidentData); // Debug log

        setFormData({
          incidentTitle: incidentData.incidentTitle || "",
          incidentTypeId: incidentData.incidentTypeId || 0,
          incidentDate: incidentData.incidentDate
            ? new Date(incidentData.incidentDate).toISOString().slice(0, 16)
            : "",
          description: incidentData.description || "",
          incidentLocation: incidentData.incidentLocation || "",
          reporterId: incidentData.reportedById || "",
          accusedEmployeeId: incidentData.accusedEmployeeId || "",
          // recorderId: incidentData.recordedById || "",
          severityLevel: incidentData.severityLevel || 1,
          notifyEmployee: incidentData.notifyEmployee || false,
          hasInjury: incidentData.hasInjury || false,
          incidentStatus: incidentData.incidentStatus || 1,
          organisationId: incidentData.organisationId || organisationId,
        });
      } catch (error) {
        console.error("Error fetching incident data:", error);
        alert("Failed to load incident data. Please try again.");
        navigate("/IncidentMgt");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidentData();
  }, [isEditMode, originalId, organisationId, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    console.log("Input change:", { name, value, type }); // Debug log

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "number" || name.includes("Id")) {
      const numValue = value === "" ? "" : Number(value);
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("Select change:", { name, value }); 
    const numValue = value === "" ? "" : Number(value);
    
    if (name === "reporterId") {
      setFormData((prev) => ({
        ...prev,
        reporterId: numValue,
      }));
    } 
    // else if (name === "recorderId") {
    //   setFormData((prev) => ({
    //     ...prev,
    //     recorderId: numValue,
    //   }));
    else if (name === "accusedEmployeeId") {
      setFormData((prev) => ({
        ...prev,
        accusedEmployeeId: numValue,
      }));
    } else {
      handleInputChange(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form data before submit:", formData); 

    if (
      !formData.reporterId ||
      // !formData.recorderId ||
      !formData.incidentTypeId
    ) {
      alert(
        "Please fill in all required fields (Reported By, Recorded By, and Incident Type)"
      );
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(10);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authentication required");

      const payload = {
        incidentTitle: formData.incidentTitle,
        incidentTypeId: Number(formData.incidentTypeId),
        incidentDate: new Date(formData.incidentDate).toISOString(),
        description: formData.description,
        incidentLocation: formData.incidentLocation,
        reportedById: Number(formData.reporterId),
        accusedEmployeeId: Number(formData.accusedEmployeeId) || 0,
        severityLevel: formData.severityLevel,
        notifyEmployee: formData.notifyEmployee,
        hasInjury: formData.hasInjury,
        incidentStatus: formData.incidentStatus,
        organisationId: Number(formData.organisationId),
      };


      let url: string;
      let method: string;

      if (isEditMode && originalId) {
        url = `http://localhost:5181/api/employer/IncidentReports/${originalId}/update`;
        method = "PUT";
      } else {
        url = `http://localhost:5181/api/employer/IncidentReports/${organisationId}/register`;
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to save incident report");
      }

      const savedIncident = await response.json();
      const incidentReportId =
        savedIncident.incidentReportId ?? savedIncident.id;

      if (!incidentReportId) {
        throw new Error("Incident ID not returned");
      }

      const hashIncidentId = hashids.encode(incidentReportId);

      setUploadProgress(100);
      navigate(`/IncidentReportDetails/${hashIncidentId}`);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the form"
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (isEditMode && decodedId) {
      navigate(`/IncidentReportDetails/${id}`);
    } else {
      navigate("/IncidentMgt");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 footer-inner mx-auto main-container container">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading incident data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 footer-inner mx-auto main-container container">
      {/* Header */}
      <div className="mb-6">
        <div className="w-full mb-8">
          <div className="row">
            <div className="col-md-12">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center">
                  {/* <button
                    onClick={handleCancel}
                    className="mr-4 btn btn-outline btn-sm"
                  >
                    <ArrowLeft size={18} />
                  </button> */}
                  <AlertTriangleIcon
                    className="text-[rgb(112_22_208/0.9)] mr-2"
                    size={36}
                  />
                  <div>
                    <h3 className="mb-0 text-black">
                      {isEditMode
                        ? "Edit Incident Report"
                        : "New Incident Report"}
                    </h3>
                    <p className="text-secondary-600 text-black">
                      Dashboard <ChevronRightIcon size={14} /> Incident
                      Management <ChevronRightIcon size={14} />{" "}
                      {isEditMode ? "Edit Report" : "New Report"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:grid-cols-2 gap-8">
        <div className="flex-auto w-full">
          <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded-lg -mt-2 dark:bg-dark-card">
            <div className="flex justify-between flex-auto p-6 border-b dark:border-secondary-800">
              <h4 className="mb-0 dark:text-white">
                {isEditMode ? "Edit Incident Report" : "Incident Report"}
              </h4>
              {isEditMode && (
                <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                  Editing Mode
                </span>
              )}
            </div>

            <div className="p-6">
              {/* Loading Progress */}
              {isSubmitting && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">
                      {uploadProgress < 30
                        ? "Preparing..."
                        : uploadProgress < 60
                        ? "Saving incident report..."
                        : uploadProgress < 100
                        ? "Processing..."
                        : "Complete!"}
                    </span>
                    <span className="text-sm font-medium text-blue-700">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Debug info - remove in production */}
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm hidden">
                <div>Debug Info:</div>
                <div>Reporter ID: {formData.reporterId}</div>
                {/* <div>Recorder ID: {formData.recorderId}</div> */}
                <div>Employees count: {employees.length}</div>
              </div>

              {/* Form */}
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Incident Title */}
                    <div className="lg:col-span-2">
                      <label className="block text-md text-black mb-2">
                        Incident Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="incidentTitle"
                        value={formData.incidentTitle}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter incident title"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Incident Type */}
                    <div>
                      <label className="block text-md text-black mb-2">
                        Incident Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="incidentTypeId"
                        value={formData.incidentTypeId}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        disabled={isSubmitting}
                      >
                        <option value={0}>Select Incident Type</option>
                        {incidentTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Incident Date */}
                    <div>
                      <label className="block text-md text-black mb-2">
                        Incident Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        name="incidentDate"
                        value={formData.incidentDate}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Incident Location */}
                    <div>
                      <label className="block text-md text-black mb-2">
                        Incident Location{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="incidentLocation"
                        value={formData.incidentLocation}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="e.g., Warehouse, Office Floor 2"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Severity Level */}
                    <div>
                      <label className="block text-md text-black mb-2">
                        Severity Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="severityLevel"
                        value={formData.severityLevel}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        disabled={isSubmitting}
                      >
                        {severityLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Reported By */}
                    <div>
                      <label className="block text-md text-black mb-2">
                        Reported By <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="reporterId" 
                        value={formData.reporterId}
                        onChange={handleSelectChange} 
                        className="form-control"
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp.userId} value={emp.userId}>
                            {emp.lastName} {emp.firstName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Accused Employee */}
                    <div>
                      <label className="block text-md text-black mb-2">
                        Accused Employee
                      </label>
                      <select
                        name="accusedEmployeeId"
                        value={formData.accusedEmployeeId}
                        onChange={handleSelectChange}
                        className="form-control"
                        disabled={isSubmitting}
                      >
                        <option value="">Select Employee (Optional)</option>
                        {employees.map((emp) => (
                          <option key={emp.userId} value={emp.userId}>
                            {emp.lastName} {emp.firstName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-2">
                      <label className="block text-md text-black mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={5}
                        className="form-control"
                        placeholder="Provide detailed description of the incident..."
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Checkboxes */}
                    <div className="lg:col-span-2 flex flex-wrap gap-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="hasInjury"
                          checked={formData.hasInjury}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500"
                          id="hasInjury"
                          disabled={isSubmitting}
                        />
                        <label
                          htmlFor="hasInjury"
                          className="ml-2 mb-0 text-md font-medium text-black"
                        >
                          Incident resulted in injury
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="notifyEmployee"
                          checked={formData.notifyEmployee}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500"
                          id="notifyEmployee"
                          disabled={isSubmitting}
                        />
                        <label
                          htmlFor="notifyEmployee"
                          className="ml-2 mb-0 text-md font-medium text-black"
                        >
                          Notify employee
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="btn btn-outline btn-secondary"
                    >
                      <X size={18} className="mr-2" />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-success"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {isEditMode ? "Updating..." : "Submitting..."}
                        </>
                      ) : (
                        <>
                          <CheckCheck size={18} className="mr-2" />
                          {isEditMode ? "Update Report" : "Submit Report"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}