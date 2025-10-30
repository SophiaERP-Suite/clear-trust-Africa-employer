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
import Incidents from "../pages/employer/incident/incident";
import Reports from "../pages/employer/reports/Reports";
import CommunicationsPage from "../pages/employer/communication/Communication";
import PaymentDashboard from "../pages/employer/Payment";
import ControlPanel from "../pages/employer/controlpanel/ControlPanel";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<EmployerLayout/>}>
        <Route index element={<Dashboard />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Employee" element={<Applicants />} />
        <Route path="EmployeeNew" element={<ApplicantNew />} />
        <Route path="EmployeeProfile" element={<ApplicantProfile />} />
        <Route path="EmployersMgt" element={<Employers />} />
        <Route path="EmployerNew" element={<EmployersNew />} />
        <Route path="EmployerProfile" element={<EmployerProfile />} />
        {/* <Route path="tracker" element={<DBSTrackerModule />} /> */}
        <Route path="Tracker" element={<DBSTrackerModule />} />
        <Route path="IncidentMgt" element={<Incidents />} />
        <Route path="Payment" element={<PaymentDashboard />} />
        <Route path="Reports" element={<Reports />} />
        <Route path="Communication" element={<CommunicationsPage />} />
        <Route path="ControlPanel" element={<ControlPanel />} />

      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
