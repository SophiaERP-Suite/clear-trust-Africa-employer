import { useEffect, useState, type JSX } from "react";
import { fetchModulesByRoleIdAndPortalType } from "../utils/Requests/moduleRequest";
import BaseDashboardLayout from "./BaseDashboardLayout";
import { getIconComponent } from "../utils/iconMapping";
import { LogOut } from "lucide-react";

interface ModuleDto {
  moduleId: number;
  moduleName: string;
  moduleUrl: string;
  iconName: string;
  displayOrder: number;
}

interface NavItem {
  path: string;
  icon: JSX.Element;
  label: string;
}

function EmploymentLayout() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const data: ModuleDto[] = await fetchModulesByRoleIdAndPortalType(
        "EMPLOYER",
        2,
      );

      const mappedNavItems: NavItem[] = data
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((module) => ({
          path: module.moduleUrl,
          icon: getIconComponent(module.iconName, 25),
          label: module.moduleName,
        }));

      const hasLogout = data.some(
        (m) => m.iconName.toLowerCase() === "log-out",
      );
      if (!hasLogout) {
        mappedNavItems.push({
          path: "/Logout",
          icon: <LogOut size={25} />,
          label: "Logout",
        });
      }

      setNavItems(mappedNavItems);
    } catch (err: any) {
      setNavItems([
        {
          path: "/Dashboard",
          icon: getIconComponent("layout-dashboard", 25),
          label: "Dashboard",
        },
        {
          path: "/Logout",
          icon: <LogOut size={25} />,
          label: "Logout",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return <BaseDashboardLayout navItems={navItems} title={"EMPLOYER"} />;
}

export default EmploymentLayout;
