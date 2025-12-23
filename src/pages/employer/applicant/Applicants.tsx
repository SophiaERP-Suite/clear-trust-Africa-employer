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
import { ChevronRightIcon, Plus, Users } from "lucide-react";
import donald from "../../../assets2/img/donald_adolphus.jpg";
import rashkin from "../../../assets2/img/isaiah_rashkin.jpg";
import deborah from "../../../assets2/img/deborah_wilkins.jpg";
import femi from "../../../assets2/img/femi_adebayo.jpg";

function AdminEmployees() {
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
                Dashboard <ChevronRightIcon size={14} /> Employee Management{" "}
              </p>
            </div>
          </div>
          <div>
            <a href="EmployeeNew" className="btn btn-primary">
              <Plus size={18} className="mr-2" />
              Add New
            </a>
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
                <div className="overflow-x-auto">
                  <div className=" overflow-x-auto p-5">
                    <div className="flex flex-wrap justify-between my-6 mx-5">
                      <div className="flex justify-center items-center mb-1">
                        <label
                          className="inline-block text-secondary-600 dark:text-white"
                          htmlFor="show"
                        >
                          Show
                        </label>
                        <div className="flex">
                          <select
                            className="block w-full px-2 py-1 ml-2 text-base font-normal rounded text-secondary-500 dark:bg-dark-card dark:border-secondary-800 bg-white border outline-none focus:border-primary-500 focus:shadow"
                            aria-label=".form-select-sm example"
                            id="show"
                          >
                            <option selected={true}>10</option>
                            <option value="1">25</option>
                            <option value="2">50</option>
                            <option value="3">100</option>
                          </select>
                          <span className="text-secondary-600 ml-1 dark:text-white">
                            entries
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center mb-1">
                        <label
                          className="inline-block mb-2 text-secondary-600 dark:text-white"
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
                    <table className="min-w-full overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800 border dark:border-secondary-800">
                      <thead>
                        <tr className="bg-secondary-100 dark:bg-dark-bg">
                          <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                            Name
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                            Phone
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                            Gender
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                            Date Added
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-secondary-600 dark:text-white">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
                        
                      </tbody>
                    </table>
                    <div className="border dark:border-secondary-800">
                      <div className="flex flex-wrap justify-between my-6 mx-5">
                        <div className="flex justify-center items-center mb-1">
                          <p className="text-secondary-600">
                            Showing 4 to 1 of 1 entries
                          </p>
                        </div>
                        <div className="inline-flex flex-wrap">
                          <a
                            href="#"
                            className="border-t border-b border-l text-primary-500 border-secondary-500 px-2 py-1 rounded-l dark:border-secondary-800"
                          >
                            Previous
                          </a>
                          <a
                            href="#"
                            className="border text-white border-secondary-500 cursor-pointer bg-primary-500 px-4 py-1 dark:border-secondary-800"
                          >
                            1
                          </a>
                          <a
                            href="#"
                            className="border-r border-t border-b text-primary-500 border-secondary-500 px-4 py-1 rounded-r dark:border-secondary-800"
                          >
                            Next
                          </a>
                        </div>
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
