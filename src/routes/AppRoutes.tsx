import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/employer/Dashboard";
import EmployerLayout from "../layout/EmployerLayout";
import ApplicantNew from "../pages/employer/applicant/ApplicantNew";
import Applicants from "../pages/employer/applicant/Applicants";
import ApplicantProfile from "../pages/employer/applicant/ApplicantProfile";
import Incidents from "../pages/employer/incident/incident";
import Reports from "../pages/employer/reports/Reports";
import CommunicationsPage from "../pages/employer/communication/Communication";
import PaymentDashboard from "../pages/employer/payment/Payment";
import ControlPanel from "../pages/employer/controlpanel/ControlPanel";
import Pricing from "../pages/employer/pricing/Pricing";
import Profile from "../pages/employer/employer/EmployerProfile";
import ProfileUpdate from "../pages/employer/employer/EmployerUpdate";
import Security from "../pages/employer/Security";
import HelpSupportPage from "../pages/employer/Help";
import PaymentRedirect from "../pages/employer/payment/PaymentRedirect";
import IncidentReportDetails from "../pages/employer/incident/IncidentReportDetails";
import IncidentReportForm from "../pages/employer/incident/IncidentReportForm";
import DBSTrackerModule from "../pages/employer/Tracker/DbsTracker";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EmployerLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Employee" element={<Applicants />} />
        <Route path="EmployeeNew" element={<ApplicantNew />} />
        <Route path="/EmployeeNew/:id" element={<ApplicantNew />} />
        <Route path="EmployeeProfile/:id" element={<ApplicantProfile />} />
        <Route path="ProfileUpdate" element={<ProfileUpdate />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Tracker" element={<DBSTrackerModule />} />
        <Route path="IncidentMgt" element={<Incidents />} />
        <Route path="IncidentReportForm" element={<IncidentReportForm />} />
        <Route
          path="/IncidentReportEdit/:id"
          element={<IncidentReportForm />}
        />
        <Route
          path="IncidentReportDetails/:irid"
          element={<IncidentReportDetails />}
        />
        <Route path="Payment" element={<PaymentDashboard />} />
        <Route path="Reports" element={<Reports />} />
        <Route path="Communication" element={<CommunicationsPage />} />
        <Route path="ControlPanel" element={<ControlPanel />} />
        <Route path="Pricing" element={<Pricing />} />
        <Route path="Security" element={<Security />} />
        <Route path="Help" element={<HelpSupportPage />} />
        <Route path="PaymentRedirect/:tx_ref" element={<PaymentRedirect />} />
      </Route>
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}

export default AppRoutes;
