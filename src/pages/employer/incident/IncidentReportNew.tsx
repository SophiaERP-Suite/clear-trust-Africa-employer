import {
  CheckCheck,
  ChevronRightIcon,
  TriangleAlert,
  Users,
} from "lucide-react";
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
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

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

function IncidentReportNew() {
  const { register, reset, handleSubmit, formState } =
    useForm<ApplicantFormValues>();
  const { errors } = formState;

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
      const res = await createEmployee(formData);
      handleCreateEmployee(res, loader, text, { toast }, reset);
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
              <h3 className="mb-0 text-black">New Incident Report </h3>
              <p className="text-secondary-600 text-black">
                <NavLink to="/Dashboard">Dashboard</NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to="/Employee">Incident Mgt </NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to="/EmployeeNew">New Incident Report</NavLink>
              </p>
            </div>
          </div>
          <div>
            <NavLink to="/IncidentMgt" className="btn btn-primary">
              <TriangleAlert size={18} className="mr-2" />
              All Reports
            </NavLink>
          </div>
        </div>
        <div className="lg:flex lg:grid-cols-2 gap-8">
          <div className="flex-auto w-full">
            <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded -mt-2 dark:bg-dark-card">
              <div className="flex justify-between flex-auto p-6 border-b dark:border-secondary-800">
                <h4 className="mb-0 dark:text-white">Incident Report</h4>
              </div>
              <div className="p-6 ">
                <form onSubmit={handleSubmit(addApplicant)} noValidate>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5">
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="fname"
                      >
                        Title
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          {...register("FirstName", {
                            required: "Required",
                          })}
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
                        Employee
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          {...register("LastName", {
                            required: "Required",
                          })}
                          required
                        />
                        <p className="error-msg">{errors.LastName?.message}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="mobno"
                      >
                        Desciption
                      </label>
                      <div>
                        <textarea
                          rows={4}
                          className="w-full h-20 form-control"
                          {...register("Phone", {
                            required: "Required",
                          })}
                          required
                        ></textarea>
                        <p className="error-msg">{errors.Phone?.message}</p>
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
                          className="w-full h-20 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {...register("Address", {
                            required: "Required",
                          })}
                          required
                        ></textarea>
                        <p className="error-msg">{errors.Address?.message}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-5" />
                  <button type="submit" className="btn btn-success">
                    <div className="dots hidden" id="query-loader">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                    <span id="query-text">
                      <CheckCheck size={18} className="mr-2" />
                      Create Applicant
                    </span>
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

export default IncidentReportNew;
