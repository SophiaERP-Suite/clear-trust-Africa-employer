import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/employer/Dashboard";
import EmployerLayout from "../layout/EmployerLayout";
import ApplicantNew from "../pages/employer/applicant/ApplicantNew";
import Applicants from "../pages/employer/applicant/Applicants";
import ApplicantProfile from "../pages/employer/applicant/ApplicantProfile";
import EmployersNew from "../pages/employer/employer/EmployerNew";
import Employers from "../pages/employer/employer/Employers";
import EmployerProfile from "../pages/employer/employer/EmployerProfile";
import DBSTrackerModule from "../pages/employer/Tracker/DbsTracker";
import FinanceDashboard from "../pages/employer/Finance";
import Incidents from "../pages/employer/incident/incident";
import Reports from "../pages/employer/reports/Reports";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<EmployerLayout/>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="applicantsMgt" element={<Applicants />} />
        <Route path="applicantNew" element={<ApplicantNew />} />
        <Route path="applicantProfile" element={<ApplicantProfile />} />
        <Route path="employersMgt" element={<Employers />} />
        <Route path="employerNew" element={<EmployersNew />} />
        <Route path="employerProfile" element={<EmployerProfile />} />
        {/* <Route path="tracker" element={<DBSTrackerModule />} /> */}
        <Route path="tracker" element={<DBSTrackerModule />} />
        <Route path="incidentMgt" element={<Incidents />} />
        <Route path="financeMgt" element={<FinanceDashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="communication" element={<Dashboard />} />
        <Route path="control-panel" element={<Dashboard />} />

      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
