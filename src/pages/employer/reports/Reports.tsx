import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  CheckCircle,
  Clock,
  Shield,
  ChevronRightIcon,
  BarChart3,
} from "lucide-react";

export default function InvestigationPortal() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      label: "Active Cases",
      value: "147",
      change: "+5.2%",
      trend: "up",
      icon: FileText,
      styling: "bg-gradient-to-r from-green-600 to-green-500",
    },
    {
      label: "Pending Reviews",
      value: "23",
      change: "-15.4%",
      trend: "down",
      icon: Clock,
      styling: "bg-gradient-to-r from-orange-600 to-orange-500",
    },
    {
      label: "Cases Closed",
      value: "89",
      change: "+12.3%",
      trend: "up",
      icon: CheckCircle,
      styling: "bg-gradient-to-r from-red-600 to-red-500",
    },
    {
      label: "Evidence Items",
      value: "1,243",
      change: "+8.7%",
      trend: "up",
      icon: Shield,
      styling: "bg-gradient-to-r from-yellow-600 to-yellow-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "Case",
      desc: "Case #CR-2025-1847 opened",
      status: "New",
      time: "15m ago",
    },
    {
      id: 2,
      type: "Evidence",
      desc: "Digital evidence submitted",
      status: "Pending",
      time: "1h ago",
    },
    {
      id: 3,
      type: "Case",
      desc: "Case #CR-2025-1839 closed",
      status: "Closed",
      time: "3h ago",
    },
    {
      id: 4,
      type: "Alert",
      desc: "Priority case flagged",
      status: "Urgent",
      time: "5h ago",
    },
  ];

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between mb-6 gap-4">
        <div className="col-md-12">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex">
              <BarChart3
                className="text-[rgb(112_22_208/0.9)] mr-2 "
                size={36}
              />
              <div>
                <h3 className="mb-0 text-black">Reports & Analytics</h3>
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
      {/* <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Investigation Portal</h1>
              <p className="text-sm text-slate-500 mt-1">Case Management & Analytics Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200 mb-8 w-fit">
          {["overview", "analytics", "reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[rgb(112_22_208/0.9)] text-red-700"
                  : "text-slate-600 hover:bg-red-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className={`bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow ${stat.styling}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <Icon className="w-5 h-5 text-slate-700" />
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-medium text-white`}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{stat.change}</span>
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

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Case Status Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Case Activity Trend
                  </h2>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                      Week
                    </button>
                    <button className="px-3 py-1 text-xs font-medium bg-slate-900 text-white rounded-md">
                      Month
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                      Year
                    </button>
                  </div>
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[55, 48, 62, 45, 58, 72, 65, 78, 52, 68, 75, 82].map(
                    (height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-xs text-slate-400">
                          {
                            [
                              "J",
                              "F",
                              "M",
                              "A",
                              "M",
                              "J",
                              "J",
                              "A",
                              "S",
                              "O",
                              "N",
                              "D",
                            ][idx]
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid gird-cols-1">
                <div className="flex flex-col overflow-hidden bg-white rounded-2xl shadow-md dark:bg-gray-900 dark:text-gray-300">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
                    <h4 className="text-lg font-semibold dark:text-white">
                      Recent Activity
                    </h4>
                  </div>

                  {/* Body */}
                  <div className="space-y-4 p-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === "New"
                              ? "bg-blue-500"
                              : activity.status === "Pending"
                              ? "bg-yellow-500"
                              : activity.status === "Closed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900">
                            {activity.desc}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            activity.status === "New"
                              ? "bg-blue-100 text-blue-700"
                              : activity.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : activity.status === "Closed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Cases */}
            <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid gird-cols-1">
              <div className="flex flex-col overflow-hidden bg-white rounded-2xl shadow-md dark:bg-gray-900 dark:text-gray-300">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
                  <h4 className="text-lg font-semibold dark:text-white">
                    High Priority Cases
                  </h4>
                </div>

                {/* Body */}
                <div className="space-y-3 p-4">
                  {[
                    {
                      id: "CR-2025-1847",
                      title: "Financial Fraud Investigation",
                      priority: "Critical",
                      progress: 65,
                    },
                    {
                      id: "CR-2025-1842",
                      title: "Organized Crime Network",
                      priority: "High",
                      progress: 42,
                    },
                    {
                      id: "CR-2025-1838",
                      title: "Cyber Security Breach",
                      priority: "High",
                      progress: 78,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.id}
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            {item.title}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            item.priority === "Critical"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-500">
                            Investigation Progress
                          </span>
                          <span className="text-xs font-medium text-slate-700">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Case Distribution */}
              <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid gird-cols-1">
                <div className="flex flex-col overflow-hidden bg-white rounded-2xl shadow-md dark:bg-gray-900 dark:text-gray-300">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
                    <h4 className="text-lg font-semibold dark:text-white">
                      Case Type Distribution
                    </h4>
                  </div>

                  {/* Body */}
                  <div className="space-y-3 p-4">
                    {[
                      {
                        type: "Financial Crimes",
                        count: 45,
                        percentage: 31,
                        color: "bg-blue-500",
                      },
                      {
                        type: "Cyber Crimes",
                        count: 38,
                        percentage: 26,
                        color: "bg-purple-500",
                      },
                      {
                        type: "Organized Crime",
                        count: 32,
                        percentage: 22,
                        color: "bg-red-500",
                      },
                      {
                        type: "Fraud Cases",
                        count: 25,
                        percentage: 17,
                        color: "bg-orange-500",
                      },
                      {
                        type: "Other",
                        count: 7,
                        percentage: 4,
                        color: "bg-slate-400",
                      },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">
                            {item.type}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">
                              {item.count} cases
                            </span>
                            <span className="text-sm font-semibold text-slate-900">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Evidence Processing */}
              <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid gird-cols-1">
                <div className="flex flex-col overflow-hidden bg-white rounded-2xl shadow-md dark:bg-gray-900 dark:text-gray-300">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
                    <h4 className="text-lg font-semibold dark:text-white">
                      Evidence Processing Status
                    </h4>
                  </div>

                  {/* Body */}
                  <div className="space-y-3 p-4">
                    {[
                      { status: "Collected", count: 456, color: "bg-blue-500" },
                      {
                        status: "Under Analysis",
                        count: 234,
                        color: "bg-yellow-500",
                      },
                      { status: "Verified", count: 389, color: "bg-green-500" },
                      {
                        status: "Pending Chain of Custody",
                        count: 164,
                        color: "bg-orange-500",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 ${item.color} rounded-full`}
                          />
                          <span className="text-sm font-medium text-slate-900">
                            {item.status}
                          </span>
                        </div>
                        <span className="text-lg font-semibold text-slate-900">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Resolution Metrics */}
            <div className="relative flex flex-col mb-8 bg-white rounded shadow-lg dark:bg-dark-card grid gird-cols-1">
              <div className="flex flex-col overflow-hidden bg-white rounded-2xl shadow-md dark:bg-gray-900 dark:text-gray-300">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
                  <h4 className="text-lg font-semibold dark:text-white">
                    Case Resolution Metrics
                  </h4>
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                  {[
                    {
                      label: "Average Resolution Time",
                      value: "45 days",
                      change: "-8 days",
                      trend: "positive",
                    },
                    {
                      label: "Conviction Rate",
                      value: "78%",
                      change: "+3.2%",
                      trend: "positive",
                    },
                    {
                      label: "Evidence Acceptance Rate",
                      value: "94%",
                      change: "+1.5%",
                      trend: "positive",
                    },
                  ].map((metric, idx) => (
                    <div
                      key={idx}
                      className="text-center p-4 border border-slate-200 rounded-lg"
                    >
                      <p className="text-sm text-slate-600 mb-2">
                        {metric.label}
                      </p>
                      <p className="text-3xl font-bold text-slate-900 mb-1">
                        {metric.value}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          metric.trend === "positive"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {metric.change}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Geographic Case Distribution
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { region: "North Region", cases: 42 },
                  { region: "South Region", cases: 38 },
                  { region: "East Region", cases: 35 },
                  { region: "West Region", cases: 32 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 rounded-lg text-center"
                  >
                    <p className="text-sm text-slate-600 mb-1">{item.region}</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {item.cases}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">active cases</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Available Reports
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: "Monthly Case Summary Report",
                    date: "Oct 2025",
                    size: "3.2 MB",
                    status: "Ready",
                    type: "Case Management",
                  },
                  {
                    name: "Evidence Chain of Custody Report",
                    date: "Oct 15, 2025",
                    size: "2.8 MB",
                    status: "Ready",
                    type: "Evidence",
                  },
                  {
                    name: "Quarterly Performance Analytics",
                    date: "Q3 2025",
                    size: "4.1 MB",
                    status: "Ready",
                    type: "Performance",
                  },
                  {
                    name: "Investigation Timeline Report",
                    date: "Sep 2025",
                    size: "1.9 MB",
                    status: "Ready",
                    type: "Operational",
                  },
                  {
                    name: "Compliance & Audit Report",
                    date: "Sep 2025",
                    size: "2.4 MB",
                    status: "Ready",
                    type: "Compliance",
                  },
                  {
                    name: "Resource Allocation Report",
                    date: "Aug 2025",
                    size: "1.6 MB",
                    status: "Ready",
                    type: "Resource Management",
                  },
                ].map((report, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-sm font-medium text-slate-900">
                          {report.name}
                        </p>
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                          {report.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {report.date} • {report.size}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {report.status}
                      </span>
                      <button className="px-4 py-2 bg text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
