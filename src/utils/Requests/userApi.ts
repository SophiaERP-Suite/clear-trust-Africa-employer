const BaseURL = "http://localhost:5181";

export const fetchAllApplicants = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/applicants/non-filtered`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const fetchApplicants = async (pageNumber = 1, limit = 10) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/applicants?pageNumber=${pageNumber}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};

export const fetchApplicantsByRoleId = async (
  organisationId: number,
  RoleId: number,
) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/user/${organisationId}/${RoleId}/GetAll`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};

export const assignApplicantsRole = async (payload: {
  userId: number;
  roleId: number;
  organisationId: number;
}) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/user/change-user-role`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};
