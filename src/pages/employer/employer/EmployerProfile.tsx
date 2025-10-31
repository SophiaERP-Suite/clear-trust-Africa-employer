import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  FileText,
  Wallet,
  Edit3,
  ChevronRightIcon,
  User,
} from "lucide-react";
import princeton from "../../../assets2/img/princeton.png";

export default function Profile() {
  const employer = {
    name: "PrimeGate Facilities Ltd.",
    email: "contact@primegate.com",
    phone: "+234 802 123 4567",
    address: "12A Admiralty Way, Lekki Phase 1, Lagos",
    registrationNo: "RC-45219",
    verified: true,
    industry: "Security & Facility Management",
    lastPayment: "October 15, 2025",
    expenditure: "₦1,250,000",
    reports: 5,
    pendingInvestigations: 2,
    clearedInvestigations: 3,
  };

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
                  Dashboard <ChevronRightIcon size={14} /> Profile{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        {/* HEADER */}
        <div className=" bg-gradient-to-br from-blue-400/30 to-yellow-100/20 rounded-md border shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-48 h-48  flex items-center justify-center">
            {/* <Building2 size={50} className="text-blue-600" /> */}
            <img src={princeton} alt="logo" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {employer.name}
            </h2>
            <p className="text-gray-500 mb-2">{employer.industry}</p>

            {employer.verified ? (
              <div className="flex justify-center md:justify-start items-center gap-2">
                <ShieldCheck size={18} className="text-green-600" />
                <span className="text-green-700 font-medium">
                  Verified Company
                </span>
              </div>
            ) : (
              <p className="text-yellow-600 font-medium">
                Pending Verification
              </p>
            )}

            <a href="profileUpdate" className="mt-4 bg-[rgb(112_22_208/0.9)] text-white text-center px-5 py-2 rounded-md flex justify-center items-center gap-2 hover:bg-blue-700 transition mx-auto md:mx-0">
              <Edit3 size={16} /> Edit Profile
            </a>
          </div>
        </div>

        {/* COMPANY DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white rounded-lg shadow p-5 flex items-start gap-3">
            <Mail className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Email</h4>
              <p className="text-gray-500">{employer.email}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5 flex items-start gap-3">
            <Phone className="text-green-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Phone</h4>
              <p className="text-gray-500">{employer.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5 flex items-start gap-3">
            <MapPin className="text-red-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Address</h4>
              <p className="text-gray-500">{employer.address}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5 flex items-start gap-3">
            <FileText className="text-purple-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Registration No.</h4>
              <p className="text-gray-500">{employer.registrationNo}</p>
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

          

          <table className="min-w-full overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800 border dark:border-secondary-800">
            <thead>
              <tr className="bg-secondary-100 dark:bg-dark-bg">
                <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                  Document Name
                </th>
                <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center text-secondary-600 dark:text-secondary-500">
                  Proof of Office Address
                </td>
                <td className="px-6 py-4">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                    Rejected
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-secondary-600 dark:text-secondary-500">
                  Oct 10, 2025
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline text-sm">
                    Re-upload
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center text-secondary-600 dark:text-secondary-500">
                  CAC Certificate
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    Verified
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-secondary-600 dark:text-secondary-500">Sept 20, 2025</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline text-sm">
                    View
                  </button>
                </td>
              </tr>

              <tr className="border-t">
                <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center text-secondary-600 dark:text-secondary-500">
                  Tax Identification (TIN)
                </td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-secondary-600 dark:text-secondary-500">Oct 15, 2025</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline text-sm">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          <div className="bg-blue-600 text-white rounded-lg shadow p-5 flex items-center gap-4">
            <FileText size={36} />
            <div>
              <p className="text-sm">Reports Submitted</p>
              <p className="text-3xl font-bold">{employer.reports}</p>
            </div>
          </div>

          <div className="bg-yellow-500 text-white rounded-lg shadow p-5 flex items-center gap-4">
            <FileText size={36} />
            <div>
              <p className="text-sm">Pending Investigations</p>
              <p className="text-3xl font-bold">
                {employer.pendingInvestigations}
              </p>
            </div>
          </div>

          <div className="bg-green-600 text-white rounded-lg shadow p-5 flex items-center gap-4">
            <FileText size={36} />
            <div>
              <p className="text-sm">Cleared Investigations</p>
              <p className="text-3xl font-bold">
                {employer.clearedInvestigations}
              </p>
            </div>
          </div>
        </div>

        {/* PAYMENT SECTION */}
        <div className="bg-white rounded-md border shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Wallet size={20} className="text-blue-600" /> Payment Overview
            </h3>
            <button className="text-blue-600 text-sm hover:underline">
              Download Receipts
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Last Payment Date</p>
              <p className="font-medium text-gray-800">
                {employer.lastPayment}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Expenditure</p>
              <p className="font-medium text-gray-800">
                {employer.expenditure}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
