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
  status: number;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  //  status configuration
  const statusConfig: Record<
    EmployerStatus,
    {
      label: string;
      icon: React.ReactElement;
      className: string;
    }
  > = {
    1: {
      label: "Active",
      icon: <CheckCircle size={12} />,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
    2: {
      label: "Inactive",
      icon: <PauseCircle size={12} />,
      className:
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    },
    3: {
      label: "Suspended",
      icon: <AlertTriangle size={12} />,
      className:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    },
    4: {
      label: "Pending Verification",
      icon: <Clock size={12} />,
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    },
  };

  const config = statusConfig[status] || {
    label: "Unknown Status",
    icon: <HelpCircle size={12} />,
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };

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
  ACTIVE: 1 as const,
  INACTIVE: 2 as const,
  SUSPENDED: 3 as const,
  PENDING: 4 as const,
} as const;
