import BaseDashboardLayout from "./BaseDashboardLayout";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Users,
  AlertTriangle,
  MessageSquare,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

function EmploymentLayout() {
  const navItems = [
    {
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
   
    {
      path: "/tracker",
      icon: <ClipboardList size={18} />,
      label: "DBS Tracker",
    },
    {
      path: "/incidentMgt",
      icon: <AlertTriangle size={18} />,
      label: "Incident Mgt",
    },

    {
      path: "/financeMgt",
      icon: <Wallet size={18} />,
      label: "Finance Mgt",
    },
    {
      path: "/reports",
      icon: <BarChart3 size={18} />,
      label: "Reports & Analytics",
    },

    {
      path: "/communication",
      icon: <MessageSquare size={18} />,
      label: "Communication",
    },

     {
      path: "/applicantsMgt",
      icon: <Users size={18} />,
      label: "Employee Mgt",
    },

    {
      path: "/control-panel",
      icon: <Settings size={18} />,
      label: "Control Panel",
    },

    {
      path: "/logout",
      icon: <LogOut size={18} />,
      label: "Logout",
    },
  ];

  return <BaseDashboardLayout navItems={navItems} title={"EMPLOYER"} />;
}

export default EmploymentLayout;
