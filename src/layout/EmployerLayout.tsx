import { useEffect, useState, type JSX } from "react";
import { fetchModulesByRoleIdAndPortalType } from "../utils/Requests/moduleRequest";
import BaseDashboardLayout from "./BaseDashboardLayout";
import { getIconComponent } from "../utils/iconMapping";
import { LogOut } from "lucide-react";
import { useAuth } from "../utils/useAuth";
import Loading from "../utils/Loading";

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
  onClick?: () => void;
}

function EmploymentLayout() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();
  const organisationType = user?.organisationType;

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const data: ModuleDto[] = await fetchModulesByRoleIdAndPortalType(
        organisationType?.toUpperCase().trim() || "EMPLOYER",
        2,
      );

      const mappedNavItems: NavItem[] = data
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((module) => ({
          path: module.moduleUrl,
          icon: getIconComponent(module.iconName, 25),
          label: module.moduleName,
        }));

      // Always add logout at the end regardless of what DB returns
      mappedNavItems.push({
        path: "#",
        icon: <LogOut size={25} />,
        label: "Logout",
        onClick: logout,
      });

      setNavItems(mappedNavItems);
    } catch (err: any) {
      setNavItems([
        {
          path: "/Dashboard",
          icon: getIconComponent("layout-dashboard", 25),
          label: "Dashboard",
        },
        {
          path: "#",
          icon: <LogOut size={25} />,
          label: "Logout",
          onClick: logout,
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
          <div className="loading"><Loading /></div>
        </div>
      </div>
    );
  }

  return (
    <BaseDashboardLayout
      navItems={navItems}
      title={organisationType?.toUpperCase()}
    />
  );
}

export default EmploymentLayout;