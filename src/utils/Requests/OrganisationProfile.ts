import type { UpdateOrgFormValues } from "../../pages/employer/employer/EmployerUpdate";

const BaseURL = "http://localhost:5181";

export const UpdateOrganisationData = async (
  payload: UpdateOrgFormValues,
  organisationId: number
) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/employers/${organisationId}/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  console.log("org res:", response);
  return response.json();
};

export const fetchOrganisationData = async (organisationId: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/employers/${organisationId}/Organisation`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  console.log("org res:", response.json);
  return response.json();
};

export const fetchOrganisationDocs = async (organisationId: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/employers/${organisationId}/verification-documents`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  console.log("org res:", response);
  return response.json();
};
