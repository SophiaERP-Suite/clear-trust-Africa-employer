import React from "react";
import {
  CheckCircle,
  PauseCircle,
  AlertTriangle,
  Clock,
  HelpCircle,
} from "lucide-react";

export type EmployerStatus = 1 | 2 | 3 | 4;

interface StatusBadgeProps {
  status: EmployerStatus;
  className?: string;
}

type StatusConfig = {
  label: string;
  icon: React.ReactElement;
  className: string;
};

const statusConfig: Record<EmployerStatus, StatusConfig> = {
  1: {
    label: "Active",
    icon: <CheckCircle size={12} />,
    className: "bg-green-500 text-white",
  },
  2: {
    label: "Inactive",
    icon: <PauseCircle size={12} />,
    className: "bg-gray-500 text-white",
  },
  3: {
    label: "Suspended",
    icon: <AlertTriangle size={12} />,
    className: "bg-orange-500 text-white",
  },
  4: {
    label: "Pending Verification",
    icon: <Clock size={12} />,
    className: "bg-yellow-500 text-white",
  },
};

const fallbackConfig: StatusConfig = {
  label: "Unknown",
  icon: <HelpCircle size={12} />,
  className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const config = statusConfig[status] ?? fallbackConfig;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.className} ${className}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export default StatusBadge;

export const STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
  SUSPENDED: 3,
  PENDING: 4,
} as const;
