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
import {
  AlertTriangle,
  Banknote,
  Clipboard,
  Eye,
  FilePlus,
  Folder,
  ListChecks,
  LockKeyhole,
  Pen,
  Send,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../utils/useAuth";
import type { PaymentDto } from "./payment/Payment";
import {
  fetchDbsChecks,
  GetDbsChecksByOrganisationIdAndStatus,
  GetEmployeesWithoutDbs,
} from "../../utils/Requests/DbsRequests.js";
import type { IncidentReport } from "./incident/IncidentReportDetails.js";
import {
  fetchIncidentReports,
  fetchIncidentReportsDashboard,
} from "../../utils/Requests/IncidentRequests.js";
import type { EmployerOrgDto } from "./employer/EmployerProfile.js";
import { fetchOrganisationData } from "../../utils/Requests/OrganisationProfile.js";
import { NavLink, useNavigate } from "react-router-dom";
import Hashids from "hashids";
import hashids from "../../utils/hashids.js";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Line,
} from "recharts";
import type { DbsChecks, EmployeesData } from "../../types/dashboard.js";


function EmployerDashboard() {
  const [payment, setPayment] = useState<PaymentDto[]>([]);
  const [dbsChecks1, setDbsChecks1] = useState<DbsChecks[]>([]);
  const dbsLimit = 5;

  const hashIds = new Hashids("ClearTrustAfricaEncode", 10);
  const [employees, setEmployees] = useState<EmployeesData[]>([]);
  const [chartData, setChartData] = useState<EmployeesData[]>([]);
  const [employer, setEmployer] = useState<EmployerOrgDto | null>(null);

  const [totalEmployeeWithoutCTCcheck, setTotalEmployeeWithoutCTCcheck] =
    useState(0);
  const [totalCompletedCTCcheck, setTotalCompletedCTCcheck] = useState(0);
  const [incidentReport, setIncidentReport] = useState<IncidentReport[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [currency, setCurrency] = useState<string>("NGN");

  const navigate = useNavigate();
  const { user } = useAuth();
  const organisationId: number | null = user?.organisationId ?? null;
  const organisationType = user?.organisationType;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fetchData = async () => {
    if (!organisationId) return;

    // setLoading(true);
    // setError(null);

    try {
      const response = await fetchIncidentReports(organisationId, 1, 5);

      if (!response) {
        setIncidentReport([]);
        setTotalCount(0);
        return;
      }

      let data: IncidentReport[] = [];
      let total = 0;

      if (response && "data" in response) {
        data = (response.data as IncidentReport[]).slice(0, 5);
        total = response.totalCount || 0;
      } else if (Array.isArray(response)) {
        data = response.slice(0, 5);
        total = response.length;
      } else {
        data = [];
        total = 0;
      }

      setIncidentReport(data);
      setTotalCount(total);
    } catch (err) {
      console.error("Failed to fetch incident reports:", err);
      // setError("Could not fetch incident reports");
      setIncidentReport([]);
      setTotalCount(0);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [organisationId]);

  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    try {
      // setLoading(true);
      const response = await fetchOrganisationData(Number(organisationId));

      if (response?.data) {
        if (Array.isArray(response.data)) {
          setEmployer(response.data[0] || null);
        } else {
          setEmployer(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching employer data:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymemts(Number(organisationId));
  }, [organisationId]);

  useEffect(() => {
    FetchChartData();
    getCompletedDbsChecks();
    FetchEmployeesWithoutDbs();
  }, []);

  const FetchChartData = async () => {
    try {
      // setLoading(true);
      const chartData = await fetchIncidentReportsDashboard(
        Number(organisationId),
      );

      if (!chartData) {
        setChartData([]);
        return;
      }

      const formatted = chartData.monthlyIncidents.map((m: any) => ({
        month: `${monthNames[m.month - 1]} ${m.year}`,
        total: m.total,
      }));

      setChartData(formatted);
    } catch (err: any) {
      console.log(err);
    } finally {
      // setLoading(false);
    }
  };

  const FetchEmployeesWithoutDbs = async () => {
    try {
      // setLoading(true);
      const pendingEmployees = await GetEmployeesWithoutDbs(
        Number(organisationId),
      );

      console.log("pending employees", pendingEmployees);

      if (!pendingEmployees) {
        setEmployees([]);
        return;
      }

      const topFive = pendingEmployees.data.employees?.slice(0, 5) || [];

      setTotalEmployeeWithoutCTCcheck(pendingEmployees.data.employees.length);
      setEmployees(topFive);
    } catch (err: any) {
      console.log(err);
    } finally {
      // setLoading(false);
    }
  };

  const completedStatusId = 1;

  const getCompletedDbsChecks = async () => {
    try {
      const completedDbs = await GetDbsChecksByOrganisationIdAndStatus(
        Number(organisationId),
        Number(completedStatusId),
      );

      if (!completedDbs) {
      }
      setTotalCompletedCTCcheck(completedDbs.data.checks.length);
    } catch (err: any) {
      console.log(err);
    }
  };

  const fetchPaymemts = async (organisationId: number) => {
    // setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `http://localhost:5181/api/payments/organization/${organisationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch incident: ${errorText}`);
      }

      const paymentData = await response.json();
      console.log("paymenttt", paymentData)

      const topFive = paymentData.data.payments?.slice(0, 5) || [];
      setPayment(topFive);
      setTotalAmount(paymentData.data.infoCard.totalAmount);
      setCurrency(paymentData.data.infoCard.currency);

      setPayment(topFive);
    } catch (error) {
      console.error("Error fetching incident data:", error);
      // alert("Failed to load incident data. Please try again.");
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDbsChecks({
      pageNumber: 1,
      limit: dbsLimit,
      OrganisationId: organisationId,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setDbsChecks1(data.data.checks);
          });
        } else {
          res.text().then((data) => {
            console.log(JSON.parse(data));
          });
        }
      })
      .catch((err) => console.log(err));
  }, [dbsLimit, organisationId]);

  const ongoingCount = useMemo(() => {
    return dbsChecks1.filter((ct) => ct.status === 2).length;
  }, [dbsChecks1]);

  const ongoingCTChecks = useMemo(() => {
    return dbsChecks1.filter((ct) => ct.status === 2).slice(0, 5);
  }, [dbsChecks1]);

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      <div className="flex flex-wrap justify-between mb-6 gap-4">
        <div className="">
          <h3 className="mb-0 dark:text-white">Quick Insights</h3>
          <p className="text-secondary-600 dark:text-white">Dashboard</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* <div className="inline-block">
            <div className="w-full">
              <input
                type="text"
                className="range_flatpicker form-control flatpickr-input"
                placeholder="01 Jan 2025 to 27 Oct 2025"
              />
            </div>
          </div>
          <button className="btn btn-primary">Analytics</button> */}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
          {/* Active Cases */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <Folder size={36} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-green-50">Ongoing CT Checks</p>
              <h2 className="text-3xl font-bold text-white">{ongoingCount}</h2>
            </div>
          </div>

          {/* Pending CTA Checks */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <Clipboard size={36} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-orange-50">Pending CT Checks</p>
              <h2 className="text-3xl font-bold text-white">
                {totalEmployeeWithoutCTCcheck}
              </h2>
              <p className="text-sm text-orange-50">Pending CTA Checks</p>
              <h2 className="text-3xl font-bold text-white">3</h2>
            </div>
          </div>

          {/* Open Incidents */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <AlertTriangle size={36} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-50">Open Incidents</p>
              <h2 className="text-3xl font-bold text-white">1</h2>
            </div>
          </div>

          {/* Total Employees */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <ListChecks size={36} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-indigo-50">Completed Checks</p>
              <h2 className="text-3xl font-bold text-white">
                {(totalCompletedCTCcheck && totalCompletedCTCcheck) || 0}
              </h2>
            </div>
          </div>

          {/* Open Incidents */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <AlertTriangle size={36} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-50">
                Incident & Offence Reports
              </p>
              <h2 className="text-3xl font-bold text-white">{totalCount}</h2>
            </div>
          </div>

          {/* Total Employees */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <Users size={36} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-indigo-50">Total 
                {" "}{organisationType === "Agent" ? "Candidates" : " Employee"} </p>
              <h2 className="text-3xl font-bold text-white">
                {(employer && employer.usersCount) || 0}
              </h2>
            </div>
          </div>
          {/* Total Employees */}
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-600 to-blue-600 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm">
              <Banknote size={36} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-indigo-50">Total Amount Spent</p>
              <h2 className="text-3xl font-bold text-white">
                {currency}{totalAmount?.toFixed(2) || 0.0}
              </h2>
            </div>
          </div>
        </div>
        <div className="grid gird-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="relative flex flex-col mb-8 bg-white rounded-lg shadow-lg dark:bg-dark-card grid gird-cols-1 lg:col-span-2">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
              <div className="relative flex flex-wrap justify-between p-5 rounded-lg">
                <h4 className="text-lg font-semibold dark:text-white">
                  CT Checks
                </h4>
                <div className="flex">
                  <div className="mx-3 mr-0 dark:text-white"></div>
                </div>
              </div>
              <hr className="m-0" />

              <div className="">
                <div
                  id="dashboard-line-chart"
                  className="dashboard-line-chart flex px-5 py-2"
                  // style={{ minHeight: "355px" }}
                >
                  {/* =========================== for the graph ======================= */}
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line dataKey="total" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div
                    id="apexchartsvduzsye6"
                    className="apexcharts-canvas apexchartsvduzsye6 apexcharts-theme-light pb-8 pl-8"
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
                          {/* <g id="SvgjsG1204" className="apexcharts-series">
                            <path
                              id="SvgjsPath1226"
                              d="M 0 266 L 74.3502197265625 207.1 L 148.700439453125 218.5 L 223.0506591796875 188.1 L 297.40087890625 191.89999999999998 L 371.7510986328125 148.2 L 446.101318359375 210.89999999999998 L 520.4515380859375 245.1 L 594.8017578125 3.8000000000000114"
                              fill="none"
                              fill-opacity="1"
                              stroke="rgba(112,22,208,0.85)"
                              stroke-opacity="1"
                              stroke-linecap="butt"
                              stroke-width="3"
                              stroke-dasharray="0"
                              className="apexcharts-line"
                              clip-path="url(#nonForecastMaskvduzsye6)"
                              path="M 0 266 L 74.3502197265625 207.1 L 148.700439453125 218.5 L 223.0506591796875 188.1 L 297.40087890625 191.89999999999998 L 371.7510986328125 148.2 L 446.101318359375 210.89999999999998 L 520.4515380859375 245.1 L 594.8017578125 3.8000000000000114"
                              fill-rule="evenodd"
                            ></path>
                            <path
                              id="SvgjsPath1227"
                              d="M 0 266 L 74.3502197265625 207.1 L 148.700439453125 218.5 L 223.0506591796875 188.1 L 297.40087890625 191.89999999999998 L 371.7510986328125 148.2 L 446.101318359375 210.89999999999998 L 520.4515380859375 245.1 L 594.8017578125 3.8000000000000114"
                              fill="none"
                              fill-opacity="1"
                              stroke="rgba(112,22,208,0.85)"
                              stroke-opacity="1"
                              stroke-linecap="butt"
                              stroke-width="3"
                              stroke-dasharray="4"
                              className="apexcharts-line"
                              clip-path="url(#forecastMaskvduzsye6)"
                              path="M 0 266 L 74.3502197265625 207.1 L 148.700439453125 218.5 L 223.0506591796875 188.1 L 297.40087890625 191.89999999999998 L 371.7510986328125 148.2 L 446.101318359375 210.89999999999998 L 520.4515380859375 245.1 L 594.8017578125 3.8000000000000114"
                            ></path>
                            <g
                              id="SvgjsG1205"
                              className="apexcharts-series-markers-wrap"
                            >
                              <g
                                id="SvgjsG1207"
                                className="apexcharts-series-markers"
                                clip-path="url(#gridRectMarkerMaskvduzsye6)"
                              >
                                <circle
                                  id="SvgjsCircle1208"
                                  r="6"
                                  cx="0"
                                  cy="266"
                                  className="apexcharts-marker no-pointer-events weg26hpbd"
                                  stroke="#7016d0"
                                  fill="#ffffff"
                                  fill-opacity="1"
                                  stroke-width="2"
                                  stroke-opacity="0.9"
                                  default-marker-size="6"
                                ></circle>
                                <circle
                                  id="SvgjsCircle1209"
                                  r="6"
                                  cx="74.3502197265625"
                                  cy="207.1"
                                  className="apexcharts-marker no-pointer-events wmnqc0yma"
                                  stroke="#7016d0"
                                  fill="#ffffff"
                                  fill-opacity="1"
                                  stroke-width="2"
                                  stroke-opacity="0.9"
                                  default-marker-size="6"
                                ></circle>
                              </g>
                              <g
                                id="SvgjsG1210"
                                className="apexcharts-series-markers"
                                clip-path="url(#gridRectMarkerMaskvduzsye6)"
                              >
                                <circle
                                  id="SvgjsCircle1211"
                                  r="6"
                                  cx="148.700439453125"
                                  cy="218.5"
                                  className="apexcharts-marker no-pointer-events w9mplat8i"
                                  stroke="#7016d0"
                                  fill="#ffffff"
                                  fill-opacity="1"
                                  stroke-width="2"
                                  stroke-opacity="0.9"
                                  default-marker-size="6"
                                ></circle>
                              </g>
                              <g
                                id="SvgjsG1212"
                                className="apexcharts-series-markers"
                                clip-path="url(#gridRectMarkerMaskvduzsye6)"
                              >
                                <circle
                                  id="SvgjsCircle1213"
                                  r="6"
                                  cx="223.0506591796875"
                                  cy="188.1"
                                  className="apexcharts-marker no-pointer-events wy7dm8gl5"
                                  stroke="#7016d0"
                                  fill="#ffffff"
                                  fill-opacity="1"
                                  stroke-width="2"
                                  stroke-opacity="0.9"
                                  default-marker-size="6"
                                ></circle>
                              </g>
                              <g
                                id="SvgjsG1214"
                                className="apexcharts-series-markers"
                                clip-path="url(#gridRectMarkerMaskvduzsye6)"
                              >
                                <circle
                                  id="SvgjsCircle1215"
                                  r="6"
                                  cx="297.40087890625"
                                  cy="191.89999999999998"
                                  className="apexcharts-marker no-pointer-events wvxkceqrk"
                                  stroke="#7016d0"
                                  fill="#ffffff"
                                  fill-opacity="1"
                                  stroke-width="2"
                                  stroke-opacity="0.9"
                                  default-marker-size="6"
                                ></circle>
                              </g>
                              <g
                                id="SvgjsG1216"
                                className="apexcharts-series-markers"
                                clip-path="url(#gridRectMarkerMaskvduzsye6)"
                              >
                                <circle
                                  id="SvgjsCircle1217"
                                  r="6"
                                  cx="371.7510986328125"
                                  cy="148.2"
                                  className="apexcharts-marker no-pointer-events w3byltvmxf"
                                  stroke="#7016d0"
                                  fill="#ffffff"
                                  fill-opacity="1"
                                  stroke-width="2"
                                  stroke-opacity="0.9"
                                  default-marker-size="6"
                                ></circle>
                              </g>
                              <g
                                id="SvgjsG1218"
                                className="apexcharts-series-markers"
                                clip-path="url(#gridRectMarkerMaskvduzsye6)"
                              >
                                <circle
                                  id="SvgjsCircle1219"
                                  r="6"
                                  cx="446.101318359375"
                                  cy="210.89999999999998"
                                  className="apexcharts-marker no-pointer-events wdsfym75g"
                                  stroke="#7016d0"
                                  fill="#ffffff"
                                  fill-opacity="1"
                                  stroke-width="2"
                                  stroke-opacity="0.9"
                                  default-marker-size="6"
                                ></circle>
                              </g>
                              <g
                                id="SvgjsG1220"
                                className="apexcharts-series-markers"
                                clip-path="url(#gridRectMarkerMaskvduzsye6)"
                              >
                                <circle
                                  id="SvgjsCircle1221"
                                  r="6"
                                  cx="520.4515380859375"
                                  cy="245.1"
                                  className="apexcharts-marker no-pointer-events wjscyc44w"
                                  stroke="#7016d0"
                                  fill="#ffffff"
                                  fill-opacity="1"
                                  stroke-width="2"
                                  stroke-opacity="0.9"
                                  default-marker-size="6"
                                ></circle>
                              </g>
                              <g
                                id="SvgjsG1222"
                                className="apexcharts-series-markers"
                                clip-path="url(#gridRectMarkerMaskvduzsye6)"
                              >
                                <circle
                                  id="SvgjsCircle1223"
                                  r="6"
                                  cx="594.8017578125"
                                  cy="3.8000000000000114"
                                  className="apexcharts-marker no-pointer-events wynhp3nov"
                                  stroke="#7016d0"
                                  fill="#ffffff"
                                  fill-opacity="1"
                                  stroke-width="2"
                                  stroke-opacity="0.9"
                                  default-marker-size="6"
                                ></circle>
                              </g>
                            </g>
                          </g> */}
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
          <div className="relative flex flex-col max-h-[420px] mb-8 lg:mb-0 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
            {/* <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
              <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                <h4 className="text-lg font-semibold dark:text-white">
                  Pending CTA Checks
                </h4>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary-500/10 p-2 rounded text-primary-500">
                    <img
                      className="w-10 h-10 p-0 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                      src={femi}
                      alt="profile"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="mb-0 dark:text-white">Femi, Adebayo</h6>
                      <p className="leading-tight font-medium text-secondary-600">
                        Pending
                      </p>
                    </div>
                    <small className="mt-1 text-secondary-600 dark:text-white">
                      Teacher
                    </small>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-info-500/10 p-2 rounded text-info-500">
                    <img
                      className="w-10 h-10 p-0 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                      src={deborah}
                      alt="profile"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="mb-0 dark:text-white">Deborah, Wilkins</h6>
                      <p className="leading-tight font-medium text-secondary-600">
                        Pending
                      </p>
                    </div>
                    <small className="mt-1 text-secondary-600 dark:text-white">
                      Teacher
                    </small>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-success-500/10 p-2 rounded text-success-500">
                    <img
                      className="w-10 h-10 p-0 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                      src={donald}
                      alt="profile"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="mb-0 dark:text-white">Donald, Adolphus</h6>
                      <p className="leading-tight font-medium text-secondary-600">
                        Pending
                      </p>
                    </div>
                    <small className="mt-1 text-secondary-600 dark:text-white">
                      Teacher
                    </small>
                  </div>
                </div>
                <div className="flex items-center gap-4 ">
                  <div className="bg-danger-500/10 p-2 rounded text-danger-500">
                    <img
                      className="w-10 h-10 p-0 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                      src={rashkin}
                      alt="profile"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="mb-0 dark:text-white">Isaiah, Rashkin</h6>
                      <p className="leading-tight font-medium text-secondary-600">
                        Pending
                      </p>
                    </div>
                    <small className="mt-1 text-secondary-600 dark:text-white">
                      Teacher
                    </small>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

     <div className="grid gird-cols-1 lg:grid-cols-3 lg:gap-8">
           {/*   <div className="relative flex flex-col max-h-[420px] mb-8 lg:mb-0 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
              <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                <h4 className="text-lg font-semibold dark:text-white">
                  Active Cases
                </h4>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-primary-500/10 p-2 rounded text-primary-500">
                    <img
                      className="w-10 h-10 p-0 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                      src={femi}
                      alt="profile"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="mb-0 dark:text-white">Femi, Adebayo</h6>
                      <p className="leading-tight font-medium text-secondary-600">
                        Pending
                      </p>
                    </div>
                    <small className="mt-1 text-secondary-600 dark:text-white">
                      Teacher
                    </small>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-info-500/10 p-2 rounded text-info-500">
                    <img
                      className="w-10 h-10 p-0 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                      src={deborah}
                      alt="profile"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="mb-0 dark:text-white">Deborah, Wilkins</h6>
                      <p className="leading-tight font-medium text-secondary-600">
                        Pending
                      </p>
                    </div>
                    <small className="mt-1 text-secondary-600 dark:text-white">
                      Teacher
                    </small>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-success-500/10 p-2 rounded text-success-500">
                    <img
                      className="w-10 h-10 p-0 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                      src={donald}
                      alt="profile"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="mb-0 dark:text-white">Donald, Adolphus</h6>
                      <p className="leading-tight font-medium text-secondary-600">
                        Pending
                      </p>
                    </div>
                    <small className="mt-1 text-secondary-600 dark:text-white">
                      Teacher
                    </small>
                  </div>
                </div>
                <div className="flex items-center gap-4 ">
                  <div className="bg-danger-500/10 p-2 rounded text-danger-500">
                    <img
                      className="w-10 h-10 p-0 mr-3 rtl:mr-0 rtl:ml-3 text-primary-400 bg-primary-500/10 rounded-xl"
                      src={rashkin}
                      alt="profile"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="mb-0 dark:text-white">Isaiah, Rashkin</h6>
                      <p className="leading-tight font-medium text-secondary-600">
                        Pending
                      </p>
                    </div>
                    <small className="mt-1 text-secondary-600 dark:text-white">
                      Teacher
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="relative flex flex-col mb-8 bg-white rounded-lg shadow-lg dark:bg-dark-card grid gird-cols-1 lg:col-span-1">
            <div className="flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-900 dark:text-gray-300">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
                <h4 className="text-lg font-semibold dark:text-white">
                  Quick Actions
                </h4>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Action 2 */}
              <NavLink
                to={`../EmployeeNew`}
                className="flex flex-col items-center justify-center gap-2 bg-gray-100 text-white p-4 rounded-xl shadow hover:shadow-lg hover:scale-[1.03] transition"
              >
                <div className="bg-white/60 p-3 rounded-full text-black">
                  <UserPlus size={22} />
                </div>
                <span className="text-sm text-black font-bold">
                  Add  {" "}{organisationType === "Agent" ? "Candidates" : " Employee"}
                </span>
              </NavLink>
              <NavLink
                to={`../IncidentReportForm`}
                className="flex flex-col items-center justify-center gap-2 bg-gray-100 text-white p-4 rounded-xl shadow hover:shadow-lg hover:scale-[1.03] transition"
              >
                <div className="bg-white/60 p-3 rounded-full text-black">
                  <FilePlus size={22} />
                </div>
                <span className="text-sm text-black font-bold">
                  New Offence Report
                </span>
              </NavLink>
              <NavLink
                to={`../ControlPanel/security`}
                className="flex flex-col items-center justify-center gap-2 bg-gray-100 text-white p-4 rounded-xl shadow hover:shadow-lg hover:scale-[1.03] transition"
              >
                <div className="bg-white/60 p-3 rounded-full text-black">
                  <LockKeyhole size={22} />
                </div>
                <span className="text-sm text-black font-bold">
                  Change Password
                </span>
              </NavLink>
              <NavLink
                to={`../Communication`}
                className="flex flex-col items-center justify-center gap-2 bg-gray-100 text-white p-4 rounded-xl shadow hover:shadow-lg hover:scale-[1.03] transition"
              >
                <div className="bg-white/60 p-3 rounded-full text-black">
                  <Send size={22} />
                </div>
                <span className="text-sm text-black font-bold">
                  Send Message
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="grid gird-cols-1 lg:grid-cols-2 lg:gap-8 mb-8 rounded-lg">
          <div className="relative flex flex-col max-h-[420px] rounded-lg lg:mb-0 bg-white rounded shadow-lg dark:bg-dark-card grid grid-cols-1">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
              <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                <h4 className="text-lg font-semibold dark:text-white">
                  Ongoing CT Checks
                </h4>
              </div>
              <div className="p-5">
                {ongoingCTChecks && ongoingCTChecks.length > 0 ? (
                  ongoingCTChecks.map((ct) => (
                    <NavLink
                      key={ct.dbsApplicationId}
                      to={`/Tracker/${hashIds.encode(String(ct.dbsApplicationId))}`}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50  border-b dark:border-gray-700 rounded-lg transition-colors group"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                          {ct.userFirstName?.charAt(0) || ""}
                          {ct.userLastName?.charAt(0) || ""}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h6 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {ct.userLastName}, {ct.userFirstName}
                            </h6>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <span className="font-medium">{ct.dbsType}</span>
                              <br />
                              <span>
                                Submitted on{" "}
                                {new Date(ct.submittedAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Ongoing
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-3">
                      <svg
                        className="w-12 h-12 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                      No ongoing CT checks available.
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">
                      All CT checks are completed or assigned.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative flex flex-col mb-8 lg:mb-0 bg-white rounded-lg shadow-lg dark:bg-dark-card grid grid-cols-1">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg dark:bg-dark-card dark:text-secondary-600">
              <div className="relative flex flex-wrap justify-between p-5 border-b dark:border-secondary-800">
                <h4 className="text-lg font-semibold dark:text-white">
                  Pending CT Checks
                </h4>
              </div>
              <div className="p-5">
                {employees && employees.length > 0 ? (
                  employees.map((emp) => (
                    <NavLink
                      key={emp.userId}
                      to={`/EmployeeProfile/${hashIds.encode(String(emp.userId))}`}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 border-b rounded-lg transition-colors"
                    >
                      <div className="bg-primary-500/10 p-2 rounded-full">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={
                            emp.profileImage?.trim() ||
                            `https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=0D8ABC&color=fff`
                          }
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=0D8ABC&color=fff`;
                          }}
                          alt={`${emp.firstName} ${emp.lastName}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h6 className="mb-0 font-semibold dark:text-white">
                              {emp.firstName} {emp.lastName}
                            </h6>
                            {/* {emp.position && (
                              <small className="text-secondary-600 dark:text-gray-400">
                                {emp.position}
                              </small>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-3">
                    No pending CT checks available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:gap-8 mb-8 rounded-lg">
          <div className="bg-white rounded-lg">
            <div className="relative flex flex-col lg:mb-0 bg-white rounded-lg dark:bg-dark-card grid grid-cols-2">
              <div className="relative flex flex-wrap justify-between p-5 dark:border-secondary-800">
                <h4 className="text-lg font-semibold dark:text-white">
                  Incident And Offence Reports
                </h4>
              </div>
            </div>
            <hr className="m-0" />
            <div className="flex-auto p-5">
              <div className="border dark:border-secondary-800 rounded overflow-x-auto">
                {" "}
                <table
                  id="basic-table"
                  className="min-w-full overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800"
                >
                  <thead>
                    <tr className="bg-secondary-200 dark:bg-dark-bg">
                      <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                        Incident ID
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                        Recorded By
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                        Incident Date
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                        Date Created
                      </th>
                      <th className="px-6 py-3 text-left rtl:text-right text-black text-md whitespace-nowrap font-semibold dark:text-white">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800 dark:bg-dark-card dark:text-white">
                    {incidentReport.map((ir) => (
                      <tr key={ir.incidentReportId}>
                        {/* Table rows remain the same */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="iq-media-group iq-media-group-1">
                            <h6 className="font-bold dark:text-white">
                              #{ir.incidentReportId}
                            </h6>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {ir.incidentTitle || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {ir.recorderName || "_"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {ir.incidentLocation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center mb-2">
                            <h6 className="font-medium dark:text-white">
                              {ir.incidentDate
                                ? new Date(ir.incidentDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    },
                                  )
                                : "—"}
                            </h6>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center mb-2">
                            <h6 className="font-medium dark:text-white">
                              {ir.dateCreated
                                ? new Date(ir.dateCreated).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    },
                                  )
                                : "—"}
                            </h6>
                          </div>
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap">
                          <div className="flex items-center mb-2 space-x-4">
                            <button
                            style={{ display: "none" }}
                              className="hidden btn btn-warning btn-icon mr-2 btn-sm"
                              onClick={() =>
                                navigate(
                                  `/IncidentReportEdit/${hashids.encode(
                                    ir.incidentReportId,
                                  )}`,
                                )
                              }
                              title="Edit Report"
                            >
                              <Pen size={16} />
                            </button>
                            <button
                              className="btn btn-info btn-icon btn-sm"
                              onClick={() =>
                                navigate(
                                  `/IncidentReportDetails/${hashids.encode(
                                    ir.incidentReportId,
                                  )}`,
                                )
                              }
                            >
                              <Eye />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:gap-8">
          <div className="relative flex flex-col mb-8 bg-white rounded-lg shadow-lg dark:bg-dark-card grid grid-cols-1">
            <div className="relative flex flex-wrap justify-between p-5 ">
              <h4 className="text-lg font-semibold dark:text-white">
                Payment Log
              </h4>
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
                                      item.dateCreated,
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

export default EmployerDashboard;
