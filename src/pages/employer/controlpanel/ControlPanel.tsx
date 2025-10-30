import { useState } from "react";
import { Settings, ShieldCheck, Database, ChevronRightIcon } from "lucide-react";
import Overview from "./Overview";
// import UserManagement from "./UserManagement";
import Permissions from "./Permissions";
import SysSettings from "./SysSettings";

export default function ControlPanel() {
  const [selectedSection, setSelectedSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: <Settings size={20} /> },
    // { id: "users", label: "User Management", icon: <Users size={20} /> },
    {
      id: "permissions",
      label: "Permissions",
      icon: <ShieldCheck size={20} />,
    },
    { id: "system", label: "System Settings", icon: <Database size={20} /> },
  ];

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      {/* Header */}
      <div className="flex flex-wrap mb-8 justify-between gap-4">
        <div className="col-md-12">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex">
              <Settings
                className="text-[rgb(112_22_208/0.9)] mr-2 "
                size={36}
              />
              <div>
                <h3 className="mb-0 text-black">Control Panel</h3>
                <p className="text-secondary-600 text-black">
                  Dashboard <ChevronRightIcon size={14} /> Control Panel{" "}
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

      {/* Sidebar-like section switcher */}
      <div className="flex flex-wrap gap-4 mb-6">
        {sections.map((section) => (
          <a
            key={section.id}
            onClick={() => setSelectedSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md shadow transition-all ${
              selectedSection === section.id
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
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
        {/* {selectedSection === "users" && <UserManagement />} */}
        {selectedSection === "permissions" && <Permissions />}
        {selectedSection === "system" && <SysSettings />}
      </div>
    </div>
  );
}
