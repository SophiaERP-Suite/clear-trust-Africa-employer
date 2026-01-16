import {
  MapPin,
  FileText,
  ChevronRightIcon,
  User,
  IdCard,
  Pen,
  Users2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../utils/useAuth";
import {
  fetchOrganisationData,
  fetchOrganisationDocs,
} from "../../../utils/Requests/OrganisationProfile";
import StatusBadge, { type EmployerStatus } from "./EmployerStatus";
import { NavLink } from "react-router-dom";

export interface EmployerOrgDto {
  organisationId: number;
  organisationTypeName: string;
  name: string;
  tin: string;
  registrationNumber: string;
  statusDisplay: string;
  status: EmployerStatus;
  address: string;
  dateCreated: string;
  dateOfBirth: string;
  usersCount: number;
}

export interface VerificationDocumentItem {
  documentType: string;
  fileUrl: string;
  fileName: string;
}

export interface VerificationDocumentsResponse {
  organisationId: number;
  tin?: string;
  documents: VerificationDocumentItem[];
}

export default function Profile() {
  const [employer, setEmployer] = useState<EmployerOrgDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<VerificationDocumentItem[]>([]);

  const { user } = useAuth();
  const organisationId = user?.organisationId;

  useEffect(() => {
    fetchOrgData();
    fetchOrgDocs();
  }, []);

  const fetchOrgDocs = async () => {
    try {
      setLoading(true);
      const response = await fetchOrganisationDocs(Number(organisationId));
      console.log("docs;", response.data);
      if (response?.data) {
        setDocs(response.data.documents);
      }
    } catch (error) {
      console.error("Error fetching employer docs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrgData = async () => {
    try {
      setLoading(true);
      const response = await fetchOrganisationData(Number(organisationId));

      if (response?.data) {
        if (Array.isArray(response.data)) {
          setEmployer(response.data[0] || null);
        } else {
          setEmployer(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching employer data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 mx-auto container">
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading organisation profile...</p>
        </div>
      </div>
    );
  }

  if (!employer) {
    return (
      <div className="p-6 lg:p-8 mx-auto container">
        <div className="text-center py-10">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No Organisation Found
          </h3>
          <p className="mt-2 text-gray-600">
            Unable to load organisation profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      {/* Header */}
      <div className="flex flex-wrap mb-6 justify-between gap-4">
        <div className="col-md-12">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex">
              <User className="text-[rgb(112_22_208/0.9)] mr-2 " size={36} />
              <div>
                <h3 className="mb-0 text-black">Profile</h3>
                <p className="text-secondary-600 text-black">
                  <NavLink to="/" className="hover:underline">
                    Dashboard
                  </NavLink>{" "}
                  <ChevronRightIcon size={14} /> Profile{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* HEADER */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 shadow-md">
          <div className="md:flex md:justify-between md:items-center">
            <div className="flex items-start gap-2">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">
                    {employer.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {employer.name}
                  </h2>
                  <StatusBadge status={employer.status} />
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  {employer.organisationTypeName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Member since{" "}
                  {employer.dateCreated
                    ? new Date(employer.dateCreated).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "N/A"}
                </p>
              </div>
            </div>

            <div>
              <NavLink
                to="/profileUpdate"
                className="flex items-center justify-center btn btn-info gap-2"
              >
                <Pen size={16} />
                Edit Profile
              </NavLink>
            </div>
          </div>
        </div>

        {/* COMPANY DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white text-md rounded-lg shadow p-5 flex items-start gap-3">
            <Users2 className="text-green-600 mt-1" />
            <div>
              <h6 className="font-semibold text-gray-700">Employees</h6>
              <p className="text-black">{employer.usersCount || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg text-md shadow p-5 flex items-start gap-3">
            <MapPin className="text-red-600 mt-1" />
            <div>
              <h6 className="font-semibold text-gray-700">Address</h6>
              <p className="text-black">{employer.address || "Not provided"}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg text-md shadow p-5 flex items-start gap-3">
            <FileText className="text-purple-600 mt-1" />
            <div>
              <h6 className="font-semibold text-gray-700">Business Reg No.</h6>
              <p className="text-black">
                {employer.registrationNumber || "Not provided"}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg text-md shadow p-5 flex items-start gap-3">
            <IdCard className="text-blue-600 mt-1" />
            <div>
              <h6 className="font-semibold text-gray-700">Tax ID No</h6>
              <p className="text-black">{employer.tin || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* DOCUMENT SECTION */}
        <div className="bg-white rounded-md border shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" /> Company Documents
            </h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm transition">
              + Upload Document
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document tYPE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {docs && docs.length > 0 ? (
                  docs.map((ed) => (
                    <tr key={Math.random()}>
                      {" "}
                      {/* Add a unique key */}
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                        {ed.documentType}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={ed.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-md text-black hover:underline"
                        >
                          {ed.fileName}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 text-center">
                      No documents available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
