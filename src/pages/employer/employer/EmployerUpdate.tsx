import { ChevronRightIcon, User } from "lucide-react";
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

function ProfileUpdate() {
  return (
    <>
      
      <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      {/* Header */}
      <div className="flex flex-wrap mb-8 justify-between gap-4">
        <div className="col-md-12">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex">
              <User className="text-[rgb(112_22_208/0.9)] mr-2 " size={36} />
              <div>
                <h3 className="mb-0 text-black">Profile Update</h3>
                <p className="text-secondary-600 text-black">
                  Dashboard <ChevronRightIcon size={14} /> Profile <ChevronRightIcon size={14} /> Profile Update{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="lg:flex lg:grid-cols-2 gap-8">
          <div className="flex-auto w-full lg:w-1/4">
            <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded -mt-2 dark:bg-dark-card">
              <div className="flex justify-between flex-auto p-5 mb-4 border-b dark:border-secondary-800">
                <div className="header-title">
                  <h4 className="mb-0 dark:text-white">Profile Update</h4>
                </div>
              </div>
              <div className="p-5">
                <form>
                  <div className="mb-4">
                    <div className="relative">
                      <img
                        className="w-24 h-24 rounded"
                        src="/company-avatar.png"
                        alt="profile-pic"
                      />
                      <div className="image-upload absolute cursor-pointer top-auto w-8 h-8 text-center bg-primary-500 border-4 border-white rounded-full left-20 rtl:right-20 rtl:left-0 -bottom-2">
                        <label htmlFor="file-input">
                          <svg
                            className="inline-block pb-1 m-0.5"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#ffffff"
                              d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                            ></path>
                          </svg>
                        </label>
                        <input
                          id="file-input"
                          className="hidden file-upload"
                          type="file"
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <div className="mt-4 ">
                      <div className="items-center inline-block">
                        <span className="text-secondary-600 dark:text-white">
                          Only
                        </span>
                        <a
                          href="javascript:void();"
                          className="text-primary-400 hover:text-primary-500"
                        >
                          .jpg
                        </a>
                        <a
                          href="javascript:void();"
                          className="text-primary-400 hover:text-primary-500"
                        >
                          .png
                        </a>
                        <a
                          href="javascript:void();"
                          className="text-primary-400 hover:text-primary-500"
                        >
                          .jpeg
                        </a>
                        <span className="text-secondary-600 dark:text-white">
                          allowed
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="inline-block mb-2 text-secondary-600 dark:text-white"
                      htmlFor="user_role"
                    >
                      User Role:
                    </label>
                    <select
                      name="type"
                      className="block w-full px-4 py-2  dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 dark:focus:border-primary-500 focus:shadow selectpicker appearance-none"
                      data-style="py-0"
                      id="user_role"
                    >
                      <option>Select</option>
                      <option>Web Designer</option>
                      <option>Web Developer</option>
                      <option>Tester</option>
                      <option>Php Developer</option>
                      <option>Ios Developer </option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="inline-block mb-2 text-secondary-600 dark:text-white"
                      htmlFor="furl"
                    >
                      Facebook Url:
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                      id="furl"
                      placeholder="Facebook Url"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="inline-block mb-2 text-secondary-600 dark:text-white"
                      htmlFor="turl"
                    >
                      Twitter Url:
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                      id="turl"
                      placeholder="Twitter Url"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="inline-block mb-2 text-secondary-600 dark:text-white"
                      htmlFor="instaurl"
                    >
                      Instagram Url:
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                      id="instaurl"
                      placeholder="Instagram Url"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="inline-block mb-2 text-secondary-600 dark:text-white"
                      htmlFor="lurl"
                    >
                      Linkedin Url:
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                      id="lurl"
                      placeholder="Linkedin Url"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-auto w-full lg:w-3/4">
            <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded -mt-2 dark:bg-dark-card">
              <div className="flex justify-between flex-auto p-6 border-b dark:border-secondary-800">
                <h4 className="mb-0 dark:text-white">Buisness Information</h4>
              </div>
              <div className="p-6 ">
                <form>
                  <div className="grid lg:grid-cols-2 gap-x-8 gap-y-5">
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="fname"
                      >
                        First Name:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="fname"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="lname"
                      >
                        Last Name:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="lname"
                        placeholder="Last Name"
                      />
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="add1"
                      >
                        Street Address 1:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="add1"
                        placeholder="Street Address 1"
                      />
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="add2"
                      >
                        Street Address 2:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="add2"
                        placeholder="Street Address 2"
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="cname"
                      >
                        Company Name:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="cname"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="country"
                      >
                        Country:
                      </label>
                      <select
                        name="type"
                        className="block w-full px-4 py-2 text-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow selectpicker appearance-none dark:focus:border-primary-500"
                        data-style="py-0"
                        id="country"
                      >
                        <option>Select Country</option>
                        <option>Caneda</option>
                        <option>Noida</option>
                        <option>USA</option>
                        <option>India</option>
                        <option>Africa</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="mobno"
                      >
                        Mobile Number:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="mobno"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="altconno"
                      >
                        Alternate Contact:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="altconno"
                        placeholder="Alternate Contact"
                      />
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="pno"
                      >
                        Pin Code:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="pno"
                        placeholder="Pin Code"
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="city"
                      >
                        Town/City:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="city"
                        placeholder="Town/City"
                      />
                    </div>
                  </div>
                  <hr className="mt-5" />
                  {/* <h5 className="mb-4 dark:text-white">Security</h5>
                  <div className="grid lg:grid-cols-2 gap-x-8">
                    <div className="w-full mb-3 col-span-2">
                      <label
                        className="inline-block mb-2 text-slate-400 text-secondary-600 dark:text-white"
                        htmlFor="uname"
                      >
                        User Name:
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="uname"
                        placeholder="User Name"
                      />
                    </div>
                    <div className="w-full mb-3">
                      <label
                        className="inline-block mb-2 text-slate-400 text-secondary-600 dark:text-white"
                        htmlFor="pass"
                      >
                        Password:
                      </label>
                      <input
                        type="password"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="pass"
                        placeholder="Password"
                      />
                    </div>
                    <div className="w-full mb-3">
                      <label
                        className="inline-block mb-2 text-slate-400 text-secondary-600 dark:text-white"
                        htmlFor="rpass"
                      >
                        Repeat Password:
                      </label>
                      <input
                        type="password"
                        className="block w-full px-4 py-2 placeholder-secondary-400 dark:bg-dark-card dark:border-secondary-800 bg-white border rounded outline-none focus:border-primary-500 focus:shadow dark:focus:border-primary-500"
                        id="rpass"
                        placeholder="Repeat Password "
                      />
                    </div>
                  </div> */}
                  <div className="mb-3">
                    <label className="inline-block mb-2 text-secondary-600 dark:text-white">
                      <input
                        className="float-left w-4 h-4 mt-1 mr-2  border border-primary-500 rounded dark:bg-dark-card rtl:float-right rtl:ml-2 rtl:mr-0 "
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                      />
                      Enable Two-Factor-Authentication
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
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

export default ProfileUpdate;
