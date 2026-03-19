import { useEffect, useState } from "react";
import {
  ChevronRightIcon,
  Plus,
  Users,
  UserLock,
  Trash2,
  Eye,
  CheckCheck,
  X,
  Search,
} from "lucide-react";
import { fetchApplicants } from "../../../utils/Requests/EmployeeRequests.js";
import Tippy from "@tippyjs/react";
import { NavLink, useSearchParams } from "react-router-dom";
import Hashids from "hashids";
import {
  fetchDbsTypes,
  submitDbsRequest,
} from "../../../utils/Requests/DbsRequests.js";
import Modal from "react-modal";
import { handleDbsRequest } from "../../../utils/ResponseHandlers/DbsResponse.js";
import { toast } from "react-toastify";
import { fetchAllApplicants } from "../../../utils/Requests/userApi.js";
import { useAuth } from "../../../utils/useAuth.js";

export interface EmployeeData {
  userId: number;
  applicantId: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  phone: string;
  email: string;
  identificationNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  organisationId: number;
  role: string;
}

export interface DbsTypes {
  dbsTypeId: number;
  typeName: string;
  typeCost: number;
  description: string;
}

interface DbsCheckRequest {
  requestType: DbsTypes;
  employee: EmployeeData;
}

function AdminEmployees() {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dbsTypes, setDbsTypes] = useState<DbsTypes[]>([]);
  const hashIds = new Hashids("ClearTrustAfricaEncode", 10);
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [modalState, setModalState] = useState(false);
  // const [modalDescState, setModalDescState] = useState(false);
  const [dbsRequestData, setDbsRequestData] = useState<DbsCheckRequest | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const organisationType = user?.organisationType;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";
  const [localSearch, setLocalSearch] = useState(searchFromUrl);

  const isSearching = searchFromUrl.trim().length > 0;

  const toggleDropDrown = (id: string) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!isSearching) {
      setLoading(true);
      fetchApplicants(page, limit)
        .then((data) => {
          setEmployees(data.data.users);
          setTotalEmployees(data.data.totalCount);
        })
        .catch((err) => console.log("employee error", err.message))
        .finally(() => setLoading(false));
    }
  }, [page, limit, isSearching]);

  useEffect(() => {
    if (!isSearching) return;

    if (page !== 1) {
      setPage(1);
      return;
    }

    setEmployees([]);
    setLoading(true);

    fetchAllApplicants()
      .then((data) => {
        const all: EmployeeData[] = data.data.users;
        const searchTerm = searchFromUrl.toLowerCase().trim();

        if (all.length > 0) {
          console.log("Sample employee data:", {
            firstName: all[0].firstName,
            lastName: all[0].lastName,
            fullName: `${all[0].firstName} ${all[0].lastName}`,
            email: all[0].email,
            phone: all[0].phone
          });
        }

        const filtered = all.filter((emp) => {
          const firstName = (emp.firstName || "").toLowerCase();
          const lastName = (emp.lastName || "").toLowerCase();
          const fullName = `${firstName} ${lastName}`;
          const email = (emp.email || "").toLowerCase();
          const phone = (emp.phone || "").toLowerCase(); 

          const matches =
            fullName.includes(searchTerm) ||
            firstName.includes(searchTerm) ||
            lastName.includes(searchTerm) ||
            email.includes(searchTerm) ||
            phone.includes(searchTerm);

          if (matches) {
            console.log("✅ Match found:", {
              name: fullName,
              email: emp.email,
              phone: emp.phone,
              matchedTerm: searchTerm
            });
          }

          return matches;
        });

        if (filtered.length > 0) {
          console.log("Matched employees:", filtered.map(emp => ({
            name: `${emp.firstName} ${emp.lastName}`,
            email: emp.email,
            phone: emp.phone
          })));
        }

        const start = (page - 1) * limit;
        setEmployees(filtered.slice(start, start + limit));
        setTotalEmployees(filtered.length);
      })
      .catch((error) => {
        console.error("Search error:", error);
        toast.error("Failed to search employees");
      })
      .finally(() => setLoading(false));

  }, [searchFromUrl, page, limit, isSearching]);

  // ── Search handlers ───────────────────────────────────────────────────────
  const handleSearch = () => {
    setPage(1);
    if (localSearch.trim()) {
      setSearchParams({ search: localSearch.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setLocalSearch("");
    setSearchParams({});
    setPage(1);
  };

  // ── DBS ───────────────────────────────────────────────────────────────────
  const submitRequest = async (data: DbsCheckRequest) => {
    const loader = document.getElementById("query-loader");
    const text = document.getElementById("query-text");
    if (loader) loader.style.display = "flex";
    if (text) text.style.display = "none";

    const formData = new FormData();
    formData.append("UserId", String(data.employee.userId));
    formData.append("dbsTypeId", String(data.requestType.dbsTypeId));
    formData.append("Status", String(data.requestType.typeCost > 0 ? 1 : 2));
    const res = await submitDbsRequest(formData);
    handleDbsRequest(res, loader, text, { toast }).finally(() => setModalState(false));
  };

  const switchData = (data: DbsCheckRequest) => {
    toggleDropDrown("");
    setDbsRequestData(data);
    setModalState(true);
  };

  useEffect(() => {
    fetchDbsTypes()
      .then((res) => {
        if (res.status === 200) res.json().then((data) => setDbsTypes(data.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Modal
        isOpen={modalState}
        onRequestClose={() => setModalState(false)}
        style={{
          content: {
            width: "fit-content",
            height: "fit-content",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgb(255 255 255)",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
          overlay: { backgroundColor: "rgba(255, 255, 255, 0.7)" },
        }}
      >
        {dbsRequestData && (
          <div className="h-fit w-80 lg:w-fit">
            <div className="flex justify-start">
              <p className="font-semibold text-black py-1 text-lg">
                <UserLock size={22} className="mr-2" /> Request DBS Check for {dbsRequestData.employee.firstName}
              </p>
            </div>
            <div className="my-2">
              <p className="py-1"> {" "}{organisationType === "Agent" ? "Candidates" : " Employee"} Name: {`${dbsRequestData.employee.firstName} ${dbsRequestData.employee.lastName}`}</p>
              <p className="py-1">DBS Check Type: {dbsRequestData.requestType.typeName}</p>
              <p className="py-1">DBS Check Cost: {`NGN ${dbsRequestData.requestType.typeCost.toFixed(2)}`}</p>
            </div>
            <div className="flex justify-end my-2 gap-2">
              <button className="btn text-white bg-black" onClick={() => setModalState(false)}>
                <X size={18} className="mr-2" />Cancel
              </button>
              <button className="btn btn-success" onClick={() => submitRequest(dbsRequestData)}>
                <div className="dots hidden" id="query-loader">
                  <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                </div>
                <span id="query-text"><CheckCheck size={18} className="mr-2" />Proceed</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      <div className="p-6 lg:p-8 footer-inner mx-auto main-container container" x-bind:className="setting.page_layout">
        <div className="flex flex-wrap mb-8 items-center justify-between">
          <div className="flex">
            <Users className="text-[rgb(112_22_208/0.9)] mr-2" size={36} />
            <div>
              <h3 className="mb-0 text-black"> {" "}{organisationType === "Agent" ? "Candidates" : " Employee"} Management</h3>
              <p className="text-secondary-600">
                <NavLink to="/Dashboard">Dashboard</NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to="/Employee"> {" "}{organisationType === "Agent" ? "Candidates" : " Employee"} Management</NavLink>
              </p>
            </div>
          </div>
          <NavLink to="/EmployeeNew" className="btn btn-success">
            <Plus size={18} className="mr-2" />Add New
          </NavLink>
        </div>

        <div className="flex flex-wrap rounded-lg contet-inner">
          <div className="flex-auto w-full">
            <div className="relative flex flex-col mb-8 bg-white dark:bg-dark-card shadow rounded-lg">
              <div className="flex justify-between flex-auto p-5 border-b dark:border-secondary-800">
                <h4 className="mb-0 font-bold"> {" "}{organisationType === "Agent" ? "Candidates" : " Employee"} List</h4>
              </div>

              <div className="pb-6 pt-2 px-0">
                <div className="overflow-x-hidden p-5">

                  <div className="flex flex-wrap justify-between my-2 gap-3">
                    {/* Per page — hidden during search since we're paginating filtered results */}
                    {!isSearching && (
                      <div className="flex items-center">
                        <label className="inline-block text-black dark:text-white" htmlFor="show">
                          Display Per Page:
                        </label>
                        <select
                          className="block px-2 py-1 ml-2 text-base font-normal rounded text-black dark:bg-dark-card dark:border-secondary-800 bg-white border outline-none focus:border-primary-500"
                          id="show"
                          value={limit}
                          onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    )}
                    {isSearching && <div />}

                    {/* Search input */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <input
                          type="text"
                          className="px-3 py-1.5 text-sm outline-none bg-white dark:bg-dark-card text-black w-48"
                          placeholder={`Search  ${organisationType === "Agent" ? "Candidates" : " Employee"}...`}
                          value={localSearch}
                          onChange={(e) => setLocalSearch(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        {localSearch && (
                          <button className="px-2 text-gray-400 hover:text-gray-600" onClick={clearSearch}>
                            <X size={14} />
                          </button>
                        )}
                        <button className="btn btn-primary px-3 py-1.5 rounded-none" onClick={handleSearch}>
                          <Search size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Active search banner */}
                  {isSearching && (
                    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-md px-4 py-2 mb-3 text-sm">
                      <span className="text-blue-700">
                        Showing <strong>{totalEmployees}</strong> result{totalEmployees !== 1 ? "s" : ""} for <strong>"{searchFromUrl}"</strong>
                      </span>
                      <button className="text-blue-500 hover:text-blue-700 underline text-xs" onClick={clearSearch}>
                        Clear search
                      </button>
                    </div>
                  )}

                  <div className="border dark:border-secondary-800 rounded-lg overflow-x-auto">
                    <table className="min-w-full overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800">
                      <thead>
                        <tr className="bg-secondary-100 dark:bg-dark-bg">
                          <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">S/N</th>
                          <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">Name</th>
                          <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">Phone</th>
                          <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">Email</th>
                          <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">Gender</th>
                          <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">Birth Date</th>
                          <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
                        {loading ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                              Loading  {" "}{organisationType === "Agent" ? "Candidates" : " Employee"}...
                            </td>
                          </tr>
                        ) : employees.map((data: EmployeeData, index) => (
                          <tr key={data.userId ?? index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <h6 className="font-bold dark:text-white">#{(page - 1) * limit + index + 1}</h6>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <NavLink to={`/EmployeeProfile/${hashIds.encode(String(data.userId))}`} className="flex items-center">
                                <img className="w-10 h-10 p-1 mr-3 text-primary-400 bg-primary-500/10 rounded-xl" src={data.profileImage} alt="profile" />
                                <h6 className="font-medium pl-1 mt-2 dark:text-white">{`${data.firstName} ${data.lastName}`}</h6>
                              </NavLink>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{data.gender}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                              {new Date(data.dateOfBirth).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center list-user-action">
                                <Tippy content="Request New DBS Check">
                                  <a className="btn btn-primary btn-icon btn-sm mr-1" href="#" onClick={() => toggleDropDrown(String(data.userId))}>
                                    <span className="btn-inner"><UserLock /></span>
                                  </a>
                                </Tippy>
                                {openRowId === String(data.userId) && (
                                  <div className="absolute right-8 mt-2 w-30 bg-white border shadow-lg z-10">
                                    {dbsTypes.map((dbsData, i) => (
                                      <button key={dbsData.dbsTypeId ?? i} onClick={() => switchData({ requestType: dbsData, employee: data })} className="block w-full px-4 py-2 hover:bg-secondary-200 text-left">
                                        {dbsData.typeName}
                                      </button>
                                    ))}
                                  </div>
                                )}
                                <Tippy content="Preview Applicant Profile">
                                  <NavLink to={`/EmployeeProfile/${hashIds.encode(String(data.userId))}`} className="btn btn-info btn-icon btn-sm mr-1">
                                    <span className="btn-inner"><Eye /></span>
                                  </NavLink>
                                </Tippy>
                                <Tippy content="Remove Applicant">
                                  <a style={{ display: "none" }} className="btn btn-danger btn-icon btn-sm mr-1" href="#">
                                    <span className="btn-inner"><Trash2 /></span>
                                  </a>
                                </Tippy>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {!loading && employees.length === 0 && (
                      <p className="px-6 py-4 text-center font-medium text-black dark:text-white">
                        {isSearching
                          ? `No employees found matching "${searchFromUrl}"`
                          : "There are currently no registered employees in your organization"}
                      </p>
                    )}
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-wrap justify-between my-6 mx-5">
                    <p className="text-black flex items-center">
                      Showing {totalEmployees > 0 ? (page - 1) * limit + 1 : 0} to{" "}
                      {Math.min(page * limit, totalEmployees)} of {totalEmployees} entries
                    </p>
                    <div className="inline-flex flex-wrap">
                      {page > 1 && (
                        <a href="#" onClick={() => setPage(page - 1)} className="border-t border-b border-l rounded-md text-primary-500 border-secondary-500 px-2 py-1 dark:border-secondary-800">
                          Previous
                        </a>
                      )}
                      <a href="#" className="border text-white border-secondary-500 rounded-md bg-primary-500 px-4 py-1 dark:border-secondary-800">
                        {page}
                      </a>
                      {page * limit < totalEmployees && (
                        <a href="#" onClick={() => setPage(page + 1)} className="border-r border-t border-b text-primary-500 border-secondary-500 px-4 py-1 rounded-md dark:border-secondary-800">
                          Next
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEmployees;