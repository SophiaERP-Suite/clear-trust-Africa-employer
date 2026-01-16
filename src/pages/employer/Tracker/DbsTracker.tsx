import { useEffect, useState } from "react";
import {
  Shield,
  AlertTriangle,
  Clock,
  Search,
  ChevronRightIcon,
  ListChecks,
  Hourglass,
  ClockAlert,
  ClockFading,
  FileText,
  Bell,
  XCircle,
  Eye,
  ClipboardList,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { fetchDbsChecks, fetchDbsStatus, fetchDbsTypes } from "../../../utils/Requests/DbsRequests";
import { useForm, useWatch } from "react-hook-form";
import Hashids from "hashids";
import Tippy from "@tippyjs/react";

interface DbsChecks {
  dbsApplicationId: number;
  userId: number;
  requestedById: number;
  dbsTypeId: number;
  status: number;
  statusName: string;
  submittedAt: string;
  completedAt: string;
  dateCreated: string;
  userFirstName: string;
  userLastName: string;
  organisationName: string;
  requestedBy: string;
  staffInChargeId: number;
  staffInChargeFirstName: string;
  staffInChargeLastName: string;
  adminId: number;
  adminFirstName: string;
  adminLastName: string;
  dbsType: string;
  dbsTypeCost: number;
}

type FilterForm = {
  UserName: string;
  OrganisationName: string;
  Status: number;
  Type: number;
}

export interface DBSStatus {
  statusId: number;
  statusName: string;
}

export interface DBSTypes {
  dbsTypeId: number;
  typeName: string;
  typeCost: number;
  description: string;
}

const statusStyles: Record<number, string> = {
  1: 'bg-orange-200/50',
  2: 'bg-blue-200/50',
  3: 'bg-purple-200/50',
  4: 'bg-green-200/50',
  5: 'bg-red-200/50',
};

const statusTextStyles: Record<number, string> = {
  1: 'text-orange-500',
  2: 'text-blue-500',
  3: 'text-purple-500',
  4: 'text-green-500',
  5: 'text-red-500',
};

export default function DBSTrackerModule() {
  const [activeView, setActiveView] = useState("dashboard");
  const [dbsChecks1, setDbsChecks1] = useState<DbsChecks[]>([]);
  const [dbsStatus, setDbsStatus] = useState<DBSStatus[]>([]);
  const [dbsType, setDbsType] = useState<DBSTypes[]>([]);
  const [dbsPage, setDbsPage] = useState(1);
  const dbsLimit = 5;
  const [totalDbsChecks, setTotalDbsChecks] = useState(0);
  const colors = ["#5d009bff", "#ff8800ff", "#ff0000", "#003000ff", "#00006dff"];
  const { register, control } = useForm<FilterForm>();
  const filters = useWatch({ control });
  const hashIds = new Hashids('ClearTrustAfricaEncode', 10);

  const dbsChecks = [
    {
      id: "DBS-2024-001",
      employeeName: "Sarah Oriaku",
      employeeId: "EMP-1001",
      department: "Healthcare",
      position: "Senior Nurse",
      checkType: "Enhanced",
      status: "Valid",
      applicationDate: "2024-01-05",
      issueDate: "2024-01-20",
      expiryDate: "2025-01-20",
      certificateNumber: "DBS-001234567890",
      result: "Clear",
      updateService: true,
      lastUpdated: "2024-01-28",
      daysUntilExpiry: 357,
      photo:
        "https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff",
    },
    {
      id: "DBS-2024-002",
      employeeName: "Michael Adebayo",
      employeeId: "EMP-1002",
      department: "Education",
      position: "Teacher",
      checkType: "Enhanced with Barred List",
      status: "Expiring Soon",
      applicationDate: "2023-11-10",
      issueDate: "2023-11-25",
      expiryDate: "2024-11-25",
      certificateNumber: "DBS-001234567891",
      result: "Clear",
      updateService: true,
      lastUpdated: "2024-01-15",
      daysUntilExpiry: 30,
      photo:
        "https://ui-avatars.com/api/?name=Michael+Chen&background=3b82f6&color=fff",
    },
    {
      id: "DBS-2024-003",
      employeeName: "Emmanuella Williams",
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
      id: "DBS-2024-004",
      employeeName: "Femi Anderson",
      employeeId: "EMP-1004",
      department: "Administration",
      position: "Office Manager",
      checkType: "Standard",
      status: "Pending",
      applicationDate: "2024-01-22",
      issueDate: null,
      expiryDate: null,
      certificateNumber: null,
      result: "Pending",
      updateService: false,
      lastUpdated: "2024-01-22",
      daysUntilExpiry: null,
      photo:
        "https://ui-avatars.com/api/?name=James+Anderson&background=f59e0b&color=fff",
    },
    {
      id: "DBS-2024-005",
      employeeName: "Lisa Abdul",
      employeeId: "EMP-1005",
      department: "Healthcare",
      position: "Junior Doctor",
      checkType: "Enhanced",
      status: "Under Review",
      applicationDate: "2024-01-18",
      issueDate: null,
      expiryDate: null,
      certificateNumber: null,
      result: "Under Review",
      updateService: true,
      lastUpdated: "2024-01-26",
      daysUntilExpiry: null,
      photo:
        "https://ui-avatars.com/api/?name=Lisa+Martinez&background=8b5cf6&color=fff",
    },
    {
      id: "DBS-2024-006",
      employeeName: "David Thompson",
      employeeId: "EMP-1006",
      department: "Education",
      position: "Teaching Assistant",
      checkType: "Enhanced with Barred List",
      status: "Valid",
      applicationDate: "2023-09-15",
      issueDate: "2023-10-02",
      expiryDate: "2024-10-02",
      certificateNumber: "DBS-001234567893",
      result: "Clear",
      updateService: true,
      lastUpdated: "2024-01-10",
      daysUntilExpiry: 247,
      photo:
        "https://ui-avatars.com/api/?name=David+Thompson&background=10b981&color=fff",
    },
  ];

  useEffect(() => {
      fetchDbsChecks({ pageNumber: dbsPage, limit: dbsLimit, ...filters })
      .then(res => {
        if (res.status === 200) {
          res.json()
          .then(data => {
            console.log(data);
            setDbsChecks1(data.data.checks);
            setTotalDbsChecks(data.data.totalCount);
          })
        } else {
          res.text()
          .then(data => {
            console.log(JSON.parse(data));
          })
        }
      })
      .catch((err) => console.log(err))
  }, [dbsPage, dbsLimit, filters]);

  useEffect(() => {
    fetchDbsTypes()
    .then(res => {
      if (res.status === 200) {
        res.json()
        .then(data => {
          console.log(data.data);
          setDbsType(data.data);
        })
      } else {
        res.text()
        .then(data => {
          console.log(JSON.parse(data));
        })
      }
    });
  }, []);

  useEffect(() => {
    fetchDbsStatus()
    .then(res => {
      if (res.status === 200) {
        res.json()
        .then(data => {
          console.log(data);
          setDbsStatus(data.data);
        })
      } else {
        res.text()
        .then(data => {
          console.log(JSON.parse(data));
        })
      }
    });
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6">
        <div className="w-full mb-8">
          <div className="row">
            <div className="col-md-12">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex">
                  <ClipboardList className="text-blue-600 mr-2" size={36} />
                  <div>
                    <h3 className="mb-0 text-black">
                      DBS Tracker & Compliance
                    </h3>
                    <p className="text-secondary-600 text-black">
                      <NavLink to="/Dashboard">Dashboard</NavLink>{" "}
                      <ChevronRightIcon size={14} />{" "}
                      <NavLink to="/Tracker">DBS Tracker</NavLink>{" "}
                    </p>
                  </div>
                </div>

                <div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          // { id: "dashboard", label: "Dashboard", icon: Shield },
          { id: "checks", label: "All Checks", icon: FileText },
          // {
          //   id: "alerts",
          //   label: "Alerts",
          //   icon: Bell,
          //   badge: stats.expiringSoon + stats.expired,
          // },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeView === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      {activeView === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expiring Soon */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-700">
              <Clock className="text-yellow-500" />
              Expiring Soon (30 Days)
            </h3>
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

          {/* Expired */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-700">
              <XCircle className="text-red-500" />
              Expired Checks
            </h3>
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

          {/* Pending Reviews */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-700">
              <AlertTriangle className="text-purple-500" />
              Pending Reviews
            </h3>
            <div className="space-y-3">
              {dbsChecks
                .filter(
                  (c) => c.status === "Pending" || c.status === "Under Review"
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
                      <span
                        className={`text-xs px-2 py-1 rounded`}
                      >
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
      )}

      {activeView === "checks" && (
        <div className="bg-white rounded-lg shadow-lg">
          {/* Filters */}
          <div className="p-6 border-b">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by applicant name..."
                    {...register('UserName')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by organisation name..."
                    {...register('OrganisationName')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                {...register('Status')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                {
                  dbsStatus.map((data, index) => (
                    <option value={data.statusId} key={index}>{data.statusName}</option>
                  ))
                }
              </select>
              <select
                {...register('Type')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {
                  dbsType.map((data, index) => (
                    <option value={data.dbsTypeId} key={index}>{ data.typeName }</option>
                  ))
                }
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="p-6">
              <div className="flex flex-wrap justify-between mx-5 overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-800 border dark:border-secondary-800">
                  <thead>
                    <tr className="bg-secondary-100 dark:bg-dark-bg">
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        S/N
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        Requested By
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        Organisation
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        Request Type
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        Staff In Charge
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        Admin
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        Request Date
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
                    {
                      dbsChecks1.map((data, index) => (
                      <tr key={data.dbsApplicationId ?? index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="iq-media-group iq-media-group-1">
                            <h6 className="font-bold dark:text-white">
                              {" "}
                              #{(index + (dbsLimit * (dbsPage - 1))) + 1}
                            </h6>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex w-50 items-center gap-3">
                            <div className="h-12 w-12 border rounded-full" style={{ backgroundColor: colors[index % 4], display: "flex", justifyContent: "center", alignItems: "center", color: "#ffffff"}}>
                              { `${data.userFirstName[0]} ${data.userLastName[0]}` }
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {`${data.userFirstName} ${data.userLastName}`}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                          {data.requestedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                          {data.organisationName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          <p
                            className={`p-1 px-2 text-center rounded-lg ${
                              statusStyles[data.status] ?? 'bg-gray-200'
                            } ${statusTextStyles[data.status] ?? 'text-black'} font-bold`}
                          >
                            {data.statusName}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                          {data.dbsType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                          {data.staffInChargeId ? `${data.staffInChargeFirstName} ${data.staffInChargeLastName}` : 'None Assigned'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                          {data.adminId ? `${data.adminFirstName} ${data.adminLastName}` : 'None Assigned'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                          {(new Date(data.dateCreated)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                          <div className="flex items-center list-user-action">
                            <Tippy content='Preview Application'>
                              <NavLink  to={`/Tracker/${hashIds.encode(String(data.dbsApplicationId))}`}
                                className="btn btn-info btn-icon btn-sm mr-1"
                              >
                                <span className="btn-inner">
                                  <Eye />
                                </span>
                              </NavLink>
                            </Tippy>
                          </div>
                        </td>
                      </tr>
                      ))
                    }
                    
                  </tbody>
                </table>
                {
                  dbsChecks1.length === 0 ?
                    <div className="py-4 whitespace-nowrap w-full">
                          <span className="px-6 py-4 text-left font-medium text-black dark:text-white">There hasn't been any dbs checks</span>
                    </div> : <></>
                }
              </div>
              <div className="flex flex-wrap justify-between my-6 mx-5">
                <div className="flex justify-center items-center mb-1">
                  <p className="text-black">
                    Showing { dbsChecks1.length > 0 ? ((dbsPage * dbsLimit) - dbsLimit) + 1 : 0 } to { dbsChecks1.length > 0 ? (((dbsPage * dbsLimit) - dbsLimit) + 1) + (dbsChecks1.length - 1) : 0 } of { totalDbsChecks } entries
                  </p>
                </div>
                <div className="inline-flex flex-wrap">
                  {
                    dbsPage > 1 && <a
                    href="#"
                    onClick={() => { if (dbsPage > 1) {setDbsPage(dbsPage - 1);} }}
                    className="border-t border-b border-l text-primary-500 border-secondary-500 px-2 py-1 rounded-l dark:border-secondary-800"
                  >
                    Previous
                  </a>
                  }
                  <a
                    href="#"
                    className="border text-white border-secondary-500 cursor-pointer bg-primary-500 px-4 py-1 dark:border-secondary-800"
                  >
                    { dbsPage }
                  </a>
                  {
                    (dbsPage * dbsLimit) < totalDbsChecks && <a
                    href="#"
                    onClick={() => { setDbsPage(dbsPage + 1); }}
                    className="border-r border-t border-b text-primary-500 border-secondary-500 px-4 py-1 rounded-r dark:border-secondary-800"
                  >
                    Next
                  </a>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === "alerts" && (
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow">
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

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow">
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
