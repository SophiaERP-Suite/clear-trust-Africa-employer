import { ArrowLeftFromLine, Clock } from "lucide-react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { verifyDbsPayment } from "../../../utils/Requests/DbsRequests";

export default function PaymentRedirect() {
    const { tx_ref } = useParams();

    useEffect(() => {
        if (tx_ref) {
            verifyDbsPayment(tx_ref);
        }
    }, [tx_ref]);
    return <div className="p-6 lg:p-8 footer-inner mx-auto main-container container">
      <div>
        <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid gird-cols-1 lg:col-span-2">
          <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
            <hr className="m-0" />
            <div className="flex-auto p-5">
              <div className="h-80 border dark:border-secondary-800 rounded justify-center content-center">
                <div>
                    <div className="flex justify-center mb-2">
                        <p className="text-center bg-orange-300 p-2 rounded-full">
                            <Clock size={60} color="#ffffff" />
                        </p>
                    </div>
                    <h3  className="text-center">Payment Processing</h3>
                    <p className="text-center">Your Payment Is Being Processed. You would receive a mail once payment is confirmed</p>
                    <div className="flex justify-center mt-2">
                        <NavLink to="/Dashboard" className="btn btn-success mr-2 mb-2">
                            <ArrowLeftFromLine size={18} className="mr-2" />
                            Back To Dashboard
                        </NavLink>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}