const BaseURL = "http://localhost:5181";

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
  console.log("org res:", response);
  return response.json();
};

// export const uploadIncidentAttachment = async (
//   incidentReportId: number,
//   organisationId: number,
//   file: File,
//   description?: string
// ) => {
//   const token = localStorage.getItem("accessToken");

//   const formData = new FormData();
//   formData.append("incidentReportId", incidentReportId.toString());
//   formData.append("file", file);

//   if (description) {
//     formData.append("description", description);
//   }

//   const response = await fetch(
//     `${BaseURL}/api/employer/IncidentAttachments/${organisationId}/upload`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     throw new Error(await response.text());
//   }

//   return response.json();
// };

// export const deleteIncidentAttachment = async (attachmentId: number) => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch(
//     `${BaseURL}/api/employer/IncidentAttachments/${attachmentId}/attachments`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(await response.text());
//   }

//   return response.json();
// };

// export const fetchIncidentAttachments = async (incidentReportId: number) => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch(
//     `${BaseURL}/api/employer/IncidentAttachments/${incidentReportId}/attachments`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(await response.text());
//   }
//   return response.json();
// };
