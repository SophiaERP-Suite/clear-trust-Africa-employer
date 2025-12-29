import { ChevronRightIcon, Users } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { createEmployee } from "../../../utils/Requests/EmployeeRequests.js";
import { handleCreateEmployee } from "../../../utils/ResponseHandlers/EmployeeResponse.js";
import { toast } from 'react-toastify';

interface ApplicantFormValues {
  FirstName: string;
  LastName: string;
  ProfileImage: string;
  Phone: string;
  Email: string;
  IdentificationNumber: string;
  DateOfBirth: string;
  Gender: string;
  Address: string;
}

function AdminEmployeesNew() {
  const { register, reset, handleSubmit, formState } = useForm<ApplicantFormValues>();
  const { errors } = formState;

  const addApplicant = async (data: ApplicantFormValues) => {
    if (!errors.FirstName && !errors.LastName &&
      !errors.ProfileImage && !errors.Phone &&
      !errors.Email && !errors.IdentificationNumber &&
      !errors.DateOfBirth && !errors.Gender &&
      !errors.Address
    ) {
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      if (loader) {
        loader.style.display = 'flex';
      }
      if (text) {
        text.style.display = 'none';
      }
      const formData = new FormData();
      formData.append('FirstName', data.FirstName);
      formData.append('LastName', data.LastName);
      formData.append('Phone', data.Phone);
      formData.append('Email', data.Email);
      formData.append('IdentificationNumber', data.IdentificationNumber);
      formData.append('DateOfBirth', data.DateOfBirth);
      formData.append('Gender', data.Gender);
      formData.append('Address', data.Address);
      formData.append('ProfileImage', data.ProfileImage[0]);
      const res = await createEmployee(formData);
      handleCreateEmployee(res, loader, text, { toast }, reset);
    }
  }
  return (
    <>
     
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
                Dashboard <ChevronRightIcon size={14} /> Employee Mgt{" "}<ChevronRightIcon size={14} /> New Employee
              </p>
            </div>
          </div>
          <div>
            <a href="Employee" className="btn btn-primary">
              <Users size={18} className="mr-2" />
              All Employees
            </a>
          </div>
        </div>
        <div className="lg:flex lg:grid-cols-2 gap-8">
          <div className="flex-auto w-full">
            <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded -mt-2 dark:bg-dark-card">
              <div className="flex justify-between flex-auto p-6 border-b dark:border-secondary-800">
                <h4 className="mb-0 dark:text-white">Applicant Information</h4>
              </div>
              <div className="p-6 ">
                <form
                  onSubmit={handleSubmit(addApplicant)}
                  noValidate
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5">
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="fname"
                      >
                        First Name:
                      </label>
                      <div>
                        <input
                          type="text"
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('FirstName', {
                              required: 'Required'
                            })
                          }
                          required
                        />
                        <p className='error-msg'>{errors.FirstName?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="lname"
                      >
                        Last Name:
                      </label>
                      <div>
                        <input
                          type="text"
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('LastName', {
                              required: 'Required'
                            })
                          }
                          required
                        />
                        <p className='error-msg'>{errors.LastName?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="mobno"
                      >
                        Mobile Number:
                      </label>
                      <div>
                        <input
                          type="text"
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('Phone', {
                              required: 'Required'
                            })
                          }
                          required
                        />
                        <p className='error-msg'>{errors.Phone?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Email:
                      </label>
                      <div>
                        <input
                          type="text"
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('Email', {
                              required: 'Required',
                              pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: "Invalid Email"
                              }
                            })
                          }
                          required
                        />
                        <p className='error-msg'>{errors.Email?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Applicant Photo:
                      </label>
                      <div>
                        <input
                          type="file"
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            {
                            ...register('ProfileImage', {
                              required: 'Required'
                            })
                          }
                          required
                        />
                        <p className='error-msg'>{errors.ProfileImage?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Date Of Birth:
                      </label>
                      <div>
                        <input
                          type="date"
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('DateOfBirth', {
                              required: 'Required'
                            })
                          }
                          required
                        />
                        <p className='error-msg'>{errors.DateOfBirth?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Identification Number (NIN, SSN, SIN):
                      </label>
                      <div>
                        <input
                          type="text"
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('IdentificationNumber', {
                              required: 'Required'
                            })
                          }
                          required
                        />
                        <p className='error-msg'>{errors.IdentificationNumber?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Gender:
                      </label>
                      <div>
                        <select
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('Gender', {
                              required: 'Required',
                              pattern: {
                                value: /^(?!default$).+$/,
                                message: 'Required'
                              }
                            })
                          }
                        >
                          <option value="default">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <p className='error-msg'>{errors.Gender?.message}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="Address"
                      >
                        Address:
                      </label>
                      <div>
                        <textarea
                          className="w-full h-20 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('Address', {
                              required: 'Required'
                            })
                          }
                          required
                        ></textarea>
                        <p className='error-msg'>{errors.Address?.message}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-5" />
                  <button type="submit" className="btn-primary">
                    <div className="dots hidden" id="query-loader">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                    <span id="query-text">Submit Data</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEmployeesNew;
