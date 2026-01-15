import { useEffect, useState } from "react";
import "../../../assets2/css/choices.min.css";
import "../../../assets2/css/flatpickr.min.css";
import "../../../assets2/css/libs.min.css";
import "../../../assets2/css/quill.snow.css";
import "../../../assets2/css/responsive.css";
import "../../../assets2/css/sheperd.css";
import "../../../assets2/css/sweetalert2.min.css";
import "../../../assets2/css/tailwind.css";
import "../../../assets2/css/uppy.min.css";
import "../../../assets2/js/choice.js";
import "../../../assets2/js/choices.min.js";
import "../../../assets2/js/dashboard.js";
import "../../../assets2/js/fslightbox.js";
import "../../../assets2/js/libs.min.js";
import "../../../assets2/js/slider-tabs.js";
import "../../../assets2/js/sweet-alert.js";
import "../../../assets2/js/swiper-slider.js";
import { ChevronRightIcon, Plus, Users, UserLock, Trash2, Eye, CheckCheck, X } from "lucide-react";
import { fetchApplicants } from "../../../utils/Requests/EmployeeRequests.js";
import Tippy from '@tippyjs/react';
import { NavLink } from "react-router-dom";
import Hashids from "hashids";
import { fetchDbsTypes, submitDbsRequest } from "../../../utils/Requests/DbsRequests.js";
import Modal from 'react-modal';
import { handleDbsRequest } from "../../../utils/ResponseHandlers/DbsResponse.js";
import { toast } from 'react-toastify';

interface EmployeeData {
  userId: number;
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
  const hashIds = new Hashids('ClearTrustAfricaEncode', 10);
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [modalState, setModalState] = useState(false);
  const [dbsRequestData, setDbsRequestData] = useState<DbsCheckRequest | null>(null);

  const toggleDropDrown = (id: string) => {
    setOpenRowId(prev => (prev === id ? null : id));
  }

  useEffect(() => {
    fetchApplicants(page, limit)
    .then(res => {
      if (res.status === 200) {
        res.json()
        .then(data => {
          console.log(data);
          setEmployees(data.data.users);
          setTotalEmployees(data.data.totalCount);
        })
      } else {
        res.text()
        .then(data => {
          console.log(JSON.parse(data));
        })
      }
    })
    .catch((err) => console.log(err))
  }, [page, limit]);

  const submitRequest = async (data: DbsCheckRequest) => {
    const loader = document.getElementById('query-loader');
    const text = document.getElementById('query-text');
    if (loader) {
      loader.style.display = 'flex';
    }
    if (text) {
      text.style.display = 'none';
    }
    const formData = new FormData();
    formData.append('UserId', String(data.employee.userId));
    formData.append('dbsTypeId', String(data.requestType.dbsTypeId));
    const res = await submitDbsRequest(formData);
    handleDbsRequest(res, loader, text, { toast })
    .finally(() => setModalState(false));
  }

  const switchData = (data: DbsCheckRequest) => {
    toggleDropDrown('');
    console.log(data);
    setDbsRequestData(data);
    setModalState(true);
  }

  useEffect(() => {
    fetchDbsTypes()
      .then(res => {
        if (res.status === 200) {
          res.json()
            .then(data => {
              console.log(data);
              setDbsTypes(data.data);
            })
        } else {
          res.text()
            .then(data => {
              console.log(JSON.parse(data));
            })
        }
      })
      .catch((err) => console.log(err))
  }, []);

  const refetchData = async () => {
    try {
      const res = await fetchApplicants(page, limit);
      if (res.status === 200) {
        const data = await res.json()
        setEmployees(data.data.users);
        setTotalEmployees(data.data.totalCount);
      } else {
        const resText = await res.text();
        console.log(JSON.parse(resText));
      }
    } catch (err) {
       console.log(err)
    }
  }
  return (
    <>
      <Modal isOpen={modalState} onRequestClose={() => { setModalState(false); }}
        style={{
        content: {
          width: 'fit-content',
          height: 'fit-content',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgb(255 255 255)',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        },
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }
      }}
      >
        {dbsRequestData && (
          <div className="h-fit w-80 lg:w-fit">
            <div className="flex justify-start">
              <p className="font-semibold text-black py-1 text-lg"><UserLock size={22} className="mr-2" /> Request CTA Check for { `${dbsRequestData.employee.firstName}` }</p>
            </div>
            <div className="flex justify-start">
              <div className="my-2">
                <p className="py-1">Employee Name: {`${dbsRequestData.employee.firstName} ${dbsRequestData.employee.lastName}`}</p>
                <p className="py-1">CTA Check Type: {dbsRequestData.requestType.typeName}</p>
                <p className="py-1">CTA Check Cost: { `NGN ${dbsRequestData.requestType.typeCost.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2})}` }</p>
              </div>
            </div>
            
            <div className="flex justify-end my-2 gap-2">
              <button className="btn text-white bg-black" onClick={() => setModalState(false) }>
                <X size={18} className="mr-2" />
                Cancel
              </button>
              <button className="btn btn-success" onClick={() => {submitRequest(dbsRequestData)}}>
                <div className="dots hidden" id="query-loader">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span id="query-text">
                  <CheckCheck size={18} className="mr-2" />
                  Proceed
                </span>
              </button>
            </div>
          </div>
        )}
        
      </Modal>
      <div
        className="p-6 lg:p-8 footer-inner mx-auto main-container container"
        x-bind:className="setting.page_layout"
      >
        <div className="flex flex-wrap mb-8 items-center justify-between">
          <div className="flex">
            <Users className="text-[rgb(112_22_208/0.9)] mr-2 " size={36} />
            <div>
              <h3 className="mb-0 text-black">Employee Management</h3>
              <p className="text-secondary-600">
                <NavLink to="/Dashboard">
                  Dashboard
                </NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to="/Employee">
                  Employee Mgt {" "}
                </NavLink>
              </p>
            </div>
          </div>
          <div>
            <NavLink to="/EmployeeNew" className="btn btn-success">
              <Plus size={18} className="mr-2" />
              Add New
            </NavLink>
          </div>
        </div>

        <div className="flex flex-wrap rounded-md contet-inner">
          <div className="flex-auto w-full">
            <div className="relative flex flex-col mb-8  bg-white dark:bg-dark-card shadow rounded">
              <div className="flex justify-between flex-auto p-5 border-b dark:border-secondary-800 rounded">
                <h4 className="mb-0 font-bold">
                  Employees List
                </h4>
                <a href="/ApplicantNew"></a>
              </div>
              <div className="pb-6 pt-2 px-0">
                <div className="overflow-x-hidden">
                  <div className=" overflow-x-hidden p-5">
                    <div className="flex flex-wrap justify-between my-6 mx-5">
                      <div className="flex justify-center items-center mb-1">
                        <label
                          className="inline-block text-black dark:text-white"
                          htmlFor="show"
                        >
                          Display Per Page:
                        </label>
                        <div className="flex">
                          <select
                            className="block w-full px-2 py-1 ml-2 text-base font-normal rounded text-black dark:bg-dark-card dark:border-secondary-800 bg-white border outline-none focus:border-primary-500 focus:shadow"
                            aria-label=".form-select-sm example"
                            id="show"
                            value={limit}
                            onChange={(e) => { setLimit(Number(e.target.value)); refetchData(); }}
                          >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-center items-center mb-1">
                        <label
                          className="inline-block mb-2 text-black dark:text-white"
                          htmlFor="email"
                        >
                          Search:
                        </label>
                        <input
                          type="email"
                          className="block w-full px-4 py-1 ml-2 text-base font-normal dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow"
                          id="email"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between mx-5 overflow-x-auto">
                      <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-800 border dark:border-secondary-800">
                        <thead>
                          <tr className="bg-secondary-100 dark:bg-dark-bg">
                            <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                              S/N
                            </th>
                            <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                              Name
                            </th>
                            <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                              Phone
                            </th>
                            <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                              Email
                            </th>
                            <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                              Gender
                            </th>
                            <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                              Birth Date
                            </th>
                            <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
                          {
                            employees.map((data: EmployeeData, index) => (
                            <tr key={data.userId ?? index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="iq-media-group iq-media-group-1">
                                  <h6 className="font-bold dark:text-white">
                                    {" "}
                                    #{index + 1}
                                  </h6>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <NavLink to={`/EmployeeProfile/${hashIds.encode(String(data.userId))}`} className="flex items-center">
                                  <img
                                    className="w-10 h-10 p-1 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                                    src={data.profileImage}
                                    alt="profile"
                                  />
                                  <h6 className="font-medium pl-1 mt-2 dark:text-white">
                                    {`${data.firstName} ${data.lastName}`}
                                  </h6>
                                </NavLink>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                {data.phone}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                {data.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                {data.gender}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                {(new Date(data.dateOfBirth)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center list-user-action">
                                  <Tippy content='Request New CTA Check'>
                                    <a
                                      className="btn btn-primary btn-icon btn-sm mr-1"
                                      href="#"
                                        type="button"
                                        onClick={() => toggleDropDrown(String(data.userId))}
                                    >
                                      <span className="btn-inner">
                                        <UserLock />
                                      </span>
                                    </a>
                                  </Tippy>
                                  {
                                    openRowId === String(data.userId) && (
                                      <div className="absolute right-8 mt-2 w-30 bg-white border shadow-lg z-1">
                                        {
                                            dbsTypes.map((dbsData, index) => (
                                            <button key={dbsData.dbsTypeId ?? index} onClick={() => switchData({ requestType: dbsData, employee: data })} className="block w-full px-4 py-2 hover:bg-secondary-200 text-left">
                                              {`${dbsData.typeName}`}
                                            </button>
                                          ))
                                        }
                                      </div>
                                    )
                                  }
                                  <Tippy content='Preview Applicant Profile'>
                                    <NavLink  to={`/EmployeeProfile/${hashIds.encode(String(data.userId))}`}
                                      className="btn btn-info btn-icon btn-sm mr-1"
                                    >
                                      <span className="btn-inner">
                                        <Eye />
                                      </span>
                                    </NavLink>
                                  </Tippy>
                                  <Tippy content='Remove Applicant'>
                                    <a
                                      className="btn btn-danger btn-icon btn-sm mr-1"
                                      href="#"
                                      type="button"
                                    >
                                      <span className="btn-inner">
                                        <Trash2 />
                                      </span>
                                    </a>
                                  </Tippy>
                                </div>
                              </td>
                            </tr>
                            ))
                          }
                          {
                            employees.length === 0 ? <tr>
                              <div className="px-6 py-4 whitespace-nowrap">
                                <span  className="px-6 py-4 text-left font-medium text-black dark:text-white">There are currently no registered employees in your organisation</span>
                              </div>
                            </tr> : <></>
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className="flex flex-wrap justify-between my-6 mx-5">
                        <div className="flex justify-center items-center mb-1">
                          <p className="text-black">
                            Showing { employees.length > 0 ? ((page * limit) - limit) + 1 : 0 } to { employees.length > 0 ? (((page * limit) - limit) + 1) + (employees.length - 1) : 0 } of { totalEmployees } entries
                          </p>
                        </div>
                        <div className="inline-flex flex-wrap">
                          {
                            page > 1 && <a
                            href="#"
                            onClick={() => { if (page > 1) {setPage(page - 1); refetchData();} }}
                            className="border-t border-b border-l text-primary-500 border-secondary-500 px-2 py-1 rounded-l dark:border-secondary-800"
                          >
                            Previous
                          </a>
                          }
                          <a
                            href="#"
                            className="border text-white border-secondary-500 cursor-pointer bg-primary-500 px-4 py-1 dark:border-secondary-800"
                          >
                            { page }
                          </a>
                          {
                            (page * limit) < totalEmployees && <a
                            href="#"
                            onClick={() => { setPage(page + 1); refetchData(); }}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEmployees;
