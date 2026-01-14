// src/layouts/BaseDashboardLayout.tsx
import { Outlet, NavLink } from "react-router-dom";
import { useState, useRef, useEffect, type JSX } from "react";
import DashboardHead from "../components/DashboardHead";
import main_logo from "../assets2/img/cleartrust_logo.png";
import mini_logo from "../assets2/img/cleartrust_logo_mini.png";
import { ArrowRight, ArrowLeft, Menu, X, Bell, Search, CircleQuestionMark } from "lucide-react";
import { useAuth } from "../utils/useAuth";
import Modal from 'react-modal';

interface NavItem {
  path: string;
  icon?: JSX.Element;
  label: string;
}

interface BaseDashboardLayoutProps {
  navItems: NavItem[];
  title?: string;
}

function BaseDashboardLayout({ navItems, title }: BaseDashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  function handleSideBarToggle() {
    setIsOpen(!isOpen);
  }

  function handleMobileSideBarToggle() {
    setIsOpenMobile(!isOpenMobile);
  }

  useEffect(() => {
    // Initialize Alpine.js if it's loaded
    if (window.Alpine) {
      window.Alpine.start();
    }
  }, []);

  useEffect(() => {
    Modal.setAppElement('#cta-full-body');
  }, [])

  return (
    <>
      <DashboardHead />

      <div
        className="scroll-smooth flex selection:text-white selection:bg-primary-500"
        style={{ overflowX: "hidden" }}
        x-data="settingInit"
      >
        {/* Sidebar */}
        <aside
          className={`${
            isOpen ? "w-64" : "w-20"
          } z-50 sidebar hidden md:block  shadow-lg sidebar-base sidebar-default w-60 bg-gray-800 text-white min-h-screen`}
        >
          <div className="sidebar-header relative flex items-center justify-start mb-3 border-b dark:border-gray-700 z-0">
            {isOpen ? (
              <div className="flex items-center text-black justify-between w-full">
                <a
                  href="dashboard"
                  className="flex px-5 py-4 mr-4 rtl:ml-4 rtl:mr-0 text-xl whitespace-nowrap"
                >
                  <div className="sidebar-logo ml-2">
                    <img
                      src={main_logo}
                      style={{ width: "170px" }}
                      alt="logo"
                      className="mr-3"
                    />
                  </div>
                </a>
              </div>
            ) : (
              <div className="">
                <a
                  href="dashboard"
                  className="flex justify-center py-2 px-2 my-2 relative right-2 items-center"
                >
                  <div className="sidebar-logo">
                    <img
                      src={mini_logo}
                      style={{ width: "160px" }}
                      alt="logo"
                    />
                  </div>
                </a>
              </div>
            )}
          </div>

          <div className="nav-item static-item border-b">
            <p className="nav-link static-item disabled">
              {isOpen ? (
                <a
                  className="py-0 flex items-center p-2 ml-2 hover:text-primary-500 active:text-primary-500 focus:text-primary-500 focus"
                  href="#"
                >
                  <div className="h-12 w-12 border rounded-full" style={{ backgroundColor: "#0000ff2f", display: "flex", justifyContent: "center", alignItems: "center", color: "#000000", borderWidth: "1px", borderColor: "#000"}}>
                      { user && `${user.firstName[0]} ${user.lastName[0]}` }
                  </div>
                  <div className="caption ml-3 d-none d-md-block ">
                    <h6 className="mb-0 caption-title mr-4" style={{}}>
                      { user && `${user.firstName} ${user.lastName}` }
                    </h6>
                    <p className="mb-0 text-sm font-bold caption-sub-title focusa active:text-primary-500  focus:text-primary-500 hover:text-primary-500 text-black mr-4">
                      { user && user.userRole }
                    </p>
                  </div>
                </a>
              ) : (
                <a className="py-0 flex justify-center" href="#">
                  <span className="h-12 w-12 border rounded-full" style={{ backgroundColor: "#0000ff2f", display: "flex", justifyContent: "center", alignItems: "center", color: "#000000", borderWidth: "1px", borderColor: "#000"}}>
                      { user && `${user.firstName[0]} ${user.lastName[0]}` }
                  </span>
                </a>
              )}
            </p>
          </div>

          <div className="sidebar-body data-scrollbar mt-4">
            <ul className="sidebar-main-menu">
              {navItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-black  ${
                        isOpen
                          ? "nav-link"
                          : "flex justify-center items-center gap-4 my-1 py-3 nav-link-sub"
                      } ${isActive ? "active" : ""}`
                    }
                  >
                    {item.icon}
                    {isOpen ? (
                      <span className="item-name">{item.label}</span>
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <aside
          className={`${
            isOpenMobile ? "block" : "hidden"
          } z-50 sidebar block md:hidden shadow-lg sidebar-base sidebar-default w-60 bg-gray-800 text-white min-h-screen`}
        >
          <div className="sidebar-header relative flex items-center justify-start mb-3 border-b dark:border-gray-700 z-0">
            <a
              href="dashboard"
              className="flex px-2 py-4 mr-4 rtl:ml-4 rtl:mr-0 text-xl whitespace-nowrap"
            >
              <span className="sidebar-logo ml-2" style={{ width: "160px" }}>
                <img src={main_logo} alt="logo" />
              </span>
            </a>
            <div>
              <X
                size={25}
                className="text-black"
                onClick={handleMobileSideBarToggle}
              />
            </div>
          </div>

          <div className="sidebar-body data-scrollbar">
            <div className="nav-item static-item mb-2">
              <div className="nav-item static-item">
                <p className="nav-link static-item disabled">
                  <a
                    className="py-0 flex items-center p-2 ml-2 hover:text-primary-500 active:text-primary-500 focus:text-primary-500 focus"
                    href="#"
                  >
                    <span className="h-12 w-12 border rounded-full" style={{ backgroundColor: "#0000ff2f", display: "flex", justifyContent: "center", alignItems: "center", color: "#000000", borderWidth: "1px", borderColor: "#000"}}>
                      { user && `${user.firstName[0]} ${user.lastName[0]}` }
                    </span>
                    <div className="caption ml-3 d-none d-md-block ">
                      <span className="mb-0 caption-title mr-4" style={{}}>
                        { user && `${user.firstName} ${user.lastName}` }
                      </span>
                      <span className="mb-0 text-sm font-bold caption-sub-title focusa active:text-primary-500  focus:text-primary-500 hover:text-primary-500 text-black mr-4">
                        { user && user.userRole }
                      </span>
                    </div>
                  </a>
                </p>
              </div>
              <ul className="sidebar-main-menu">
                {navItems.map((item) => (
                  <li key={item.path} className="nav-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""} text-black`
                      }
                    >
                      {item.icon}
                      <span className="item-name">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`main-content flex-1 bg-gray-50 overflow-y-auto transition-all duration-300 ${
            isOpen ? "ml-64" : "ml-20"
          }`}
          x-data="{ data: true }"
        >
          <div className="relative">
            <nav className="z-40 bg-white dark:bg-dark-card nav shadow-lg navbar navbar-expand-xl navbar-light iq-navbar py-0">
              <div className="w-full px-7 py-2">
                <div className="relative">
                  {/* Mobile menu button */}
                  <div className="absolute flex items-center px-2 py-0 mt-4 lg:hidden right-0">
                    <div className="inline-flex items-center justify-center cursor-pointer text-xl text-black top-5">
                      <Menu size={30} onClick={handleMobileSideBarToggle} />
                      {/* <X size={18} /> */}
                    </div>
                  </div>

                  <div className="flex justify-between items-center h-16">
                    <div className="breadcrumb-title xl:flex hidden justify-between items-center lg:flex mt-3">
                      <div className="breadcrumb-title xl:flex sm:hidden justify-center items-center lg:flex">
                        <small className="capitalize cursor-pointer hidden md:block mr-3 pr-3 border-r border-secondary-300 dark:border-secondary-700 dark:text-white">
                          {!isOpen ? (
                            <ArrowRight
                              size={18}
                              onClick={handleSideBarToggle}
                            />
                          ) : (
                            <ArrowLeft
                              size={18}
                              onClick={handleSideBarToggle}
                            />
                          )}
                        </small>
                      </div>
                      <h2 className="hidden xl:flex text-2xl font-bold text-gray-900 items-center gap-3">
                        {title} PORTAL
                      </h2>
                    </div>

                    <div className="flex mx-2 items-center">
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center xl:hidden gap-2 display-none">
                          <a
                            href="../dashboard/index.html"
                            className="flex items-center whitespace-nowrap gap-4"
                          >
                            <img
                              src={main_logo}
                              style={{ width: "160px" }}
                              alt="logo"
                              className="mr-3"
                            />
                          </a>
                        </div>

                        <div className="offcanvas-body">
                          <ul className="iq-nav-menu header-menu w-full lg:w-auto list-unstyled ml-2 rtl:mr-2 rtl:ml-0">
                            <li
                              className="nav-item"
                              style={{ display: "none" }}
                            >
                              <a
                                className="nav-link menu-arrow justify-start text-secondary-600"
                                href="javascript:void(0)"
                                aria-controls="homeData"
                              >
                                <svg
                                  className="icon-20"
                                  width="20"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                                <span className="nav-text ml-2 rtl:ml-0 rtl:mr-2">
                                  Home
                                </span>
                              </a>
                            </li>
                            <li
                              className="nav-item"
                              style={{ display: "none" }}
                            >
                              <a
                                className="nav-link menu-arrow justify-start text-secondary-600"
                                href="javascript:void(0)"
                                aria-controls="allPagesData"
                              >
                                <svg
                                  className="icon-20"
                                  width="20"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    opacity="0.4"
                                    d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2"
                                    fill="currentColor"
                                  ></path>
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.07999 6.64999V6.65999C7.64899 6.65999 7.29999 7.00999 7.29999 7.43999C7.29999 7.86999 7.64899 8.21999 8.07999 8.21999H11.069C11.5 8.21999 11.85 7.86999 11.85 7.42899C11.85 6.99999 11.5 6.64999 11.069 6.64999H8.07999ZM15.92 12.74H8.07999C7.64899 12.74 7.29999 12.39 7.29999 11.96C7.29999 11.53 7.64899 11.179 8.07999 11.179H15.92C16.35 11.179 16.7 11.53 16.7 11.96C16.7 12.39 16.35 12.74 15.92 12.74ZM15.92 17.31H8.07999C7.77999 17.35 7.48999 17.2 7.32999 16.95C7.16999 16.69 7.16999 16.36 7.32999 16.11C7.48999 15.85 7.77999 15.71 8.07999 15.74H15.92C16.319 15.78 16.62 16.12 16.62 16.53C16.62 16.929 16.319 17.27 15.92 17.31Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                                <span className="nav-text ml-2 rtl:ml-0 rtl:mr-2">
                                  Pages
                                </span>
                              </a>
                              <ul
                                className="iq-header-sub-menu list-unstyled"
                                id="allPagesData"
                              >
                                <li className="nav-item">
                                  <a
                                    className="nav-link menu-arrow"
                                    href="#specialPages"
                                    aria-controls="specialPages"
                                  >
                                    Special Pages
                                    <i className="right-icon">
                                      <svg
                                        className="icon-20"
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.5 5L15.5 12L8.5 19"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </i>
                                  </a>
                                  <ul
                                    className="iq-header-sub-menu left list-unstyled"
                                    id="specialPages"
                                  >
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/special-pages/billing.html"
                                      >
                                        Billing
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/special-pages/calender.html"
                                      >
                                        Calender
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/special-pages/kanban.html"
                                      >
                                        Kanban
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/special-pages/pricing.html"
                                      >
                                        Pricing
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/special-pages/timeline.html"
                                      >
                                        Timeline
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className="nav-link menu-arrow"
                                    href="#authSkins"
                                    aria-controls="authSkins"
                                  >
                                    Auth skins
                                    <i className="right-icon">
                                      <svg
                                        className="icon-20"
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.5 5L15.5 12L8.5 19"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </i>
                                  </a>
                                  <ul
                                    className="iq-header-sub-menu left list-unstyled"
                                    id="authSkins"
                                  >
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/auth/sign-in.html"
                                      >
                                        Sign In
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/auth/sign-up.html"
                                      >
                                        Sign Up
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/auth/confirm-mail.html"
                                      >
                                        Email Verified
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/auth/recoverpw.html"
                                      >
                                        Reset Password
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/auth/lock-screen.html"
                                      >
                                        Lock Screen
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/auth/two-factors.html"
                                      >
                                        Two Factors
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/auth/deactivate.html"
                                      >
                                        Account Deactivate
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className="nav-link menu-arrow"
                                    href="#userApps"
                                    aria-controls="userApps"
                                  >
                                    User
                                    <i className="right-icon">
                                      <svg
                                        className="icon-20"
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.5 5L15.5 12L8.5 19"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </i>
                                  </a>
                                  <ul
                                    className="iq-header-sub-menu left list-unstyled"
                                    id="userApps"
                                  >
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/app/user-profile.html"
                                      >
                                        User Profile
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/app/user-add.html"
                                      >
                                        User Add
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/app/user-list.html"
                                      >
                                        User List
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className="nav-link menu-arrow"
                                    href="#utilities"
                                    aria-controls="utilities"
                                  >
                                    Utilities
                                    <i className="right-icon">
                                      <svg
                                        className="icon-20"
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.5 5L15.5 12L8.5 19"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </i>
                                  </a>
                                  <ul
                                    className="iq-header-sub-menu left list-unstyled"
                                    id="utilities"
                                  >
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/errors/maintenance.html"
                                      >
                                        Maintenance
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/errors/error404.html"
                                      >
                                        404
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/errors/error500.html"
                                      >
                                        505
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className="nav-link menu-arrow"
                                    href="#extraPlugins"
                                    aria-controls="extraPlugins"
                                  >
                                    Plugins
                                    <i className="right-icon">
                                      <svg
                                        className="icon-20"
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.5 5L15.5 12L8.5 19"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </i>
                                  </a>
                                  <ul
                                    className="iq-header-sub-menu left list-unstyled"
                                    id="extraPlugins"
                                  >
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/button-hover.html"
                                      >
                                        Button Hover
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/choise-js.html"
                                      >
                                        Choise JS
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/fslightbox.html"
                                      >
                                        FSlightbox
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/sweet-alert.html"
                                      >
                                        Sweetalert
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/flatpickr.html"
                                      >
                                        flatpickr
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/apexcharts.html"
                                      >
                                        Apexcharts
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/gallery-hover.html"
                                      >
                                        Gallery Hover
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/loader.html"
                                      >
                                        Loader
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/quill-editor.html"
                                      >
                                        Quill
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        href="../dashboard/plugins/uppy.html"
                                      >
                                        Uppy
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>

                        <div className="hidden lg:flex ml-7 lg:grow transition-all duration-700 ease-in-out">
                          <ul className="flex items-center mb-2 ml-auto rtl:ml-0 rtl:mr-auto lg:mb-0">
                            <li className="flex items-center justify-end">
                              <div className="flex items-center border border-gray-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 transition-all duration-200">
                                <input
                                  type="text"
                                  placeholder="Search..."
                                  className="hidden lg:block px-3 py-2 w-56 text-gray-800 focus:outline-none bg-transparent"
                                />
                                <button
                                  type="button"
                                  className="p-2 hover:bg-gray-700 transition-colors duration-200"
                                >
                                  <Search className="text-black" size={20} />
                                </button>
                              </div>
                            </li>

                            <li
                              className="flex items-center pl-2"
                              x-data="{ open: false }"
                            >
                              <a
                                href="#"
                                className="block p-2 group hover:text-primary-500 focusa text-secondary-600"
                              >
                                <Bell className="text-black" size={22} />
                              </a>
                              <div
                                x-show="open"
                                className="absolute z-40 rtl:right-2/3 rounded top-14 shadow w-80"
                                x-transition:enter="transition ease-in duration-500"
                                x-transition:enter-start="opacity-0 transform translate-y-16"
                                x-transition:enter-end="opacity-100 transform translate-y-0"
                                x-transition:leave="transition ease-out duration-500"
                                x-transition:leave-start="opacity-100 transform translate-y-0"
                                x-transition:leave-end="opacity-0 transform translate-y-0"
                                style={{ display: "none" }}
                              >
                                <div className="bg-white dark:bg-dark-card shadow-lg rounded-t-lg rounded-b-lg dark:text-secondary-600 ">
                                  <div className="flex px-5 py-3 bg-primary-500 rounded-t">
                                    <h5 className="text-xl font-medium text-white">
                                      All Notifications
                                    </h5>
                                  </div>
                                  <div>
                                    <a
                                      href="#"
                                      className="flex justify-between w-full px-5 py-3 border-b dark:border-secondary-700 hover:bg-primary-500/[0.1] group"
                                    >
                                      <div className="flex items-center">
                                        <div>
                                          <img
                                            className="w-10 h-10 p-1 text-primary-400 bg-primary-500/10 rounded-full dark:bg-primary-500/10"
                                            src="../assets/images/shapes/01.png"
                                          />
                                        </div>
                                        <div className="ml-3 rtl:ml-0 rtl:mr-3 LR">
                                          <h6 className="mb-0 text-black font-medium">
                                            Emma Watson Bni
                                          </h6>
                                          <small className="LR text-sm text-secondary-600 dark:text-secondary-600">
                                            95 MB
                                          </small>
                                        </div>
                                      </div>
                                      <div className="flex items-end">
                                        <small className="RL text-sm text-secondary-600 dark:text-secondary-600 ">
                                          Just Now
                                        </small>
                                      </div>
                                    </a>
                                    <a
                                      href="#"
                                      className="flex justify-between w-full px-5 py-3 border-b dark:border-secondary-700 hover:bg-primary-500/[0.1] group"
                                    >
                                      <div className="flex items-center">
                                        <div>
                                          <img
                                            className="w-10 h-10 p-1 text-primary-400 bg-primary-500/10 rounded-full dark:bg-primary-500/10"
                                            src="../assets/images/shapes/02.png"
                                          />
                                        </div>
                                        <div className="ml-3 rtl:ml-0 rtl:mr-3 LR">
                                          <h6 className="mb-0 text-black font-medium">
                                            New customer is join
                                          </h6>
                                          <small className="text-sm text-secondary-600 dark:text-secondary-600">
                                            Cyst Bni
                                          </small>
                                        </div>
                                      </div>
                                      <div className="flex items-end">
                                        <small className="RL text-sm text-secondary-600 dark:text-secondary-600 ">
                                          5 days ago
                                        </small>
                                      </div>
                                    </a>
                                    <a
                                      href="#"
                                      className="flex justify-between w-full px-5 py-3 border-b dark:border-secondary-700 hover:bg-primary-500/[0.1] group"
                                    >
                                      <div className="flex items-center">
                                        <div>
                                          <img
                                            className="w-10 h-10 p-1 text-primary-400 bg-primary-500/10 rounded-full dark:bg-primary-500/10"
                                            src="../assets/images/shapes/03.png"
                                          />
                                        </div>
                                        <div className="ml-3 rtl:ml-0 rtl:mr-3 LR">
                                          <h6 className="mb-0 text-black font-medium">
                                            Two customer is left
                                          </h6>
                                          <small className="text-sm text-secondary-600 dark:text-secondary-600">
                                            Cyst Bni
                                          </small>
                                        </div>
                                      </div>
                                      <div className="flex items-end">
                                        <small className="RL text-sm text-secondary-600 dark:text-secondary-600 ">
                                          2 days ago
                                        </small>
                                      </div>
                                    </a>
                                    <a
                                      href="#"
                                      className="flex justify-between w-full px-5 py-3 border-b dark:border-secondary-700 hover:bg-primary-500/[0.1] group"
                                    >
                                      <div className="flex items-center">
                                        <div>
                                          <img
                                            className="w-10 h-10 p-1 text-primary-400 bg-primary-500/10 rounded-full dark:bg-primary-500/10"
                                            src="../assets/images/shapes/04.png"
                                          />
                                        </div>
                                        <div className="ml-3 rtl:ml-0 rtl:mr-3 LR">
                                          <h6 className="mb-0 text-black font-medium">
                                            New Mail from Fenny
                                          </h6>
                                          <small className="text-sm text-secondary-600 dark:text-secondary-600">
                                            Cyst Bni
                                          </small>
                                        </div>
                                      </div>
                                      <div className="flex items-end">
                                        <small className="RL text-sm text-secondary-600 dark:text-secondary-600 ">
                                          3 days ago
                                        </small>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </li>
                             <li className="relative flex items-center pl-2 border-r group">
                              <a
                                href="help"
                                className="block p-3 hover:text-primary-500 text-secondary-600"
                              >
                                <CircleQuestionMark
                                  className="text-black"
                                  size={22}
                                />
                              </a>

                              {/* Tooltip */}
                              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 invisible group-hover:visible bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                Help & Support
                              </span>
                            </li>
                            <li
                              className="nav-item iq-full-screen sm:hidden xl:block border-r"
                              id="fullscreen-item"
                              style={{ display: "none" }}
                            >
                              <a
                                className="flex items-center p-2 hover:text-primary-500 focusa text-secondary-600"
                                x-data="fullscreen"
                                href="#"
                              >
                                <div className="w-8 rounded-full">
                                  <span className="btn-inner">
                                    <Search className="text-black" size={22} />
                                  </span>
                                </div>
                              </a>
                            </li>

                            <li x-data="{ open: false }" id="itemdropdown1">
                              <div
                                className="relative inline-block text-left"
                                ref={dropdownRef}
                              >
                                <a
                                  className="py-0 flex items-center p-2 ml-2 hover:text-primary-500 active:text-primary-500 focus:text-primary-500 focus"
                                  href="#"
                                  onClick={() => setOpen(!open)}
                                >
                                  <div className="h-12 w-12 border rounded-full" style={{ backgroundColor: "#ff7b002f", display: "flex", justifyContent: "center", alignItems: "center", color: "#000000", borderWidth: "1px", borderColor: "#000"}}>
                                    { user && user.organisationName[0] }
                                  </div>
                                  <div className="caption ml-3 d-none d-md-block ">
                                    <h6
                                      className="mb-0 caption-title mr-4"
                                      style={{}}
                                    >
                                      { user && user.organisationName }
                                    </h6>
                                    <p className="mb-0 font-bold caption-sub-title focusa active:text-primary-500  focus:text-primary-500 hover:text-primary-500 text-black mr-4">
                                      { user && user.organisationType }
                                    </p>
                                  </div>
                                </a>
                                {open && (
                                  <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                                    <div className="py-1 px-2">
                                      <p className="w-full px-4 py-2 text-left text-md border-b font-bold text-gray-700 hover:bg-gray-100">
                                        Teachers Registration Council of Nigeria
                                      </p>
                                      <ul className="py-2">
                                        <li className="w-full px-4 py-2 text-left rounded-md text-sm text-gray-700 hover:bg-gray-100">
                                          <a>Organization Profile</a>
                                        </li>
                                        <li className="w-full px-4 py-2 text-left rounded-md text-sm text-gray-700 hover:bg-gray-100">
                                          <a>Settings</a>
                                        </li>
                                        <li className="w-full px-4 py-2 text-left rounded-md text-sm text-gray-700 hover:bg-gray-100">
                                          <button onClick={logout}>Logout</button>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {/* Page Content */}
          <div className="" id='cta-full-body'>
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="footer w-full text-sm bg-white dark:bg-dark-card ">
            <ul className="p-0 mb-0 left-panel list-inline">
              <li className="inline-block mr-2 text-primary-500 dark:text-primary-500">
                <a href="../dashboard/extra/privacy-policy.html">
                  Privacy Policy
                </a>
              </li>
              <li className="inline-block mr-2 text-primary-500 dark:text-primary-500">
                <a href="../dashboard/extra/terms-of-use.html">Terms of Use</a>
              </li>
            </ul>
            <div className="footer-second text-secondary-700 flex flex-wrap dark:text-white text-sm">
              © {new Date().getFullYear()} Powered by{" "}
              {/* <a
                className="text-primary-500 dark:text-primary-500 ml-1"
                href="https://sophiaerp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sophia ERP
              </a>{" "}
              and{" "} */}
              <a
                className="text-primary-500 dark:text-primary-500 ml-1"
                href="https://techiefy.co.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Techiefy UK
              </a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

export default BaseDashboardLayout;
