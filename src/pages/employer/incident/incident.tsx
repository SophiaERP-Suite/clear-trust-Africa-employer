import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { fetchIncidentReports } from "../../../utils/Requests/IncidentRequests";
import hashids from "../../../utils/hashids";
import Loading from "../../../utils/Loading";
import { useAuth } from "../../../utils/useAuth";
import {
  List,
  ListChecks,
  ClockAlert,
  ChevronRightIcon,
  AlertTriangleIcon,
  Plus,
  Eye,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Pen,
} from "lucide-react";

interface IncidentReport {
  incidentReportId: number;
  incidentTitle: string;
  incidentTypeId: number;
  incidentDate: string;
  description: string;
  incidentLocation: string;
  reportedById: number;
  accusedEmployeeId: number;
  recordedById: number;
  recorderName: string;
  severityLevel: number;
  incidentStatus: number;
  dateCreated: string;
}

// Add interface for paginated response
interface PaginatedResponse {
  data: IncidentReport[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function Incidents() {
  const [incidentReport, setIncidentReport] = useState<IncidentReport[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { user } = useAuth();
  const organisationId: number | null = user?.organisationId ?? null;

  // Calculate start and end indices
  const start = totalCount > 0 ? (page - 1) * pageSize + 1 : 0;
  const end = Math.min(page * pageSize, totalCount);

  useEffect(() => {
    if (!organisationId) return;

    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetchIncidentReports(
          organisationId,
          page,
          pageSize
        );

        if (isMounted) {
          if (response && "data" in response && "totalCount" in response) {
            const paginatedResponse = response as PaginatedResponse;
            setIncidentReport(paginatedResponse.data ?? []);
            setTotalCount(paginatedResponse.totalCount || 0);
            setTotalPages(paginatedResponse.totalPages || 0);
          } else if (Array.isArray(response)) {
            setIncidentReport(response);
            setTotalCount(response.length);
            setTotalPages(Math.ceil(response.length / pageSize));
          } else {
            console.error("Unexpected response structure:", response);
            setIncidentReport([]);
            setTotalCount(0);
            setTotalPages(0);
          }
        }
      } catch (err) {
        console.error("Failed to fetch incident reports:", err);
        if (isMounted) {
          setError("Could not fetch incident reports");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [organisationId, page, pageSize]);

  const resolvedCount = useMemo(() => {
    return incidentReport.filter((ir) => ir.incidentStatus === 7).length;
  }, [incidentReport]);

  const ongoingCount = useMemo(() => {
    return incidentReport.filter((ir) => ir.incidentStatus === 3).length;
  }, [incidentReport]);

  const refetchData = async () => {
    setError(null);
    if (!organisationId) return;

    try {
      setLoading(true);
      const response = await fetchIncidentReports(
        organisationId,
        page,
        pageSize
      );

      if (response && "data" in response && "totalCount" in response) {
        const paginatedResponse = response as PaginatedResponse;
        setIncidentReport(paginatedResponse.data ?? []);
        setTotalCount(paginatedResponse.totalCount || 0);
        setTotalPages(paginatedResponse.totalPages || 0);
      } else if (Array.isArray(response)) {
        setIncidentReport(response);
        setTotalCount(response.length);
        setTotalPages(Math.ceil(response.length / pageSize));
      }
    } catch (error) {
      console.error("Failed to refetch incident reports:", error);
      setError("Could not fetch incident reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          buttons.push(i);
        }
        buttons.push("...");
        buttons.push(totalPages);
      } else if (page >= totalPages - 2) {
        buttons.push(1);
        buttons.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          buttons.push(i);
        }
      } else {
        buttons.push(1);
        buttons.push("...");
        buttons.push(page - 1);
        buttons.push(page);
        buttons.push(page + 1);
        buttons.push("...");
        buttons.push(totalPages);
      }
    }

    return buttons;
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  console.log({
    page,
    pageSize,
    totalCount,
    totalPages,
    start,
    end,
    dataLength: incidentReport.length,
  });

  if (loading) {
    return (
      <div className="p-6 lg:p-8 footer-inner mx-auto main-container container">
        <div className="flex items-center justify-center h-64">
          <Loading />
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
                <div className="flex">
                  <AlertTriangleIcon
                    className="text-[rgb(112_22_208/0.9)] mr-2"
                    size={36}
                  />
                  <div>
                    <h3 className="mb-0 text-black">Incident Management</h3>
                    <p className="text-secondary-600 text-black">
                      Dashboard <ChevronRightIcon size={14} /> Incident
                      Management
                    </p>
                  </div>
                </div>

                <div>
                  <NavLink to="/IncidentReportForm" className="btn-success btn">
                    <Plus size={18} className="mr-2" />
                    Add New
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Only show if not error */}
        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
            {/* Total Incidents */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md border border-blue-600 p-5 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full">
                  <List className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-white">Total Incidents</p>
                  <h2 className="text-3xl font-bold text-white">
                    {totalCount}
                  </h2>
                </div>
              </div>
            </div>

            {/* Resolved */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-md border border-green-600 p-5 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full">
                  <ListChecks className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-white">Resolved</p>
                  <h2 className="text-3xl font-bold text-white">
                    {resolvedCount}
                  </h2>
                </div>
              </div>
            </div>

            {/* Under Investigation */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg shadow-md border border-yellow-500 p-5 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 w-12 h-12 flex items-center justify-center rounded-full">
                  <ClockAlert className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-white">Under Investigation</p>
                  <h2 className="text-3xl font-bold text-white">
                    {ongoingCount}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {error && (
          <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-red-800">
                Error Loading Reports
              </h4>
              <button
                onClick={refetchData}
                className="btn btn-outline btn-sm btn-error"
              >
                Retry
              </button>
            </div>
            <p className="text-red-700 mb-2">{error}</p>
            <p className="text-sm text-red-600">
              Please check your connection and try again.
            </p>
          </div>
        )}

        {!error && incidentReport.length === 0 ? (
          <div className="relative flex flex-col mb-8 bg-white rounded-lg shadow-lg dark:bg-dark-card">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
              <div className="relative flex flex-wrap justify-between p-5">
                <h4 className="mb-2 sm:mb-0 text-xl font-bold">
                  Incident Reports
                </h4>
              </div>
              <hr className="m-0" />
              <div className="flex-auto p-8 text-center">
                <div className="mx-auto w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-gray-100">
                  <AlertTriangleIcon className="text-gray-400" size={48} />
                </div>
                <h5 className="text-lg font-semibold text-gray-700 mb-2">
                  No Incident Reports Found
                </h5>
                <p className="text-gray-500 mb-6">
                  There are no incident reports available. Create your first
                  incident report to get started.
                </p>
                <NavLink
                  to="/IncidentReportForm"
                  className="btn-success btn inline-flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Create First Incident Report
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          !error &&
          incidentReport.length > 0 && (
            <div className="relative flex flex-col mb-8 bg-white rounded-lg shadow-lg dark:bg-dark-card">
              <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
                <div className="relative flex flex-wrap justify-between p-5">
                  <h4 className="mb-2 sm:mb-0 text-xl font-bold">
                    Incident Reports
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Show entries
                      </span>
                      <select
                        value={pageSize}
                        onChange={(e) =>
                          handlePageSizeChange(Number(e.target.value))
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      <span className="text-sm text-gray-600"></span>
                    </div>
                    <button
                      onClick={refetchData}
                      className="btn btn-secondary btn-sm"
                      title="Refresh"
                    >
                      <RefreshCcw className="mr-2 w-5" /> Refresh
                    </button>
                  </div>
                </div>
                <hr className="m-0" />
                <div className="flex-auto p-5">
                  <div className="border dark:border-secondary-800 rounded-lg overflow-x-auto">
                    <table
                      id="basic-table"
                      className="min-w-full overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800"
                    >
                      {/* Table headers and rows remain the same */}
                      <thead>
                        <tr className="bg-secondary-200 dark:bg-dark-bg">
                          <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                            Incident ID
                          </th>
                          <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                            Recorded By
                          </th>
                          <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                            Incident Date
                          </th>
                          <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                            Date Created
                          </th>
                          <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800 dark:bg-dark-card dark:text-white">
                        {incidentReport.map((ir) => (
                          <tr key={ir.incidentReportId}>
                            {/* Table rows remain the same */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="iq-media-group iq-media-group-1">
                                <h6 className="font-bold dark:text-white">
                                  #{ir.incidentReportId}
                                </h6>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                              {ir.incidentTitle || "_"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                              {ir.recorderName || "_"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                              {ir.incidentLocation}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center mb-2">
                                <h6 className="font-medium dark:text-white">
                                  {ir.incidentDate
                                    ? new Date(
                                        ir.incidentDate
                                      ).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })
                                    : "—"}
                                </h6>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center mb-2">
                                <h6 className="font-medium dark:text-white">
                                  {ir.dateCreated
                                    ? new Date(
                                        ir.dateCreated
                                      ).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })
                                    : "—"}
                                </h6>
                              </div>
                            </td>
                            <td className="px-1 py-4 whitespace-nowrap">
                              <div className="flex items-center mb-2 space-x-4">
                                <button
                                  className="btn btn-warning btn-icon mr-2 btn-sm"
                                  onClick={() =>
                                    navigate(
                                      `/IncidentReportEdit/${hashids.encode(
                                        ir.incidentReportId
                                      )}`
                                    )
                                  }
                                  title="Edit Report"
                                >
                                  <Pen size={16} />
                                </button>
                                <button
                                  className="btn btn-info btn-icon btn-sm"
                                  onClick={() =>
                                    navigate(
                                      `/IncidentReportDetails/${hashids.encode(
                                        ir.incidentReportId
                                      )}`
                                    )
                                  }
                                >
                                  <Eye />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Pagination Footer */}
                    <div className="border-t hidden dark:border-secondary-800 px-6 py-4">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Page size selector */}

                        {/* Page info */}
                        <div className="text-sm text-gray-600">
                          Showing {start} to {end} of {totalCount} entries
                        </div>

                        {/* Pagination controls */}
                        <div className="flex items-center gap-1">
                          <button
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                            className="flex items-center justify-center w-10 h-10 border rounded-l hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Previous"
                          >
                            <ChevronLeft size={18} />
                          </button>

                          {getPaginationButtons().map((button, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                typeof button === "number" &&
                                handlePageChange(button)
                              }
                              disabled={button === "..."}
                              className={`flex items-center justify-center min-w-10 h-10 border ${
                                page === button
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "hover:bg-gray-50"
                              } ${button === "..." ? "cursor-default" : ""}`}
                            >
                              {button === "..." ? "..." : button}
                            </button>
                          ))}

                          <button
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                            className="flex items-center justify-center w-10 h-10 border rounded-r hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Next"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
