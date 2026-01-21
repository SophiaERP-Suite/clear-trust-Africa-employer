import {
  LayoutDashboard,
  ClipboardList,
  Users,
  AlertTriangle,
  MessageSquare,
  Settings,
  LogOut,
  File,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "clipboard-list": ClipboardList,
  "users": Users,
  "alert-triangle": AlertTriangle,
  "message-square": MessageSquare,
  "settings": Settings,
  "log-out": LogOut,
  "file": File,
};

export const getIconComponent = (iconName: string, size: number = 25) => {
  const IconComponent = iconMap[iconName.toLowerCase()] || LayoutDashboard;
  return <IconComponent size={size} />;
};