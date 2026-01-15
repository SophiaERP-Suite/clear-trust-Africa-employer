import {
  ShieldCheck,
  Phone,
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
import { fetchOrganisationData } from "../../../utils/Requests/OrganisationProfile";
import StatusBadge from "./EmployerStatus";
import { NavLink } from "react-router-dom";

export interface EmployerOrgDto {
  organisationId: number;
  organisationTypeName: string;
  name: string;
  tin: string;
  registrationNumber: string;
  statusDisplay: string;
  status: number;
  address: string;
  dateCreated: string;
  dateOfBirth: string;
  usersCount: number;
}

export default function Profile() {
  const [employer, setEmployer] = useState<EmployerOrgDto | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const organisationId = user?.organisationId;

  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    try {
      setLoading(true);
      const response = await fetchOrganisationData(Number(organisationId));
      
      if (response?.data) {
        // Handle if API returns array (take first item)
        if (Array.isArray(response.data)) {
          setEmployer(response.data[0] || null);
        } else {
          // Handle if API returns single object
          setEmployer(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching employer data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
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

  // Show if no data
  if (!employer) {
    return (
      <div className="p-6 lg:p-8 mx-auto container">
        <div className="text-center py-10">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Organisation Found</h3>
          <p className="mt-2 text-gray-600">Unable to load organisation profile.</p>
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
                  <NavLink to="/" className="hover:underline">Dashboard</NavLink>{" "}
                  <ChevronRightIcon size={14} /> Profile{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
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
                  {employer.dateCreated ? new Date(employer.dateCreated).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }) : "N/A"}
                </p>
              </div>
            </div>

            <div>
              <NavLink
                to="/profileUpdate"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors mt-5 lg:mt-1"
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
              <h6 className="font-semibold text-gray-700">Registration No.</h6>
              <p className="text-black">{employer.registrationNumber || "Not provided"}</p>
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
        <div className="bg-white rounded-md border shadow p-6">
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
                    Document Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                    Proof of Office Address
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Rejected
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    Oct 10, 2025
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Re-upload
                    </button>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                    CAC Certificate
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    Sept 20, 2025
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                    Tax Identification (TIN)
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    Oct 15, 2025
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}