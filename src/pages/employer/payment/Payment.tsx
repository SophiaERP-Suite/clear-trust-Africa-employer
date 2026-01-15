import { ChevronRightIcon, File } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../utils/useAuth";

interface DBSType {
  dbsTypeId: number;
  name: string;
}

interface DBSApplication {
  dbsApplicationId: number;
  dbsTypeId: number;
  status: string;
  dateCreated: string;
  dbsType: DBSType;
}

interface PaymentDto {
  paymentId: number;
  amount: number;
  currency: string;
  userName: string;
  txRef: string;
  status: number;
  userId: number;
  dateCreated: string;
  dbsApplicationId: number | null;
  dbsCheck: string;
  dbsApplication?: DBSApplication;
}

function PaymentDashboard() {
  const [payment, setPayment] = useState<PaymentDto[]>([]);

  const { user } = useAuth();
  const organisationId = user?.organisationId;

  useEffect(() => {
    fetchPaymemts(Number(organisationId));
  }, [organisationId]);

  const fetchPaymemts = async (organisationId: number) => {
    // setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `http://localhost:5181/api/payments/${organisationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch incident: ${errorText}`);
      }

      const paymentData = await response.json();
      setPayment(paymentData.data);
      console.log("Fetched payment data:", paymentData.data);
    } catch (error) {
      console.error("Error fetching incident data:", error);
      alert("Failed to load incident data. Please try again.");
    } finally {
      // setIsLoading(false);
    }
  };

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

            <div></div>
          </div>
        </div>
      </div>

      <div>
        <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid gird-cols-1 lg:col-span-2">
          <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
            <div className="relative flex flex-wrap justify-between p-5 ">
              <h4 className="mb-2 sm:mb-0 text-xl font-bold">Payment Log</h4>
              {/* <div className="flex">
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
              </div> */}
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
                      <th className="px-6 py-3 text-left rtl:text-right text-black whitespace-nowrap font-semibold dark:text-white">
                        Trxnref
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black whitespace-nowrap font-semibold dark:text-white">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black whitespace-nowrap font-semibold dark:text-white">
                        Amount Paid
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black whitespace-nowrap font-semibold dark:text-white">
                        Check Type
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black whitespace-nowrap font-semibold dark:text-white">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800 dark:bg-dark-card dark:text-white">
                    {payment && payment.length > 0 ? (
                      payment.map((item) => (
                        <tr key={item.paymentId}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="iq-media-group iq-media-group-1">
                              <h6 className="font-bold dark:text-white">
                                #{item.txRef || "_"}
                              </h6>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <h6 className="font-medium pl-1 mt-2 dark:text-white">
                                {item.userName || "_"}
                              </h6>
                            </div>
                          </td>
                          <td className="px-6 font-bold py-4 whitespace-nowrap text-gray-900">
                            {item.currency || "_"}{" "}
                            {item.amount?.toLocaleString() || "100,000"}{" "}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {item.dbsApplication?.dbsType?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center mb-2">
                              <h6 className="font-medium dark:text-white">
                                {" "}
                                {item.dateCreated
                                  ? new Date(
                                      item.dateCreated
                                    ).toLocaleDateString("en-US", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })
                                  : "—"}
                              </h6>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-6 py-8 text-center text-gray-500">
                          No payment data available
                        </td>
                      </tr>
                    )}
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
