const BaseURL = "http://localhost:5181";

export const fetchModuleByPortalType = async (portalType: string) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/api/modules/by-portal-type/${portalType}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};

export const fetchModuleAssignments = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/api/modules/GetAll`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const fetchModulesByRoleIdAndPortalType = async (
  PortalType: string,
  RoleId: number,
) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/api/modules/${PortalType}/${RoleId}/GetAll`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};

export const assignModule = async (payload: {
  moduleId: number;
  roleId: number;
}) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BaseURL}/api/modules/assign`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const unassignModule = async (roleModuleId: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/api/modules/${roleModuleId}/unassign`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.json();
};
