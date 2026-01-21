import { useState } from "react";
import {
  Settings,
  ChevronRight,
  Menu,
  X,
  User,
  Lock,
  CircleQuestionMark,
  Shield,
  Folder,
} from "lucide-react";
import {
  Link,
  useLocation,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Profile from "../employer/EmployerProfile";
import Security from "./Security";
import HelpAndSupport from "./Help";
import Roles from "./Roles";
import PortalModules from "./Module";

const sidebarItems = [
  {
    id: "profile",
    label: "Profile",
    icon: <User size={20} />,
    path: "/ControlPanel",
    component: Profile,
  },
  {
    id: "security",
    label: "Security",
    icon: <Lock size={20} />,
    path: "/ControlPanel/security",
    component: Security,
  },

  {
    id: "roles",
    label: "Role Mgt",
    icon: <Shield size={20} />,
    path: "/ControlPanel/roles",
    component: Roles,
  },
  {
    id: "module",
    label: "Module Mgt",
    icon: <Folder size={20} />,
    path: "/ControlPanel/modules",
    component: PortalModules,
  },
  {
    id: "help",
    label: "Help",
    icon: <CircleQuestionMark size={20} />,
    path: "/ControlPanel/helpSupport",
    component: HelpAndSupport,
  },
];

export default function ControlPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentSectionId = () => {
    const currentItem = sidebarItems.find(
      (item) => item.path === location.pathname,
    );
    return currentItem ? currentItem.id : "overview";
  };

  const selectedSection = getCurrentSectionId();

  return (
    <div className="p-6 lg:p-8 footer-inner mx-auto main-container container">
      {/* Header */}
      <div className="flex flex-wrap mb-6 justify-between gap-4">
        <div className="flex items-center gap-4 w-full">
          <div className="flex">
            <Settings className="text-[rgb(112_22_208/0.9)] mr-2" size={36} />
            <div>
              <h3 className="mb-0 text-black text-2xl font-semibold">
                Control Panel
              </h3>
              <p className="text-black text-sm flex items-center gap-1">
                Dashboard <ChevronRight size={14} /> Control Panel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-3 mb-4 border-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6 relative">
        {/* Sidebar */}
        <aside
          className={`
            w-64 bg-white rounded-lg text-black shadow-md p-4 lg:h-fit
            lg:sticky lg:top-6
            transition-all duration-300
            ${
              sidebarOpen
                ? "fixed inset-0 z-50 lg:relative overflow-y-auto"
                : "hidden lg:block"
            }
          `}
        >
          {sidebarOpen && (
            <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b">
              <span className="font-semibold text-lg">Control Panel</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          )}

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() =>
                  window.innerWidth < 1024 && setSidebarOpen(false)
                }
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-all ${
                  selectedSection === item.id
                    ? "bg-white text-black font-medium shadow-sm"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                <span
                  className={
                    selectedSection === item.id ? "text-black" : "text-gray-400"
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}

        {/* Main Content Area with Routes */}
        <main className="flex-1 min-h-[500px]">
          <Routes>
            {sidebarItems.map((item) => (
              <Route
                key={item.id}
                path={item.path.replace("/ControlPanel", "")}
                element={
                  item.component ? (
                    <item.component />
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-semibold text-black mb-2">
                        {item.label}
                      </h3>
                      <p className="text-black">
                        This section is coming soon...
                      </p>
                    </div>
                  )
                }
              />
            ))}
            <Route index element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
