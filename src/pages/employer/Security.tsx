import { useEffect, useState } from "react";
import {
  Lock,
  Smartphone,
  ShieldCheck,
  Clock,
  MapPin,
  Monitor,
  ChevronRightIcon,
  CheckCheck,
  AlertCircle,
  EyeOff,
  Eye,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  GetAllLoginAuditTrailsByOrganisationAsync,
  UpdatePassword,
} from "../../utils/Requests/SecurityRequests";
import { useAuth } from "../../utils/useAuth";
import type { AuditDto } from "../../types/audit";

export interface ChangePasswordFormValues {
  CurrentPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}

export default function Security() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAudit, setLoginAudit] = useState<AuditDto[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>();

  const { user } = useAuth();
  const organisationId = user?.organisationId;

  const newPassword = watch("NewPassword");

  useEffect(() => {
    fetchLoginAuditTrail();
  }, []);

  const fetchLoginAuditTrail = async () => {
    try {
      const response = await GetAllLoginAuditTrailsByOrganisationAsync(
        Number(organisationId)
      );

      if (response) {
        setLoginAudit(response);
        console.log("audit-data:", response);
      } else {
        throw new Error(await response.text());
      }
    } catch {}
  };

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setIsLoading(true);

    try {
      const result = await UpdatePassword(data, Number(organisationId));

      if (result) {
        toast.success(result.message || "Password updated successfully!");
        reset();
      } else {
        toast.error(result.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred while updating password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      <ToastContainer />
      {/* Header */}
      <div className="flex flex-wrap mb-6 justify-between gap-4">
        <div className="col-md-12">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex">
              <ShieldCheck
                className="text-[rgb(112_22_208/0.9)] mr-2 "
                size={36}
              />
              <div>
                <h3 className="mb-0 text-black">Security</h3>
                <p className="text-secondary-600 text-black">
                  Dashboard <ChevronRightIcon size={14} /> Security{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 ">
            {/* Change Password */}
            <div className="relative flex flex-col mb-8 bg-white rounded-lg shadow-md dark:bg-dark-card grid grid-cols-1">
              <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
                <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Lock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Change Password
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <p className="text-xs text-red-500 pb-3">
                    <AlertCircle size={15} /> Only the password of the currently
                    logged-in administrator is updated.
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Current Password */}
                    <div className="mb-4">
                      <label className="block text-md font-medium text-black mb-2">
                        Current Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="form-control text-black text-md"
                          {...register("CurrentPassword", {
                            required: "Current password is required",
                          })}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.CurrentPassword && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.CurrentPassword.message}
                        </p>
                      )}
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                      <label className="block text-md font-medium text-black mb-2">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="form-control text-black text-md"
                          {...register("NewPassword", {
                            required: "New password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
                              message:
                                "Password must include uppercase, lowercase, number, and special character",
                            },
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.NewPassword && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.NewPassword.message}
                        </p>
                      )}
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          <span className="text-slate-500">
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          <span className="text-slate-500">
                            Include uppercase and lowercase letters
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          <span className="text-slate-500">
                            Include numbers and special characters
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                      <label className="block text-md font-medium text-black mb-2">
                        Confirm New Password{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="form-control text-black text-md"
                          {...register("ConfirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                              value === newPassword || "Passwords do not match",
                          })}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.ConfirmPassword && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.ConfirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn btn-warning"
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
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Login History */}
            <div className="flex flex-col mb-8 bg-white rounded-lg shadow-md dark:bg-dark-card grid grid-cols-1">
              <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
                <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-full">
                        <Clock className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          Login History
                        </h2>
                        <p className="text-md text-slate-500">
                          Recent account access activity
                        </p>
                      </div>
                    </div>
                    {/* <button className="text-md text-blue-600 hover:text-blue-700 font-medium">
                      View All
                    </button> */}
                  </div>
                </div>
                <div className="bg-white p-6">
                  <div className="space-y-3">
                    <div className="space-y-3">
                      {loginAudit?.length > 0 ? (
                        loginAudit.map((audit) => (
                          <div
                            key={audit.auditTrailId}
                            className="flex items-start gap-3 p-3 border border-slate-200 rounded-md"
                          >
                            <div
                              className={`p-2 rounded-lg ${
                                audit.statusName === "Success"
                                  ? "bg-green-100"
                                  : "bg-red-100"
                              }`}
                            >
                              <Monitor
                                className={`w-4 h-4 ${
                                  audit.statusName === "Success"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-md font-medium text-slate-900">
                                  {audit.deviceType}
                                </p>
                                <span
                                  className={`text-xs px-2 py-1 rounded-lg ${
                                    audit.statusName === "Success"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {audit.statusName}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {audit.city}, {audit.country}
                                </span>
                                <span>{audit.actionDateFormatted}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-slate-500">
                          No login history available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* <span>{loginAudit.ip}</span> */}
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Two-Factor Authentication */}
            <div className="relative flex flex-col mb-8 bg-white rounded-lg shadow-md dark:bg-dark-card grid grid-cols-1">
              <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
                <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Smartphone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-slate-900">
                        Two-Factor Authentication (2FA)
                      </h2>
                    </div>
                    {/* <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        twoFactorEnabled ? "bg-green-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button> */}
                  </div>
                </div>
                <div className="bg-white p-6">
                  <p className="text-md text-slate-500 pb-2">
                    Protect your account with an additional security layer
                  </p>
                  {/* {twoFactorEnabled && (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-md font-medium text-green-900">
                            2FA is Active
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            Your account is protected with authenticator app
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button className="px-4 py-2 border border-slate-200 rounded-lg text-md font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                          View Backup Codes
                        </button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg text-md font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                          Reset 2FA
                        </button>
                      </div>
                    </div>
                  )}

                  {!twoFactorEnabled && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-md font-medium text-yellow-900">
                          2FA is Disabled
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Enable two-factor authentication to secure your
                          account
                        </p>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
