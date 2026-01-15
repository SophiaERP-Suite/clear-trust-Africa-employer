import { CheckCheck, ChevronRightIcon, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { EmployerOrgDto } from "./EmployerProfile";
import { useAuth } from "../../../utils/useAuth";
import { useState, useEffect } from "react";
import { fetchOrganisationData } from "../../../utils/Requests/OrganisationProfile";

function ProfileUpdate() {
  const [employer, setEmployer] = useState<EmployerOrgDto | null>(null);

  const { user } = useAuth();
  const organisationId = user?.organisationId;

  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    const employerData = await fetchOrganisationData(Number(organisationId));
    if (!employerData) {
      return;
    }
    setEmployer(employerData.data);
  };

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
                  <h3 className="mb-0 text-black">
                    Organisation Profile Update
                  </h3>
                  <p className="text-secondary-600 text-black">
                    <NavLink to="/">Dashboard</NavLink>{" "}
                    <ChevronRightIcon size={14} />
                    <NavLink to="/Profile">Organisation Profile</NavLink>{" "}
                    <ChevronRightIcon size={14} />
                    Organisation Profile Update{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex lg:grid-cols-2 gap-8">
          <div className="flex-auto w-full">
            <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded -mt-2 dark:bg-dark-card">
              <div className="flex justify-between flex-auto p-5 border-b dark:border-secondary-800">
                <h4 className="mb-0 dark:text-white">
                  Organisation Profile Update
                </h4>
              </div>
              <div className="p-5">
                <div className="border-red-700 border rounded-lg bg-red-100 p-5 mb-5 text-sm">
                  <span className="text-red-800">
                    <b>Note: </b> If an information is changed your account will
                    be deactivated pending another verification
                  </span>
                </div>
                <form>
                  <div className="grid lg:grid-cols-2 gap-x-8 gap-y-5">
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="fname"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control text-black text-md"
                        id="fname"
                        placeholder="First Name"
                        defaultValue={employer?.name}
                      />
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="lname"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control text-black text-md"
                        id="lname"
                        placeholder="Last Name"
                        defaultValue={employer?.address}
                      />
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="add1"
                      >
                        Registration No
                      </label>
                      <input
                        type="text"
                        className="form-control text-black text-md"
                        id="add1"
                        placeholder="Street Address 1"
                        defaultValue={employer?.registrationNumber}
                      />
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="add2"
                      >
                        TIN
                      </label>
                      <input
                        type="text"
                        className="form-control text-black text-md"
                        id="add2"
                        placeholder="Street Address 2"
                        defaultValue={employer?.tin || "No TIN provided"}
                      />
                    </div>
                  </div>
                  <hr className="mt-5" />

                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-success">
                      <CheckCheck /> Submit
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

export default ProfileUpdate;
