import { useState } from "react";
import {
  Lock,
  Key,
  Eye,
  EyeOff,
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Monitor,
  RefreshCw,
  ChevronRightIcon,
} from "lucide-react";

export default function Security() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const loginHistory = [
    {
      id: 1,
      device: "Windows PC",
      location: "Lagos, Nigeria",
      ip: "197.210.xxx.xxx",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      device: "iPhone 14 Pro",
      location: "Lagos, Nigeria",
      ip: "197.210.xxx.xxx",
      time: "1 day ago",
      status: "success",
    },
    {
      id: 3,
      device: "MacBook Pro",
      location: "Abuja, Nigeria",
      ip: "105.112.xxx.xxx",
      time: "3 days ago",
      status: "success",
    },
    {
      id: 4,
      device: "Android Phone",
      location: "Unknown",
      ip: "41.58.xxx.xxx",
      time: "5 days ago",
      status: "failed",
    },
  ];

  const activeSessions = [
    {
      id: 1,
      device: "Windows PC - Chrome",
      location: "Lagos, Nigeria",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: 2,
      device: "iPhone 14 Pro - Safari",
      location: "Lagos, Nigeria",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
  ];

  const securitySettings = [
    {
      id: 1,
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      enabled: true,
      critical: true,
    },
    {
      id: 2,
      title: "Login Alerts",
      description: "Get notified of new sign-ins",
      enabled: true,
      critical: false,
    },
    {
      id: 3,
      title: "Session Timeout",
      description: "Auto logout after 30 minutes of inactivity",
      enabled: true,
      critical: false,
    },
    {
      id: 4,
      title: "IP Whitelist",
      description: "Only allow logins from approved IPs",
      enabled: false,
      critical: true,
    },
  ];

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
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

      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Security Settings
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your account security and authentication
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Account Secured
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 ">
            {/* Change Password */}
            <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
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
                      <p className="text-sm text-slate-500">
                        Update your password regularly for better security
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
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

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
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
                  </div>

                  <a className="btn btn-primary">Update Password</a>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
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
                      <p className="text-sm text-slate-500">
                        Protect your account with an additional security layer
                      </p>
                    </div>
                    <button
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
                    </button>
                  </div>
                </div>
                <div className="bg-white p-6">
                  {twoFactorEnabled && (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-900">
                            2FA is Active
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            Your account is protected with authenticator app
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                          View Backup Codes
                        </button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                          Reset 2FA
                        </button>
                      </div>
                    </div>
                  )}

                  {!twoFactorEnabled && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">
                          2FA is Disabled
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Enable two-factor authentication to secure your
                          account
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
              <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
                <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <ShieldCheck className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Security Preferences
                      </h2>
                      <p className="text-sm text-slate-500">
                        Configure additional security options
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <div className="space-y-3">
                    {securitySettings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-slate-900">
                              {setting.title}
                            </p>
                            {setting.critical && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                                Critical
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {setting.description}
                          </p>
                        </div>
                        <button
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            setting.enabled ? "bg-blue-600" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              setting.enabled
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Login History */}
            <div className="flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
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
                        <p className="text-sm text-slate-500">
                          Recent account access activity
                        </p>
                      </div>
                    </div>
                    {/* <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View All
                    </button> */}
                  </div>
                </div>
                <div className="bg-white p-6">
                  <div className="space-y-3">
                    {loginHistory.map((login) => (
                      <div
                        key={login.id}
                        className="flex items-start gap-3 p-3 border border-slate-200 rounded-md"
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            login.status === "success"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          <Monitor
                            className={`w-4 h-4 ${
                              login.status === "success"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-slate-900">
                              {login.device}
                            </p>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                login.status === "success"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {login.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {login.location}
                            </span>
                            <span>{login.ip}</span>
                            <span>{login.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Score */}
            <div className="flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
              <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
                <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Security Score
                  </h3>
                </div>
                <div className="bg-white p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e2e8f0"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#10b981"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.85)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-900">
                          85%
                        </span>
                        <span className="text-xs text-slate-500">Strong</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Password Strength</span>
                      <span className="font-medium text-green-600">Strong</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">2FA Status</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">
                        Last Password Change
                      </span>
                      <span className="font-medium text-slate-900">
                        45 days ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className=" flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
              <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
                <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Active Sessions
                    </h3>
                    {/* <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                      End All
                    </button> */}
                  </div>
                </div>
                <div className="bg-white p-6">
                  <div className="space-y-3">
                    {activeSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-3 border border-slate-200 rounded-md"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium text-slate-900">
                            {session.device}
                          </p>
                          {session.isCurrent && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 text-xs text-slate-500">
                          <p className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {session.location}
                          </p>
                          <p>{session.lastActive}</p>
                        </div>
                        {!session.isCurrent && (
                          <button className="mt-2 w-full px-3 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors">
                            End Session
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="relative flex flex-col max-h-[420px] mb-8 lg:mb-0 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
              <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
                <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Quick Actions
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="space-y-2">
                <button className="w-full px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Generate Backup Codes
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reset Security Settings
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Report Suspicious Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}























