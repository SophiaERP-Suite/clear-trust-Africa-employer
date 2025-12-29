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
import { NavLink, useParams } from "react-router-dom";

function AdminApplicantsNew() {
  const { id } = useParams();

  return (
   <>
      
      <div
        className="text-white h-48 sub-header"
        style={{ backgroundColor: "rgb(112 22 208 / 1)", overflow: "hidden" }}
      >
        <div className="w-full p-8">
          <div className="row">
            <div className="px-4 col-md-12">
              <div className="flex flex-wrap items-center justify-between">
                <div>
                  <h1 className="text-white mb-2 mr-16">Employee Profile</h1>
                  <p className="mb-4 text-white mr-16">
                    <p className="text-secondary-600 text-white">
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
                  </p>
                </div>
                <div>
                  <NavLink to="/Employee"
                    className="text-white btn shadow-md btn-soft-light hover:shadow-xl hover:bg-glass focus:bg-gray-200"
                  >
                    <Users size={18} className="mr-2" />
                    All Employers
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute top-0 h-80 img-height overflow-hidden"
          style={{ zIndex: -1 }}
        >
          <img
            src="/test.jpg"
            alt="header"
            className="animated-scaleX object-cover w-screen h-full rounded-2xl"
          />
        </div>
      </div>
      <div
        className="p-6 lg:p-8 footer-inner  mx-auto main-container  lg:py-0 py-0 "
        x-bind:class="setting.page_layout"
      >
        <div className="flex flex-wrap contet-inner" x-data="{ openTab: 1 }">
          <div className="flex-auto w-full mt-6 md:mt-0">
            <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded dark:bg-dark-card">
              <div className="flex-auto p-6 ">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex flex-wrap items-center">
                    <div className="right-0 lg:relative mb-0 mr-4 -mt-20 lg:top-0 top-9 md:top-4 lg:mb-0 profile-logo profile-logo1">
                      <img
                        src="/log-test.jpg"
                        className="w-24 h-24 border-4 border-white mb-3 rounded-full"
                        style={{ objectFit: "cover" }}
                        alt="profile-image"
                      />
                    </div>
                    <div className="flex flex-wrap items-center mb-4 md:mb-0">
                      <h4 className="mr-2  font-medium mb-0 dark:text-white">
                       Erling Plc
                      </h4>
                      <span className="mb-0 mr-3 text-secondary-600 dark:text-white">
                        {" "}
                        {/* - Web Developer */}
                      </span>
                    </div>
                  </div>
                  <ul className="flex flex-wrap mb-0 text-center ">
                    <li className="nav-item">
                      <a
                        className="block px-4 py-2 text-secondary-600 hover:text-primary-500 rounded-full focus:text-white focus:bg-primary-500 focus:rounded-full"
                        href="#profile-feed"
                        x-bind:style="openTab == 1 ? 'border-radius:9999px; color:white; background-color:#7016d0' : ''"
                      >
                        Overview
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="block px-4 py-2 text-secondary-600 hover:text-primary-500 rounded-full focus:text-white focus:bg-primary-500 focus:rounded-full"
                        href="#profile-activity"
                        x-bind:style="openTab == 2 ? 'border-radius:9999px; color:white; background-color:#7016d0' : ''"
                      >
                        Requests
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="block px-4 py-2 text-secondary-600 hover:text-primary-500 rounded-full focus:text-white focus:bg-primary-500 focus:rounded-full"
                        href="#profile-friends"
                        x-bind:style="openTab == 3 ? 'border-radius:9999px; color:white; background-color:#7016d0' : ''"
                      >
                        {/* Records */}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            <div className="flex-auto w-full lg:w-2/4">
              
              <div x-show="openTab === 4">
                <div className="relative flex flex-col mb-8  bg-white shadow rounded dark:bg-dark-card">
                  <div className="p-6 border-b dark:border-secondary-800">
                    <h4 className="text-2xl font-medium  card-title mb-0 dark:text-white">
                      Profile
                    </h4>
                  </div>
                  <div className="p-6 ">
                    <div className="text-center">
                      <div className="user-profile">
                        <img
                          src="/test.jpg"
                          alt="profile-img"
                           style={{ objectFit: "cover" }}
                          className="inline-block w-32 h-32 max-w-full rounded-full img-fluid"
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="inline-block dark:text-white">
                          Austin Robertson
                        </h3>
                        <p className="inline-block dark:text-white">
                          -Web developer
                        </p>
                        <p className="mb-0 text-secondary-600 dark:text-white">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col mb-8  bg-white shadow rounded-xl dark:bg-dark-card">
                  <div className="p-5 border-b dark:border-secondary-800 dark:border-secondary-800">
                    <h4 className="card-title mb-0 dark:text-white">
                      About User
                    </h4>
                  </div>
                  <div className="p-6">
                    <div className="user-bio">
                      <p className="mb-3 text-secondary-600 dark:text-white">
                        Tart I love sugar plum I love oat cake. Sweet roll
                        caramels I love jujubes. Topping cake wafer.
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1 dark:text-white">Joined:</h6>
                      <p className="mb-3 dark:text-white">Feb 15, 2021</p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1 dark:text-white">Lives:</h6>
                      <p className="mb-3 dark:text-white">
                        United States of America
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1 dark:text-white">Email:</h6>
                      <p className="mb-3 dark:text-secondary-600">
                        <a href="#"> austin@gmail.com</a>
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1 dark:text-white">Url:</h6>
                      <p className="mb-3 dark:textsecondary-600">
                        <a href="#" target="_blank">
                          {" "}
                          www.tailwindui.com{" "}
                        </a>
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="mb-1 dark:text-white">Contact:</h6>
                      <p className="mb-3 dark:text-secondary-600">
                        <a href="#">(001) 4544 565 456</a>
                      </p>
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

export default AdminApplicantsNew;
