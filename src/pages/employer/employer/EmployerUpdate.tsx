import { CheckCheck, ChevronRightIcon, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/useAuth";
import { useState, useEffect } from "react";
import {
  fetchOrganisationData,
  UpdateOrganisationData,
} from "../../../utils/Requests/OrganisationProfile";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface UpdateOrgFormValues {
  Name: string;
  Address: string;
  RegistrationNumber: string;
  TIN: string;
}

function ProfileUpdate() {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const organisationId = user?.organisationId;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateOrgFormValues>();

  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    const employerData = await fetchOrganisationData(Number(organisationId));
    if (!employerData) {
      return;
    }
    reset({
      Name: employerData.data.name || "",
      Address: employerData.data.address || "",
      RegistrationNumber: employerData.data.registrationNumber || "",
      TIN: employerData.data.tin || "",
    });
  };

  const onSubmit = async (data: UpdateOrgFormValues) => {
    setIsLoading(true);

    try {
      const updateInfoResult = await UpdateOrganisationData(
        data,
        Number(organisationId)
      );

      if (updateInfoResult) {
        toast.success("Organisation updated successfully!");
        navigate("/Profile");
      } else {
        toast.error("Failed to update organisation");
      }
    } catch (error) {
      console.error("Error updating organisation:", error);
      toast.error("An error occurred while updating organisation");
    } finally {
      setIsLoading(false);
    }
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

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid lg:grid-cols-2 gap-x-8 gap-y-5">
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="name"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control text-black text-md"
                        id="name"
                        placeholder="Organisation Name"
                        {...register("Name", {
                          required: "Organisation name is required",
                        })}
                      />
                      {errors.Name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.Name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="address"
                      >
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control text-black text-md"
                        id="address"
                        placeholder="Address"
                        {...register("Address", {
                          required: "Address is required",
                        })}
                      />
                      {errors.Address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.Address.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="regNumber"
                      >
                        Registration No <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control text-black text-md"
                        id="regNumber"
                        placeholder="Registration Number"
                        {...register("RegistrationNumber", {
                          required: "Registration number is required",
                        })}
                      />
                      {errors.RegistrationNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.RegistrationNumber.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="tin"
                      >
                        TIN
                      </label>
                      <input
                        type="text"
                        className="form-control text-black text-md"
                        id="tin"
                        placeholder="Tax Identification Number"
                        {...register("TIN")}
                      />
                    </div>
                  </div>

                  <hr className="mt-5" />

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/Profile")}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <CheckCheck className="mr-2" size={18} />
                          Submit
                        </>
                      )}
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
