const BaseURL = "http://localhost:5181";

export const fetchIncidentReportsDashboard = async (organisationId: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/api/IncidentReports/dashboard/${organisationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  console.log("incident reports dashboard response", response);
  return response.json();
};

export const fetchIncidentReports = async (
  organisationId: number,
  page: number,
  pageSize: number,
) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/api/IncidentReports/${organisationId}/${page}/${pageSize}/GetAll`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("fetch incident reports response", response);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const uploadIncidentAttachment = async (
  incidentReportId: number,
  organisationId: number,
  file: File,
  description?: string,
) => {
  const token = localStorage.getItem("accessToken");

  const formData = new FormData();
  formData.append("incidentReportId", incidentReportId.toString());
  formData.append("file", file);

  if (description) {
    formData.append("description", description);
  }

  const response = await fetch(
    `${BaseURL}/api/IncidentAttachments/${organisationId}/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const deleteIncidentAttachment = async (attachmentId: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/api/IncidentAttachments/${attachmentId}/attachments`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const fetchIncidentAttachments = async (incidentReportId: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/api/IncidentAttachments/${incidentReportId}/attachments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export const fetchIncidentType = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/incident-type`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createNewIncidentReport = async (data: FormData) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/api/IncidentReports`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return response;
};
