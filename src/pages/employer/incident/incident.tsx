
import {
  // Plus,
  List,
  ListChecks,
  ClockAlert,
  ChevronRightIcon,
  AlertTriangleIcon,
  AlertCircle,
  Timer,
  ActivityIcon,
} from "lucide-react";
import donald from "../../../assets2/img/donald_adolphus.jpg";
import femi from "../../../assets2/img/femi_adebayo.jpg";

export default function Incidents() {
  return (
    <div className="p-6 lg:p-8 footer-inner mx-auto main-container container">
      {/* Header */}
      <div className="mb-6">
        <div className="w-full mb-8">
          <div className="row">
            <div className="col-md-12">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex">
                  <AlertTriangleIcon className="text-blue-600 mr-2" size={36} />
                  <div>
                    <h3 className="mb-0 text-black">Incident Management</h3>
                    <p className="text-secondary-600 text-black">
                      Dashboard <ChevronRightIcon size={14} /> Incident
                      Management{" "}
                    </p>
                  </div>
                </div>

                <div>
                  {/* <a
                    href="applicantNew"
                    className="text-black btn shadow-md bg-white border focus:bg-gray-200"
                  >
                    <Plus size={18} className="mr-2" />
                    Add New
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
          {/* Total Incidents */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md border border-blue-600 p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full">
                <List className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-white">Total Incidents</p>
                <h2 className="text-3xl font-bold text-white">1</h2>
              </div>
            </div>
          </div>
 
          {/* Resolved */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-md border border-green-600 p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full">
                <ListChecks className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-white">Resolved</p>
                <h2 className="text-3xl font-bold text-white">4</h2>
              </div>
            </div>
          </div>

          {/* Under Investigation */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg shadow-md border border-yellow-500 p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 w-12 h-12 flex items-center justify-center rounded-full">
                <ClockAlert className="text-yellow-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-white">Under Investigation</p>
                <h2 className="text-3xl font-bold text-white">3</h2>
              </div>
            </div>
          </div>

          {/* Critical */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-md border border-red-600 p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 w-12 h-12 flex items-center justify-center rounded-full">
                <AlertCircle className="text-red-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-white">Critical</p>
                <h2 className="text-3xl font-bold text-white">3</h2>
              </div>
            </div>
          </div>

          {/* Avg Resolution Time */}
          <div className="bg-white rounded-lg shadow-md border border-indigo-600 p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 w-12 h-12 flex items-center justify-center rounded-full">
                <Timer className="text-indigo-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Resolution Time</p>
                <h2 className="text-3xl font-bold text-indigo-700">2 hrs</h2>
              </div>
            </div>
          </div>

          {/* Open Rate */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg shadow-md border border-purple-600 p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full">
                <ActivityIcon className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-white">Open Rate</p>
                <h2 className="text-3xl font-bold text-white">50%</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid gird-cols-1 lg:col-span-2">
          <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
            <div className="relative flex flex-wrap justify-between p-5 ">
              <h4 className="mb-2 sm:mb-0 text-xl font-bold">Incident Reports</h4>
              <div className="flex"></div>
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
                        INCIDENTID
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-secondary-600 whitespace-nowrap font-semibold dark:text-white">
                        APPLICANT
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-secondary-600 whitespace-nowrap font-semibold dark:text-white">
                        CHECK TYPE
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-secondary-600 whitespace-nowrap font-semibold dark:text-white">
                        STATUS
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-secondary-600 whitespace-nowrap font-semibold dark:text-white">
                        DATE
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800 dark:bg-dark-card dark:text-white">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="iq-media-group iq-media-group-1">
                          <h6 className="font-bold dark:text-white">
                            {" "}
                            #343
                          </h6>
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
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                        Full Check
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        Pending
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
                          <h6 className="font-bold dark:text-white">
                            {" "}
                           #356
                          </h6>
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
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        Full Check
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        Pending
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
