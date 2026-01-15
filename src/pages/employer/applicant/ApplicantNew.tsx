import { CheckCheck, ChevronRightIcon, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createEmployee,
  fetchApplicantById,
  updateEmployee,
} from "../../../utils/Requests/EmployeeRequests.js";
import { handleCreateEmployee } from "../../../utils/ResponseHandlers/EmployeeResponse.js";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Hashids from "hashids";

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

function AdminEmployeesNew() {
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const { register, reset, handleSubmit, formState } =
    useForm<ApplicantFormValues>();
  const { errors } = formState;
  const { id } = useParams();
  const hashIds = new Hashids("ClearTrustAfricaEncode", 10);
  const hashedId = id ? Number(hashIds.decode(id)[0]) : 0;
  const isEditMode = !!id;

  useEffect(() => {
    if (hashedId) {
      fetchApplicantById(Number(hashedId))
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              console.log("applicant", data);
              const employeeData = data.data.user;
              setEmployee(employeeData);

              // Reset form with employee data
              reset({
                FirstName: employeeData.firstName || "",
                LastName: employeeData.lastName || "",
                Phone: employeeData.phone || "",
                Email: employeeData.email || "",
                IdentificationNumber: employeeData.identificationNumber || "",
                DateOfBirth: employeeData.dateOfBirth?.split("T")[0] || "",
                Gender: employeeData.gender || "default",
                Address: employeeData.address || "",
              });
            });
          } else {
            res.text().then((data) => {
              console.log(JSON.parse(data));
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [hashedId, reset]);

  const addApplicant = async (data: ApplicantFormValues) => {
    if (
      !errors.FirstName &&
      !errors.LastName &&
      !errors.ProfileImage &&
      !errors.Phone &&
      !errors.Email &&
      !errors.IdentificationNumber &&
      !errors.DateOfBirth &&
      !errors.Gender &&
      !errors.Address
    ) {
      const loader = document.getElementById("query-loader");
      const text = document.getElementById("query-text");
      if (loader) {
        loader.style.display = "flex";
      }
      if (text) {
        text.style.display = "none";
      }
      const formData = new FormData();
      formData.append("FirstName", data.FirstName);
      formData.append("LastName", data.LastName);
      formData.append("Phone", data.Phone);
      formData.append("Email", data.Email);
      formData.append("IdentificationNumber", data.IdentificationNumber);
      formData.append("DateOfBirth", data.DateOfBirth);
      formData.append("Gender", data.Gender);
      formData.append("Address", data.Address);
      formData.append("ProfileImage", data.ProfileImage[0]);
      if (isEditMode) {
        const res = await updateEmployee(formData, hashedId);
        handleCreateEmployee(res, loader, text, { toast }, reset);
      } else {
        const res = await createEmployee(formData);
        handleCreateEmployee(res, loader, text, { toast }, reset);
      }
    }
  };
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
                <NavLink to="/Dashboard">Dashboard</NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to="/Employee">Employee Mgt </NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to="/EmployeeNew">New Employee</NavLink>
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
        <div className="lg:flex lg:grid-cols-2 gap-8">
          <div className="flex-auto w-full">
            <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded -mt-2 dark:bg-dark-card">
              <div className="flex justify-between flex-auto p-6 border-b dark:border-secondary-800">
                <h4 className="mb-0 dark:text-white">Applicant Information</h4>

                {isEditMode && (
                  <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                    Editing Mode
                  </span>
                )}
              </div>
              <div className="p-6 ">
                <form onSubmit={handleSubmit(addApplicant)} noValidate>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5">
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="fname"
                      >
                        First Name
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("FirstName", {
                             required: isEditMode ? false : "Required", 
                          })}
                          defaultValue={employee?.firstName}
                          required
                        />
                        <p className="error-msg">{errors.FirstName?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="lname"
                      >
                        Last Name
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("LastName", {
                             required: isEditMode ? false : "Required", 
                          })}
                          defaultValue={employee?.lastName}
                          required
                        />
                        <p className="error-msg">{errors.LastName?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="mobno"
                      >
                        Mobile Number
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("Phone", {
                             required: isEditMode ? false : "Required", 
                          })}
                          defaultValue={employee?.phone}
                          required
                        />
                        <p className="error-msg">{errors.Phone?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("Email", {
                             required: isEditMode ? false : "Required", 
                            pattern: {
                              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                              message: "Invalid Email",
                            },
                          })}
                          defaultValue={employee?.email}
                          required
                        />
                        <p className="error-msg">{errors.Email?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Applicant Photo
                      </label>
                      <div>
                        <input
                          type="file"
                          className="form-control text-black"
                          {...register("ProfileImage", {
                             required: isEditMode ? false : "Required", 
                          })}
                          required
                        />

                        {isEditMode && (
                          <img
                            src={employee?.profileImage}
                            className="max-w-[25px] mt-3 border rounded-md text-sm text-black"
                          />
                        )}

                        <p className="error-msg">
                          {errors.ProfileImage?.message}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="dateOfBirth"
                      >
                        Date Of Birth
                      </label>
                      <div>
                        <input
                          type="date"
                          id="dateOfBirth"
                          className="form-control text-black"
                          {...register("DateOfBirth", {
                             required: isEditMode ? false : "Required", 
                          })}
                          defaultValue={employee?.dateOfBirth?.split("T")[0]}
                          required
                        />
                        <p className="error-msg">
                          {errors.DateOfBirth?.message}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Identification Number (NIN, SSN, SIN)
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("IdentificationNumber", {
                             required: isEditMode ? false : "Required", 
                          })}
                          defaultValue={employee?.identificationNumber}
                          required
                        />
                        <p className="error-msg">
                          {errors.IdentificationNumber?.message}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Gender
                      </label>
                      <div>
                        <select
                          className="form-control text-black"
                          {...register("Gender", {
                             required: isEditMode ? false : "Required", 
                            pattern: {
                              value: /^(?!default$).+$/,
                              message: "Required",
                            },
                          })}
                          defaultValue={employee?.gender}
                        >
                          <option value="default">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <p className="error-msg">{errors.Gender?.message}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="Address"
                      >
                        Address
                      </label>
                      <div>
                        <textarea
                          className="form-control text-black"
                          {...register("Address", {
                             required: isEditMode ? false : "Required", 
                          })}
                          defaultValue={employee?.address}
                          required
                        ></textarea>
                        <p className="error-msg">{errors.Address?.message}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-5" />
                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-success">
                      <div className="dots hidden" id="query-loader">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                      <span id="query-text">
                        <CheckCheck size={18} className="mr-2" />
                        {isEditMode ? "Update" : "Create Applicant"}
                      </span>
                    </button>
                  </div>
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
