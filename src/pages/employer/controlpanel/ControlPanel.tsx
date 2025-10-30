import { useState } from "react";
import { Settings, Users, ShieldCheck, Database } from "lucide-react";
import Overview from "./Overview";
import UserManagement from "./UserManagement";

export default function ControlPanel() {
  const [selectedSection, setSelectedSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: <Settings size={20} /> },
    { id: "users", label: "User Management", icon: <Users size={20} /> },
    { id: "permissions", label: "Permissions", icon: <ShieldCheck size={20} /> },
    { id: "system", label: "System Settings", icon: <Database size={20} /> },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Control Panel</h2>

      {/* Sidebar-like section switcher */}
      <div className="flex flex-wrap gap-4 mb-6">
        {sections.map((section) => (
          <a
            key={section.id}
            onClick={() => setSelectedSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md shadow transition-all ${
              selectedSection === section.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {section.icon}
            {section.label}
          </a>
        ))}
      </div>

      {/* Dynamic content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {selectedSection === "overview" && <Overview />}
        {selectedSection === "users" && <UserManagement />}
        {/* {selectedSection === "permissions" && <Permissions />}
        {selectedSection === "system" && <SystemSettings />} */}
      </div>
    </div>
  );
}
