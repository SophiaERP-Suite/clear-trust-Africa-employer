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
      <div className="flex flex-wrap justify-between gap-4">
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
                  Dashboard <ChevronRightIcon size={14} /> Report & Analytics{" "}
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

      <main className="max-w-7xl mx-auto py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200 mb-8 w-fit">
          {["overview", "analytics", "reports"].map((tab) => (
            <a
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[rgb(112_22_208/0.9)] text-white"
                  : "text-slate-600 hover:text-white hover:bg-black cursor-pointer"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </a>
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
              <div className="lg:col-span-2 bg-white rounded-md p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Case Activity Trend
                  </h2>
                  <div className="flex gap-2">
                    {/* <button className="px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                      Week
                    </button>
                    <button className="px-3 py-1 text-xs font-medium bg-slate-900 text-white rounded-md">
                      Month
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                      Year
                    </button> */}
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center gap-2">
                  <div className="">
                    <div
                      id="dashboard-line-chart"
                      className="dashboard-line-chart flex"
                      style={{ minHeight: "355px" }}
                    >
                      <div
                        id="apexchartsvduzsye6"
                        className="apexcharts-canvas apexchartsvduzsye6 apexcharts-theme-light "
                        style={{ minWidth: "100%", height: "100%" }}
                      >
                        <svg
                          id="SvgjsSvg1193"
                          width="662"
                          height="340"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          className="apexcharts-svg apexcharts-zoomable hovering-zoom"
                          transform="translate(0, 0)"
                          style={{ background: "transparent" }}
                        >
                          <g
                            id="SvgjsG1195"
                            className="apexcharts-inner apexcharts-graphical"
                            transform="translate(45.359375, 30)"
                          >
                            <defs id="SvgjsDefs1194">
                              <clipPath id="gridRectMaskvduzsye6">
                                <rect
                                  id="SvgjsRect1201"
                                  width="601.8017578125"
                                  height="288"
                                  x="-3.5"
                                  y="-1.5"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fff"
                                ></rect>
                              </clipPath>
                              <clipPath id="forecastMaskvduzsye6">
                                <rect
                                  id="SvgjsRect1224"
                                  width="594.8017578125"
                                  height="285"
                                  x="371.7510986328125"
                                  y="0"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fefefe"
                                ></rect>
                                <rect
                                  id="SvgjsRect1248"
                                  width="594.8017578125"
                                  height="285"
                                  x="371.7510986328125"
                                  y="0"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fefefe"
                                ></rect>
                                <rect
                                  id="SvgjsRect1272"
                                  width="594.8017578125"
                                  height="285"
                                  x="371.7510986328125"
                                  y="0"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fefefe"
                                ></rect>
                              </clipPath>
                              <clipPath id="nonForecastMaskvduzsye6">
                                <rect
                                  id="SvgjsRect1225"
                                  width="371.7510986328125"
                                  height="285"
                                  x="0"
                                  y="0"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fefefe"
                                ></rect>
                                <rect
                                  id="SvgjsRect1249"
                                  width="371.7510986328125"
                                  height="285"
                                  x="0"
                                  y="0"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fefefe"
                                ></rect>
                                <rect
                                  id="SvgjsRect1273"
                                  width="371.7510986328125"
                                  height="285"
                                  x="0"
                                  y="0"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fefefe"
                                ></rect>
                              </clipPath>
                              <clipPath id="gridRectMarkerMaskvduzsye6">
                                <rect
                                  id="SvgjsRect1202"
                                  width="650.8017578125"
                                  height="341"
                                  x="-28"
                                  y="-28"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fff"
                                ></rect>
                              </clipPath>
                            </defs>
                            <line
                              id="SvgjsLine1200"
                              x1="296.90087890625"
                              y1="0"
                              x2="296.90087890625"
                              y2="285"
                              stroke="#b6b6b6"
                              stroke-dasharray="3"
                              stroke-linecap="butt"
                              className="apexcharts-xcrosshairs"
                              x="296.90087890625"
                              y="0"
                              width="1"
                              height="285"
                              fill="#b1b9c4"
                              filter="none"
                              fill-opacity="0.9"
                              stroke-width="1"
                            ></line>
                            <g
                              id="SvgjsG1288"
                              className="apexcharts-xaxis"
                              transform="translate(0, 0)"
                            >
                              <g
                                id="SvgjsG1289"
                                className="apexcharts-xaxis-texts-g"
                                transform="translate(0, -4)"
                              >
                                <text
                                  id="SvgjsText1291"
                                  font-family="Helvetica, Arial, sans-serif"
                                  x="0"
                                  y="314"
                                  text-anchor="middle"
                                  dominant-baseline="auto"
                                  font-size="12px"
                                  font-weight="400"
                                  fill="#373d3f"
                                  className="apexcharts-text apexcharts-xaxis-label "
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <tspan id="SvgjsTspan1292">Jan</tspan>
                                  <title>Jan</title>
                                </text>
                                <text
                                  id="SvgjsText1294"
                                  font-family="Helvetica, Arial, sans-serif"
                                  x="74.3502197265625"
                                  y="314"
                                  text-anchor="middle"
                                  dominant-baseline="auto"
                                  font-size="12px"
                                  font-weight="400"
                                  fill="#373d3f"
                                  className="apexcharts-text apexcharts-xaxis-label "
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <tspan id="SvgjsTspan1295">Feb</tspan>
                                  <title>Feb</title>
                                </text>
                                <text
                                  id="SvgjsText1297"
                                  font-family="Helvetica, Arial, sans-serif"
                                  x="148.700439453125"
                                  y="314"
                                  text-anchor="middle"
                                  dominant-baseline="auto"
                                  font-size="12px"
                                  font-weight="400"
                                  fill="#373d3f"
                                  className="apexcharts-text apexcharts-xaxis-label "
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <tspan id="SvgjsTspan1298">Mar</tspan>
                                  <title>Mar</title>
                                </text>
                                <text
                                  id="SvgjsText1300"
                                  font-family="Helvetica, Arial, sans-serif"
                                  x="223.0506591796875"
                                  y="314"
                                  text-anchor="middle"
                                  dominant-baseline="auto"
                                  font-size="12px"
                                  font-weight="400"
                                  fill="#373d3f"
                                  className="apexcharts-text apexcharts-xaxis-label "
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <tspan id="SvgjsTspan1301">Apr</tspan>
                                  <title>Apr</title>
                                </text>
                                <text
                                  id="SvgjsText1303"
                                  font-family="Helvetica, Arial, sans-serif"
                                  x="297.40087890625"
                                  y="314"
                                  text-anchor="middle"
                                  dominant-baseline="auto"
                                  font-size="12px"
                                  font-weight="400"
                                  fill="#373d3f"
                                  className="apexcharts-text apexcharts-xaxis-label "
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <tspan id="SvgjsTspan1304">May</tspan>
                                  <title>May</title>
                                </text>
                                <text
                                  id="SvgjsText1306"
                                  font-family="Helvetica, Arial, sans-serif"
                                  x="371.7510986328125"
                                  y="314"
                                  text-anchor="middle"
                                  dominant-baseline="auto"
                                  font-size="12px"
                                  font-weight="400"
                                  fill="#373d3f"
                                  className="apexcharts-text apexcharts-xaxis-label "
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <tspan id="SvgjsTspan1307">Jun</tspan>
                                  <title>Jun</title>
                                </text>
                                <text
                                  id="SvgjsText1309"
                                  font-family="Helvetica, Arial, sans-serif"
                                  x="446.101318359375"
                                  y="314"
                                  text-anchor="middle"
                                  dominant-baseline="auto"
                                  font-size="12px"
                                  font-weight="400"
                                  fill="#373d3f"
                                  className="apexcharts-text apexcharts-xaxis-label "
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <tspan id="SvgjsTspan1310">Jul</tspan>
                                  <title>Jul</title>
                                </text>
                                <text
                                  id="SvgjsText1312"
                                  font-family="Helvetica, Arial, sans-serif"
                                  x="520.4515380859375"
                                  y="314"
                                  text-anchor="middle"
                                  dominant-baseline="auto"
                                  font-size="12px"
                                  font-weight="400"
                                  fill="#373d3f"
                                  className="apexcharts-text apexcharts-xaxis-label "
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <tspan id="SvgjsTspan1313">Aug</tspan>
                                  <title>Aug</title>
                                </text>
                                <text
                                  id="SvgjsText1315"
                                  font-family="Helvetica, Arial, sans-serif"
                                  x="594.8017578125"
                                  y="314"
                                  text-anchor="middle"
                                  dominant-baseline="auto"
                                  font-size="12px"
                                  font-weight="400"
                                  fill="#373d3f"
                                  className="apexcharts-text apexcharts-xaxis-label "
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <tspan id="SvgjsTspan1316">Sep</tspan>
                                  <title>Sep</title>
                                </text>
                              </g>
                            </g>
                            <g id="SvgjsG1276" className="apexcharts-grid">
                              <g
                                id="SvgjsG1277"
                                className="apexcharts-gridlines-horizontal"
                              >
                                <line
                                  id="SvgjsLine1281"
                                  x1="0"
                                  y1="57"
                                  x2="594.8017578125"
                                  y2="57"
                                  stroke="#adb5bd"
                                  stroke-dasharray="7"
                                  stroke-linecap="butt"
                                  className="apexcharts-gridline"
                                ></line>
                                <line
                                  id="SvgjsLine1282"
                                  x1="0"
                                  y1="114"
                                  x2="594.8017578125"
                                  y2="114"
                                  stroke="#adb5bd"
                                  stroke-dasharray="7"
                                  stroke-linecap="butt"
                                  className="apexcharts-gridline"
                                ></line>
                                <line
                                  id="SvgjsLine1283"
                                  x1="0"
                                  y1="171"
                                  x2="594.8017578125"
                                  y2="171"
                                  stroke="#adb5bd"
                                  stroke-dasharray="7"
                                  stroke-linecap="butt"
                                  className="apexcharts-gridline"
                                ></line>
                                <line
                                  id="SvgjsLine1284"
                                  x1="0"
                                  y1="228"
                                  x2="594.8017578125"
                                  y2="228"
                                  stroke="#adb5bd"
                                  stroke-dasharray="7"
                                  stroke-linecap="butt"
                                  className="apexcharts-gridline"
                                ></line>
                              </g>
                              <g
                                id="SvgjsG1278"
                                className="apexcharts-gridlines-vertical"
                              ></g>
                              <line
                                id="SvgjsLine1287"
                                x1="0"
                                y1="285"
                                x2="594.8017578125"
                                y2="285"
                                stroke="transparent"
                                stroke-dasharray="0"
                                stroke-linecap="butt"
                              ></line>
                              <line
                                id="SvgjsLine1286"
                                x1="0"
                                y1="1"
                                x2="0"
                                y2="285"
                                stroke="transparent"
                                stroke-dasharray="0"
                                stroke-linecap="butt"
                              ></line>
                            </g>
                            <g
                              id="SvgjsG1203"
                              className="apexcharts-line-series apexcharts-plot-series"
                            >
                              <g id="SvgjsG1228" className="apexcharts-series">
                                <path
                                  id="SvgjsPath1250"
                                  d="M 0 247 L 74.3502197265625 167.2 L 148.700439453125 152 L 223.0506591796875 117.79999999999998 L 297.40087890625 157.7 L 371.7510986328125 228 L 446.101318359375 95 L 520.4515380859375 188.1 L 594.8017578125 98.79999999999998"
                                  fill="none"
                                  fill-opacity="1"
                                  stroke="#1aa053"
                                  stroke-opacity="1"
                                  stroke-linecap="butt"
                                  stroke-width="3"
                                  stroke-dasharray="0"
                                  className="apexcharts-line"
                                  clip-path="url(#nonForecastMaskvduzsye6)"
                                  path="M 0 247 L 74.3502197265625 167.2 L 148.700439453125 152 L 223.0506591796875 117.79999999999998 L 297.40087890625 157.7 L 371.7510986328125 228 L 446.101318359375 95 L 520.4515380859375 188.1 L 594.8017578125 98.79999999999998"
                                  fill-rule="evenodd"
                                ></path>
                                <path
                                  id="SvgjsPath1251"
                                  d="M 0 247 L 74.3502197265625 167.2 L 148.700439453125 152 L 223.0506591796875 117.79999999999998 L 297.40087890625 157.7 L 371.7510986328125 228 L 446.101318359375 95 L 520.4515380859375 188.1 L 594.8017578125 98.79999999999998"
                                  fill="none"
                                  fill-opacity="1"
                                  stroke="#1aa053"
                                  stroke-opacity="1"
                                  stroke-linecap="butt"
                                  stroke-width="3"
                                  stroke-dasharray="4"
                                  className="apexcharts-line"
                                  clip-path="url(#forecastMaskvduzsye6)"
                                  path="M 0 247 L 74.3502197265625 167.2 L 148.700439453125 152 L 223.0506591796875 117.79999999999998 L 297.40087890625 157.7 L 371.7510986328125 228 L 446.101318359375 95 L 520.4515380859375 188.1 L 594.8017578125 98.79999999999998"
                                ></path>
                                <g
                                  id="SvgjsG1229"
                                  className="apexcharts-series-markers-wrap"
                                >
                                  <g
                                    id="SvgjsG1231"
                                    className="apexcharts-series-markers"
                                    clip-path="url(#gridRectMarkerMaskvduzsye6)"
                                  >
                                    <circle
                                      id="SvgjsCircle1232"
                                      r="6"
                                      cx="0"
                                      cy="247"
                                      className="apexcharts-marker no-pointer-events wfw4lm5kyh"
                                      stroke="#1aa053"
                                      fill="#ffffff"
                                      fill-opacity="1"
                                      stroke-width="2"
                                      stroke-opacity="0.9"
                                      default-marker-size="6"
                                    ></circle>
                                    <circle
                                      id="SvgjsCircle1233"
                                      r="6"
                                      cx="74.3502197265625"
                                      cy="167.2"
                                      className="apexcharts-marker no-pointer-events wb6civsdf"
                                      stroke="#1aa053"
                                      fill="#ffffff"
                                      fill-opacity="1"
                                      stroke-width="2"
                                      stroke-opacity="0.9"
                                      default-marker-size="6"
                                    ></circle>
                                  </g>
                                  <g
                                    id="SvgjsG1234"
                                    className="apexcharts-series-markers"
                                    clip-path="url(#gridRectMarkerMaskvduzsye6)"
                                  >
                                    <circle
                                      id="SvgjsCircle1235"
                                      r="6"
                                      cx="148.700439453125"
                                      cy="152"
                                      className="apexcharts-marker no-pointer-events wmio0wfoy"
                                      stroke="#1aa053"
                                      fill="#ffffff"
                                      fill-opacity="1"
                                      stroke-width="2"
                                      stroke-opacity="0.9"
                                      default-marker-size="6"
                                    ></circle>
                                  </g>
                                  <g
                                    id="SvgjsG1236"
                                    className="apexcharts-series-markers"
                                    clip-path="url(#gridRectMarkerMaskvduzsye6)"
                                  >
                                    <circle
                                      id="SvgjsCircle1237"
                                      r="6"
                                      cx="223.0506591796875"
                                      cy="117.79999999999998"
                                      className="apexcharts-marker no-pointer-events w01d9bm69"
                                      stroke="#1aa053"
                                      fill="#ffffff"
                                      fill-opacity="1"
                                      stroke-width="2"
                                      stroke-opacity="0.9"
                                      default-marker-size="6"
                                    ></circle>
                                  </g>
                                  <g
                                    id="SvgjsG1238"
                                    className="apexcharts-series-markers"
                                    clip-path="url(#gridRectMarkerMaskvduzsye6)"
                                  >
                                    <circle
                                      id="SvgjsCircle1239"
                                      r="6"
                                      cx="297.40087890625"
                                      cy="157.7"
                                      className="apexcharts-marker no-pointer-events wm1ruwi72k"
                                      stroke="#1aa053"
                                      fill="#ffffff"
                                      fill-opacity="1"
                                      stroke-width="2"
                                      stroke-opacity="0.9"
                                      default-marker-size="6"
                                    ></circle>
                                  </g>
                                  <g
                                    id="SvgjsG1240"
                                    className="apexcharts-series-markers"
                                    clip-path="url(#gridRectMarkerMaskvduzsye6)"
                                  >
                                    <circle
                                      id="SvgjsCircle1241"
                                      r="6"
                                      cx="371.7510986328125"
                                      cy="228"
                                      className="apexcharts-marker no-pointer-events waa0nnw6j"
                                      stroke="#1aa053"
                                      fill="#ffffff"
                                      fill-opacity="1"
                                      stroke-width="2"
                                      stroke-opacity="0.9"
                                      default-marker-size="6"
                                    ></circle>
                                  </g>
                                  <g
                                    id="SvgjsG1242"
                                    className="apexcharts-series-markers"
                                    clip-path="url(#gridRectMarkerMaskvduzsye6)"
                                  >
                                    <circle
                                      id="SvgjsCircle1243"
                                      r="6"
                                      cx="446.101318359375"
                                      cy="95"
                                      className="apexcharts-marker no-pointer-events wouycpt1ch"
                                      stroke="#1aa053"
                                      fill="#ffffff"
                                      fill-opacity="1"
                                      stroke-width="2"
                                      stroke-opacity="0.9"
                                      default-marker-size="6"
                                    ></circle>
                                  </g>
                                  <g
                                    id="SvgjsG1244"
                                    className="apexcharts-series-markers"
                                    clip-path="url(#gridRectMarkerMaskvduzsye6)"
                                  >
                                    <circle
                                      id="SvgjsCircle1245"
                                      r="6"
                                      cx="520.4515380859375"
                                      cy="188.1"
                                      className="apexcharts-marker no-pointer-events wjiof0rev"
                                      stroke="#1aa053"
                                      fill="#ffffff"
                                      fill-opacity="1"
                                      stroke-width="2"
                                      stroke-opacity="0.9"
                                      default-marker-size="6"
                                    ></circle>
                                  </g>
                                  <g
                                    id="SvgjsG1246"
                                    className="apexcharts-series-markers"
                                    clip-path="url(#gridRectMarkerMaskvduzsye6)"
                                  >
                                    <circle
                                      id="SvgjsCircle1247"
                                      r="6"
                                      cx="594.8017578125"
                                      cy="98.79999999999998"
                                      className="apexcharts-marker no-pointer-events wbxwnv851j"
                                      stroke="#1aa053"
                                      fill="#ffffff"
                                      fill-opacity="1"
                                      stroke-width="2"
                                      stroke-opacity="0.9"
                                      default-marker-size="6"
                                    ></circle>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
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
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-md p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-white mb-4">
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
            <div className="bg-white rounded-md p-6 border border-slate-200">
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
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
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
