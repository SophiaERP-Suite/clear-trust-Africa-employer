import "../../assets2/css/choices.min.css";
import "../../assets2/css/flatpickr.min.css";
import "../../assets2/css/libs.min.css";
import "../../assets2/css/quill.snow.css";
import "../../assets2/css/responsive.css";
import "../../assets2/css/sheperd.css";
import "../../assets2/css/sweetalert2.min.css";
import "../../assets2/css/tailwind.css";
import "../../assets2/css/uppy.min.css";
import "../../assets2/js/choice.js";
import "../../assets2/js/choices.min.js";
import "../../assets2/js/dashboard.js";
import "../../assets2/js/fslightbox.js";
import "../../assets2/js/libs.min.js";
import "../../assets2/js/slider-tabs.js";
import "../../assets2/js/sweet-alert.js";
import "../../assets2/js/swiper-slider.js";
import donald from "../../assets2/img/donald_adolphus.jpg";
import femi from "../../assets2/img/femi_adebayo.jpg";
import { ChevronRightIcon, File, FileText } from "lucide-react";
import { useState } from "react";

function PaymentDashboard() {
  const [filter, setFilter] = useState("month");
  const stats = [
    {
      label: "Total Amount Paid",
      value: "147",
      trend: "up",
      icon: FileText,
      styling: "bg-gradient-to-r from-green-600 to-green-500",
    },
    // {
    //   label: "Pending Reviews",
    //   value: "23",
    //   change: "-15.4%",
    //   trend: "down",
    //   icon: Clock,
    //   styling: "bg-gradient-to-r from-orange-600 to-orange-500",
    // },
    // {
    //   label: "Cases Closed",
    //   value: "89",
    //   change: "+12.3%",
    //   trend: "up",
    //   icon: CheckCircle,
    //   styling: "bg-gradient-to-r from-red-600 to-red-500",
    // },
    // {
    //   label: "Evidence Items",
    //   value: "1,243",
    //   change: "+8.7%",
    //   trend: "up",
    //   icon: Shield,
    //   styling: "bg-gradient-to-r from-yellow-600 to-yellow-500",
    // },
  ];

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      <div className="flex flex-wrap justify-between mb-6 gap-4">
        <div className="col-md-12">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex">
              <File className="text-blue-600 mr-2" size={36} />
              <div>
                <h3 className="mb-0 text-black">Payment Log</h3>
                <p className="text-secondary-600 text-black">
                  Dashboard <ChevronRightIcon size={14} /> Payment Log{" "}
                </p>
              </div>
            </div>

            <div>
              {/* <a
                href="applicantNew"
                className="text-black btn shadow-md bg-white border focus:bg-gray-200"
              >
                <Plus size={18} className="mr-2" />
                Pay
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow ${stat.styling}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="py-3 px-3 bg-slate-100/50 rounded-full">
                  <Icon className="w-6 h-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid gird-cols-1 lg:col-span-2">
          <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
            <div className="relative flex flex-wrap justify-between p-5 ">
              <h4 className="mb-2 sm:mb-0 font-bold">Payment Log</h4>
              <div className="flex">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
            <hr className="m-0" />
            <div className="flex-auto p-5">
              <div className="border dark:border-secondary-800 rounded overflow-x-auto">
                <table
                  id="basic-table"
                  className="min-w-full overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800"
                >
                  <thead>
                    <tr className="bg-secondary-200 dark:bg-dark-bg">
                      <th className="px-6 py-3 text-left rtl:text-right text-secondary-600 whitespace-nowrap font-semibold dark:text-white">
                        OrderID
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-secondary-600 whitespace-nowrap font-semibold dark:text-white">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-secondary-600 whitespace-nowrap font-semibold dark:text-white">
                        Amount Paid
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-secondary-600 whitespace-nowrap font-semibold dark:text-white">
                        Check Type
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-secondary-600 whitespace-nowrap font-semibold dark:text-white">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800 dark:bg-dark-card dark:text-white">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="iq-media-group iq-media-group-1">
                          <h6 className="font-bold dark:text-white"> #546</h6>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 p-1 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                            src={donald}
                            alt="profile"
                          />
                          <h6 className="font-medium pl-1 mt-2 dark:text-white">
                            Addidis Sportwear
                          </h6>
                        </div>
                      </td>
                      <td className="px-6 font-bold py-4 whitespace-nowrap text-gray-900">
                        ₦100,000
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                        Full Check
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center mb-2">
                          <h6 className="font-medium dark:text-white">
                            10th November, 2025
                          </h6>
                        </div>
                      </td>
                    </tr>

                    <tr className="bg-secondary-200 dark:bg-dark-strip">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="iq-media-group iq-media-group-1">
                          <h6 className="font-bold dark:text-white"> #456</h6>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 p-1 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                            src={femi}
                            alt="profile"
                          />
                          <h6 className="font-medium pl-1 mt-2 dark:text-white">
                            Femi Bankole
                          </h6>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold whitespace-nowrap text-gray-900">
                        ₦100,000
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        Full Check
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center mb-2">
                          <h6 className="font-medium dark:text-white">
                            28th November, 2025
                          </h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDashboard;
