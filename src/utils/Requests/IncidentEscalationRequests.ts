import type { DbsPartners } from "../../pages/employer/incident/IncidentReportDetails";

const BaseURL = "http://localhost:5181";

export const fetchDbsPartners = async (): Promise<DbsPartners[]> => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BaseURL}/api/admin/DbsPartners/GetAll`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch DBS partners");
  }

  const data: DbsPartners[] = await response.json();
  console.log("dbs pattners", data);
  return data;
}

// export const fetchEscalations = async (incidentReportId: number): Promise<Escalations[]> => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch(`${BaseURL}/api/employer/IncidentEscalation/${incidentReportId}/GetAll`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch DBS partners");
//   }

//   const data: DbsPartners[] = await response.json();
//   console.log("dbs pattners", data);
//   return data;
// };
