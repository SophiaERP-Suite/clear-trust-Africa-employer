import type { ChangePasswordFormValues } from "../../pages/employer/Security";

const BaseURL = "http://localhost:5181";

export const UpdatePassword = async (
  payload: ChangePasswordFormValues,
  organisationId: number
) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/user/${organisationId}/change-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        CurrentPassword: payload.CurrentPassword,
        NewPassword: payload.NewPassword,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  console.log("org res:", response);
  return response.json();
};

export const GetAllLoginAuditTrailsByOrganisationAsync = async (
  organisationId: number
) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/api/audit-trail/${organisationId}/organisation`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  console.log("audit res:", response);
  return response.json();
};
