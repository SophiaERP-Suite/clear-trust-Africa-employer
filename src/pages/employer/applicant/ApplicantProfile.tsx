import { CheckCheck, ChevronRightIcon, Eye, Pen, Plus, Trash2, Upload, Users, X } from "lucide-react";
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
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchApplicantById, fetchApplicantDocsById, uploadDocuments } from "../../../utils/Requests/EmployeeRequests.js";
import Hashids from "hashids";
import { fetchDbsChecksByUserId } from "../../../utils/Requests/DbsRequests.js";
import Tippy from "@tippyjs/react";
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { handleCreateEmployee } from "../../../utils/ResponseHandlers/EmployeeResponse.js";

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
  organizationId: number;
  role: string;
}

interface DbsChecks {
  dbsApplicationId: number;
  userId: number
  requestedById: number
  dbsApplicationTypeId: number
  status: string
  submittedAt: string
  completedAt: string
  dateCreated: string
  user: string;
  requestedBy: string;
  dbsApplicationType: string;
  dbsApplicationTypeCost: number;
}

interface DocumentFormValues {
  File: string;
  DocumentType: string;
}

interface UserDocumentValues {
  userDocumentId: number;
  fileUrl: string;
  userDocumentType: string;
  status: number;
  dateCreated: string;
}

function AdminApplicantsNew() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const hashIds = new Hashids('ClearTrustAfricaEncode', 10);
  const hashedId = id ? Number(hashIds.decode(id)[0]) : 0;
  const [dbsChecks, setDbsChecks] = useState<DbsChecks[]>([]);
  const [docModalState, setDocModalState] = useState(false);
  const { register, reset, handleSubmit, formState } = useForm<DocumentFormValues>();
  const { errors } = formState;
  const [userDocuments, setUserDocuments] = useState<UserDocumentValues[]>([]);

  useEffect(() => {
      fetchApplicantById(hashedId)
      .then(res => {
        if (res.status === 200) {
          res.json()
          .then(data => {
            console.log(data);
            setEmployee(data.data.user);
          })
        } else {
          res.text()
          .then(data => {
            console.log(JSON.parse(data));
          })
        }
      })
      .catch((err) => console.log(err))
  }, [hashedId]);
  
  useEffect(() => {
      fetchDbsChecksByUserId(hashedId)
      .then(res => {
        if (res.status === 200) {
          res.json()
          .then(data => {
            console.log(data);
            setDbsChecks(data.data.checks);
          })
        } else {
          res.text()
          .then(data => {
            console.log(JSON.parse(data));
          })
        }
      })
      .catch((err) => console.log(err))
    }, [hashedId]);

    useEffect(() => {
      fetchApplicantDocsById(hashedId)
      .then(res => {
        if (res.status === 200) {
          res.json()
          .then(data => {
            console.log(data);
            setUserDocuments(data.data.docs);
          })
        } else {
          res.text()
          .then(data => {
            console.log(JSON.parse(data));
          })
        }
      })
      .catch((err) => console.log(err))
    }, [hashedId]);
  
  const uploadDocument = async (data: DocumentFormValues) =>{
    if (!errors.File && !errors.DocumentType){
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      if (loader) {
        loader.style.display = 'flex';
      }
      if (text) {
        text.style.display = 'none';
      }
      const formData = new FormData();
      formData.append("File", data.File[0]);
      formData.append("DocumentType", data.DocumentType);
      formData.append("UserId", String(hashedId));
      const res = await uploadDocuments(formData);
      handleCreateEmployee(res, loader, text, { toast }, reset)
      .finally(async () => {
        setDocModalState(false);
        const userDocs = await fetchApplicantDocsById(hashedId);
        if (userDocs.status === 200) {
          const resData = await userDocs.json()
          console.log(resData);
          setUserDocuments(resData.data.docs);
        } else {
          const resText = await res.text()
          console.log(JSON.parse(resText));
        }
      });
    }
  } 

  return (
   <>
      <Modal isOpen={docModalState} onRequestClose={() => { setDocModalState(false); }}
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
        
          <div className="h-fit w-100 lg:w-fit">
            <div className="flex justify-start">
              <p className="font-semibold text-black py-1 text-lg"><Upload size={20} className="mr-2" /> Upload New Document {employee && `For ${employee.firstName}`}</p>
            </div>
            <form
                  onSubmit={handleSubmit(uploadDocument)}
                  noValidate
                >
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 mt-2">
                <div>
                  <label
                    className="inline-block mb-2 text-secondary-600 dark:text-white"
                    htmlFor="email"
                  >
                    Document Type
                  </label>
                  <div>
                    <select
                      className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      {
                        ...register('DocumentType', {
                          required: 'Required',
                          pattern: {
                            value: /^(?!default$).+$/,
                            message: 'Required'
                          }
                        })
                      }
                    >
                      <option value="default">Select Document Type</option>
                      <option value="1">International Passport</option>
                      <option value="2">Identification Document</option>
                      <option value="3">Police Certificate</option>
                    </select>
                    <p className='error-msg'>{errors.DocumentType?.message}</p>
                  </div>
                </div>
                <div>
                  <label
                    className="inline-block mb-2 text-secondary-600 dark:text-white"
                    htmlFor="email"
                  >
                    Document
                  </label>
                  <div>
                    <input
                      type="file"
                      className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        {
                        ...register('File', {
                          required: 'Required'
                        })
                      }
                      required
                    />
                    <p className='error-msg'>{errors.File?.message}</p>
                  </div>
                </div>
              </div>
              <hr className="mt-5" />
              <div className="flex justify-end my-2 gap-2">
                <button className="btn text-white bg-black" onClick={() => setDocModalState(false) }>
                  <X size={18} className="mr-2" />
                  Cancel
                </button>
                <button className="btn btn-success">
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
            </form>
          </div>
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
              <p className="text-secondary-600 text-black">
                <NavLink to="/Dashboard">
                  Dashboard
                </NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to="/Employee">
                  Employee Mgt {" "}
                </NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to={`/EmployeeProfile/${id}`}>
                  Employee Profile
                </NavLink>
              </p>
            </div>
          </div>
          <div>
            <NavLink to="/Employee" className="btn btn-primary">
              <Users size={18} className="mr-2" />
              All Employees
            </NavLink>
          </div>
        </div>
        {
          employee && (
            <div className="flex flex-wrap contet-inner" x-data="{ openTab: 1 }">
            <div className="flex-auto w-full mt-6 md:mt-0">
              <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded dark:bg-dark-card">
                <div className="flex-auto p-6 ">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex flex-wrap items-center">
                      <div className=" lg:mb-0 profile-logo profile-logo1">
                        <img
                          src={employee.profileImage}
                          className="w-24 h-24 border-4 border-white mb-3 rounded-full mr-4"
                          style={{ objectFit: "cover" }}
                          alt="profile-image"
                        />
                      </div>
                      <div className="flex flex-wrap items-center mb-4 md:mb-0">
                        <h4 className="mr-2  font-medium mb-0 dark:text-white">
                        {`${employee.firstName} ${employee.lastName}`}
                        </h4>
                        <span className="mb-0 mr-3 text-secondary-600 dark:text-white">
                          {" "}
                          {/* - Web Developer */}
                        </span>
                      </div>
                    </div>
                    <ul className="flex flex-wrap mb-0 text-center ">
                      <li className="nav-item gap-2">
                        <button className="btn btn-warning mr-2 mb-2">
                          <Pen size={18} className="mr-2" />
                          Review Profile
                        </button>
                        <button className="btn btn-danger mr-2 mb-2">
                          <Trash2 size={18} className="mr-2" />
                          Delete Profile
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
              <div className="col lg:col-span-1">
                <div x-show="openTab === 4">
                  <div className="relative flex flex-col mb-8  bg-white shadow rounded-xl dark:bg-dark-card">
                    <div className="p-5 border-b dark:border-secondary-800 dark:border-secondary-800">
                      <h4 className="card-title mb-0 dark:text-white">
                        About User
                      </h4>
                    </div>
                    <div className="p-6">
                      <div className="mt-2">
                        <h6 className="mb-1 dark:text-white">Email:</h6>
                        <p className="mb-3 dark:text-secondary-600">
                          <a href="#">{employee.email}</a>
                        </p>
                      </div>
                      <div className="mt-2">
                        <h6 className="mb-1 dark:text-white">Contact:</h6>
                        <p className="mb-3 dark:text-secondary-600">
                          <a href="#">{employee.phone}</a>
                        </p>
                      </div>
                      <div className="mt-2">
                        <h6 className="mb-1 dark:text-white">Gender:</h6>
                        <p className="mb-3 dark:text-secondary-600">
                          <a href="#">{employee.gender}</a>
                        </p>
                      </div>
                      <div className="mt-2">
                        <h6 className="mb-1 dark:text-white">Date of Birth:</h6>
                        <p className="mb-3 dark:text-secondary-600">
                          <a href="#">{(new Date(employee.dateOfBirth)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</a>
                        </p>
                      </div>
                      <div className="mt-2">
                        <h6 className="mb-1 dark:text-white">Identification Number:</h6>
                        <p className="mb-3 dark:text-secondary-600">
                          <a href="#">{employee.identificationNumber}</a>
                        </p>
                      </div>
                      <div className="mt-2">
                        <h6 className="mb-1 dark:text-white">Address:</h6>
                        <p className="mb-3 dark:text-secondary-600">
                          <a href="#">{employee.address}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col lg:col-span-2">
                <div>
                  <div className="relative flex flex-col mb-8  bg-white shadow rounded-xl dark:bg-dark-card">
                    <div className="p-5 border-b dark:border-secondary-800 dark:border-secondary-800">
                      <h4 className="card-title mb-0 dark:text-white">
                        DBS Checks
                      </h4>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap justify-between overflow-x-auto h-fit">
                        <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-800 border dark:border-secondary-800">
                          <thead>
                            <tr className="bg-secondary-100 dark:bg-dark-bg">
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                S/N
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Request Date
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Requested By
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Request Status
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Request Type
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
                            {
                              dbsChecks.map((data: DbsChecks, index) => (
                              <tr key={data.dbsApplicationId ?? index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="iq-media-group iq-media-group-1">
                                    <h6 className="font-bold dark:text-white">
                                      {" "}
                                      #{index + 1}
                                    </h6>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                  {(new Date(data.dateCreated)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                  {data.requestedBy}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                  {
                                    Number(data.status) === 1 && <p className="p-1 bg-orange-200 text-center rounded-lg">Draft</p>
                                  }
                                  {
                                    Number(data.status) === 2 && <p className="p-1 bg-blue-200 text-center rounded-lg">Submitted</p>
                                  }
                                  {
                                    Number(data.status) === 3 && <p className="p-1 bg-purple-200 text-center rounded-lg">In Review</p>
                                  }
                                  {
                                    Number(data.status) === 4 && <p className="p-1 bg-green-200 text-center rounded-lg">Completed</p>
                                  }
                                  {
                                    Number(data.status) === 5 && <p className="p-1 bg-red-200 text-center rounded-lg">Rejected</p>
                                  }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                  {data.dbsApplicationType}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center list-user-action">
                                    <Tippy content='Preview Dbs Check'>
                                      <NavLink  to={`/EmployeeProfile/${hashIds.encode(String(data.userId))}`}
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
                          dbsChecks.length === 0 ?
                            <div className="py-4 whitespace-nowrap w-full">
                                  <span className="px-6 py-4 text-left font-medium text-black dark:text-white">There hasn't been any dbs check for { employee.firstName }</span>
                            </div> : <></>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="relative flex flex-col mb-8  bg-white shadow rounded-xl dark:bg-dark-card">
                    <div className="p-5 border-b dark:border-secondary-800 dark:border-secondary-800 flex justify-between">
                      <h4 className="card-title mb-0 dark:text-white">
                        Employee Document
                      </h4>
                      <button className="btn btn-success mr-2 mb-2" onClick={() => setDocModalState(true)}>
                        <Plus size={18} className="mr-2" />
                        Add Document
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap justify-between overflow-x-auto h-fit">
                        <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-800 border dark:border-secondary-800">
                          <thead>
                            <tr className="bg-secondary-100 dark:bg-dark-bg">
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                S/N
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Type
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Document
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Upload Date
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Status
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
                            {
                              userDocuments.map((data: UserDocumentValues, index) => (
                              <tr key={data.userDocumentId ?? index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="iq-media-group iq-media-group-1">
                                    <h6 className="font-bold dark:text-white">
                                      {" "}
                                      #{index + 1}
                                    </h6>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                  {
                                    Number(data.userDocumentType) === 1 && 'InternationalPassport'
                                  }
                                  {
                                    Number(data.userDocumentType) === 2 && 'Identification Document'
                                  }
                                  {
                                    Number(data.userDocumentType) === 3 && 'PoliceCertificate'
                                  }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                  <a className="btn btn-info mr-2 mb-2" href={data.fileUrl} target="_blank">
                                    <Eye size={18} className="mr-2" />
                                    View Document
                                  </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                  {(new Date(data.dateCreated)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                  {
                                    Number(data.status) === 1 && <p className="p-1 bg-orange-200 text-center rounded-lg">Pending</p>
                                  }
                                  {
                                    Number(data.status) === 2 && <p className="p-1 bg-green-200 text-center rounded-lg">Verified</p>
                                  }
                                  {
                                    Number(data.status) === 3 && <p className="p-1 bg-red-200 text-center rounded-lg">Rejected</p>
                                  }
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center list-user-action">
                                    <Tippy content='Preview Dbs Check'>
                                      <button
                                        className="btn btn-danger btn-icon btn-sm mr-1"
                                      >
                                        <span className="btn-inner">
                                          <Trash2 />
                                        </span>
                                      </button>
                                    </Tippy>
                                  </div>
                                </td>
                              </tr>
                              ))
                            }
                          </tbody>
                        </table>
                        {
                          userDocuments.length === 0 ? <tr>
                            <div className="py-4 whitespace-nowrap">
                                  <span className="px-6 py-4 text-left font-medium text-black dark:text-white">There are no uploaded document for { employee.firstName }</span>
                            </div>
                          </tr> : <></>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        }
      </div>
    </>
  );
}

export default AdminApplicantsNew;
