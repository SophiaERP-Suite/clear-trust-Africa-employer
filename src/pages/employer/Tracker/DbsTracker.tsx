import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Download,
  // Plus,
  Eye,
  RefreshCw,
  FileText,
  Bell,
  XCircle,
  ListChecks,
  ClockAlert,
  ClockFading,
  Hourglass,
  ChevronRightIcon,
} from "lucide-react";

export default function DBSTrackerModule() {
  const [activeView, setActiveView] = useState("dashboard");
  //   const [selectedCheck, setSelectedCheck] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample DBS checks data
  const dbsChecks = [
    {
      id: "DBS-2025-001",
      employeeName: "Sarah Johnson",
      employeeId: "EMP-1001",
      department: "Healthcare",
      position: "Senior Nurse",
      checkType: "Enhanced",
      status: "Valid",
      applicationDate: "2025-01-05",
      issueDate: "2025-01-20",
      expiryDate: "2025-01-20",
      certificateNumber: "DBS-001234567890",
      result: "Clear",
      updateService: true,
      lastUpdated: "2025-01-28",
      daysUntilExpiry: 357,
      photo:
        "https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff",
    },
    {
      id: "DBS-2025-002",
      employeeName: "Michael Chen",
      employeeId: "EMP-1002",
      department: "Education",
      position: "Teacher",
      checkType: "Enhanced with Barred List",
      status: "Expiring Soon",
      applicationDate: "2023-11-10",
      issueDate: "2023-11-25",
      expiryDate: "2025-11-25",
      certificateNumber: "DBS-001234567891",
      result: "Clear",
      updateService: true,
      lastUpdated: "2025-01-15",
      daysUntilExpiry: 30,
      photo:
        "https://ui-avatars.com/api/?name=Michael+Chen&background=3b82f6&color=fff",
    },
    {
      id: "DBS-2025-003",
      employeeName: "Emma Williams",
      employeeId: "EMP-1003",
      department: "Social Care",
      position: "Care Worker",
      checkType: "Enhanced",
      status: "Expired",
      applicationDate: "2022-12-01",
      issueDate: "2022-12-18",
      expiryDate: "2023-12-18",
      certificateNumber: "DBS-001234567892",
      result: "Clear",
      updateService: false,
      lastUpdated: "2023-06-10",
      daysUntilExpiry: -41,
      photo:
        "https://ui-avatars.com/api/?name=Emma+Williams&background=ef4444&color=fff",
    },
    {
      id: "DBS-2025-004",
      employeeName: "James Anderson",
      employeeId: "EMP-1004",
      department: "Administration",
      position: "Office Manager",
      checkType: "Standard",
      status: "Pending",
      applicationDate: "2025-01-22",
      issueDate: null,
      expiryDate: null,
      certificateNumber: null,
      result: "Pending",
      updateService: false,
      lastUpdated: "2025-01-22",
      daysUntilExpiry: null,
      photo:
        "https://ui-avatars.com/api/?name=James+Anderson&background=f59e0b&color=fff",
    },
    {
      id: "DBS-2025-005",
      employeeName: "Lisa Martinez",
      employeeId: "EMP-1005",
      department: "Healthcare",
      position: "Junior Doctor",
      checkType: "Enhanced",
      status: "Under Review",
      applicationDate: "2025-01-18",
      issueDate: null,
      expiryDate: null,
      certificateNumber: null,
      result: "Under Review",
      updateService: true,
      lastUpdated: "2025-01-26",
      daysUntilExpiry: null,
      photo:
        "https://ui-avatars.com/api/?name=Lisa+Martinez&background=8b5cf6&color=fff",
    },
    {
      id: "DBS-2025-006",
      employeeName: "David Thompson",
      employeeId: "EMP-1006",
      department: "Education",
      position: "Teaching Assistant",
      checkType: "Enhanced with Barred List",
      status: "Valid",
      applicationDate: "2023-09-15",
      issueDate: "2023-10-02",
      expiryDate: "2025-10-02",
      certificateNumber: "DBS-001234567893",
      result: "Clear",
      updateService: true,
      lastUpdated: "2025-01-10",
      daysUntilExpiry: 247,
      photo:
        "https://ui-avatars.com/api/?name=David+Thompson&background=10b981&color=fff",
    },
  ];

  // Dashboard statistics
  const stats = {
    total: dbsChecks.length,
    valid: dbsChecks.filter((c) => c.status === "Valid").length,
    expiringSoon: dbsChecks.filter((c) => c.status === "Expiring Soon").length,
    expired: dbsChecks.filter((c) => c.status === "Expired").length,
    pending: dbsChecks.filter(
      (c) => c.status === "Pending" || c.status === "Under Review"
    ).length,
    complianceRate: Math.round(
      (dbsChecks.filter((c) => c.status === "Valid").length /
        dbsChecks.length) *
        100
    ),
  };

  //   const getStatusColor = (status) => {
  //     const colors = {
  //       'Valid': 'bg-green-100 text-green-800 border-green-200',
  //       'Expiring Soon': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  //       'Expired': 'bg-red-100 text-red-800 border-red-200',
  //       'Pending': 'bg-blue-100 text-blue-800 border-blue-200',
  //       'Under Review': 'bg-purple-100 text-purple-800 border-purple-200'
  //     };
  //     return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  //   };

  //   const getStatusIcon = (status) => {
  //     switch(status) {
  //       case 'Valid': return <CheckCircle className="text-green-600" size={20} />;
  //       case 'Expiring Soon': return <Clock className="text-yellow-600" size={20} />;
  //       case 'Expired': return <XCircle className="text-red-600" size={20} />;
  //       case 'Pending': return <Clock className="text-blue-600" size={20} />;
  //       case 'Under Review': return <AlertTriangle className="text-purple-600" size={20} />;
  //       default: return <Shield size={20} />;
  //     }
  //   };

  const filteredChecks = dbsChecks.filter((check) => {
    const matchesSearch =
      check.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      check.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      check.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || check.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-8 footer-inner mx-auto main-container container">
      {/* Header */}
      <div className="mb-6">
        <div className="w-full mb-8">
          <div className="row">
            <div className="col-md-12">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex">
                  <Shield className="text-[rgb(112_22_208/0.9)] mr-2" size={36} />
                  <div>
                    <h3 className="mb-0 text-black">
                      DBS Tracker & Compliance
                    </h3>
                    <p className="text-secondary-600 text-black">
                      Dashboard <ChevronRightIcon size={14} /> DBS Tracker{" "}
                    </p>
                  </div>
                </div>

                <div>
                  {/* <a
                    href="applicantNew"
                    className="btn btn-primary"
                  >
                    <Plus size={18} className="mr-2" />
                    Add New
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Checks */}
          {/* <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <List className="text-white text-xl" />
            </div>
            <div>
              <p className="text-sm text-blue-50">Total Checks</p>
              <h2 className="text-3xl font-bold text-white">{stats.total}</h2>
            </div>
          </div> */}

          {/* Valid */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <ListChecks className="text-white text-xl" />
            </div>
            <div>
              <p className="text-sm text-green-50">Active</p>
              <h2 className="text-3xl font-bold text-white">{stats.valid}</h2>
            </div>
          </div>

          {/* Pending */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <Hourglass className="text-white text-xl" />
            </div>
            <div>
              <p className="text-sm text-purple-50">Pending</p>
              <h2 className="text-3xl font-bold text-white">{stats.pending}</h2>
            </div>
          </div>

          {/* Expiring Soon */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <ClockAlert className="text-white text-xl" />
            </div>
            <div>
              <p className="text-sm text-yellow-50">Expiring Soon</p>
              <h2 className="text-3xl font-bold text-white">
                {stats.expiringSoon}
              </h2>
            </div>
          </div>

          {/* Expired */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <ClockFading className="text-white text-xl" />
            </div>
            <div>
              <p className="text-sm text-red-50">Expired</p>
              <h2 className="text-3xl font-bold text-white">{stats.expired}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200 mb-8 w-fit">
        {[
          { id: "dashboard", label: "Dashboard", icon: Shield },
          { id: "checks", label: "All Checks", icon: FileText },
          {
            id: "alerts",
            label: "Alerts",
            icon: Bell,
            badge: stats.expiringSoon + stats.expired,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-2 font-semibold transition-all ${
                activeView === tab.id
                  ? "bg-black text-white shadow-lg rounded-lg border"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} />
              {tab.label}
              {tab.badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      {activeView === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expiring Soon */}
          <div className="relative flex flex-col max-h-[420px] mb-8 lg:mb-0 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
              <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                <h4 className="mb-0 text-xl font-bold dark:text-white">
                  {" "}
                  <Clock className="text-yellow-500" /> Expiring Soon (30 Days)
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4">
                <div className="space-y-3">
                  {dbsChecks
                    .filter((c) => c.status === "Expiring Soon")
                    .map((check) => (
                      <div
                        key={check.id}
                        className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={check.photo}
                            alt={check.employeeName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-sm">
                              {check.employeeName}
                            </div>
                            <div className="text-xs text-gray-600">
                              {check.department} • {check.position}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-yellow-700 font-semibold">
                          Expires in {check.daysUntilExpiry} days
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expired */}
          <div className="relative flex flex-col max-h-[420px] mb-8 lg:mb-0 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
              <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                <h3 className="mb-0 font-bold text-xl dark:text-white">
                  {" "}
                  <XCircle className="text-red-500" /> Expired Checks
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4">
                <div className="space-y-3">
                  {dbsChecks
                    .filter((c) => c.status === "Expired")
                    .map((check) => (
                      <div
                        key={check.id}
                        className="p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={check.photo}
                            alt={check.employeeName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-sm">
                              {check.employeeName}
                            </div>
                            <div className="text-xs text-gray-600">
                              {check.department} • {check.position}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-red-700 font-semibold">
                          Expired 2 days ago
                        </div>
                        <button className="mt-2 w-full bg-red-600 text-white text-xs py-1 rounded hover:bg-red-700">
                          Urgent: Renew Now
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="relative flex flex-col max-h-[420px] mb-8 lg:mb-0 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
              <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                <h3 className="mb-0 font-bold text-xl dark:text-white">
                  {" "}
                  <AlertTriangle className="text-purple-500" /> Pending Reviews
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4">
                <div className="space-y-3">
                  {dbsChecks
                    .filter(
                      (c) =>
                        c.status === "Pending" || c.status === "Under Review"
                    )
                    .map((check) => (
                      <div
                        key={check.id}
                        className="p-3 bg-purple-50 border border-purple-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={check.photo}
                            alt={check.employeeName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-sm">
                              {check.employeeName}
                            </div>
                            <div className="text-xs text-gray-600">
                              {check.department} • {check.position}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded`}>
                            {check.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            Applied: {check.applicationDate}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === "checks" && (
        <div className="bg-white rounded-lg shadow-lg">
          {/* Filters */}
          <div className="p-6 border-b">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-[30px] transform -translate-y-1/2 text-gray-800"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by name, employee ID, or DBS number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Valid">Valid</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={18} />
                More Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Check Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredChecks.map((check) => (
                  <tr
                    key={check.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={check.photo}
                          alt={check.employeeName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {check.employeeName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {check.employeeId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {check.department}
                      </div>
                      <div className="text-xs text-gray-500">
                        {check.position}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {check.checkType}
                      </div>
                      {check.updateService && (
                        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                          <RefreshCw size={12} />
                          Update Service
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border`}
                      >
                        {/* {getStatusIcon(check.status)} */}
                        {check.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {check.issueDate || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {check.expiryDate || "-"}
                      </div>
                      {check.daysUntilExpiry !== null && (
                        <div
                          className={`text-xs mt-1 ${
                            check.daysUntilExpiry < 0
                              ? "text-red-600"
                              : check.daysUntilExpiry < 30
                              ? "text-yellow-600"
                              : "text-gray-500"
                          }`}
                        >
                          {check.daysUntilExpiry < 0
                            ? `${Math.abs(check.daysUntilExpiry)} days overdue`
                            : `${check.daysUntilExpiry} days left`}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          //   onClick={() => setSelectedCheck(check)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download Certificate"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Renew"
                        >
                          <RefreshCw size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeView === "alerts" && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-500 p-6 rounded-lg shadow">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-2">
                  Critical: Expired DBS Checks
                </h3>
                <p className="text-red-700 mb-4">
                  {stats.expired} employee(s) have expired DBS checks and may
                  not be compliant to work in regulated positions.
                </p>
                <div className="space-y-2">
                  {dbsChecks
                    .filter((c) => c.status === "Expired")
                    .map((check) => (
                      <div
                        key={check.id}
                        className="bg-white p-3 rounded border border-red-200"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold">
                              {check.employeeName}
                            </span>
                            <span className="text-sm text-gray-600 ml-2">
                              • {check.department}
                            </span>
                          </div>
                          <button className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                            Take Action
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-500 p-6 rounded-lg shadow">
            <div className="flex items-start gap-3">
              <Clock className="text-yellow-600 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="font-bold text-yellow-900 mb-2">
                  Warning: Expiring Soon
                </h3>
                <p className="text-yellow-700 mb-4">
                  {stats.expiringSoon} DBS check(s) will expire within the next
                  30 days. Renewal should be initiated immediately.
                </p>
                <div className="space-y-2">
                  {dbsChecks
                    .filter((c) => c.status === "Expiring Soon")
                    .map((check) => (
                      <div
                        key={check.id}
                        className="bg-white p-3 rounded border border-yellow-200"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold">
                              {check.employeeName}
                            </span>
                            <span className="text-sm text-gray-600 ml-2">
                              • Expires in {check.daysUntilExpiry} days
                            </span>
                          </div>
                          <button className="px-4 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
                            Start Renewal
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
