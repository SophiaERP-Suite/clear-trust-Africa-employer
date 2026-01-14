export interface ChatMessage {
  chatId: number;
  incidentReportId: number;
  fromId: number;
  from: string;
  comments: string;
  dateCreated: string;
  fileUrl: string;
  fileName: string;
  fileSize: string
}

export interface ChatParticipant {
  userId: number;
  userName: string;
  role: string;
  lastSeen: string;
}

// Chat API functions
export const fetchIncidentChatMessages = async (
  incidentReportId: number
): Promise<ChatMessage[]> => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `http://localhost:5181/api/IncidentChats/${incidentReportId}/GetAll`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch chat messages");
  return await response.json();
};

export const sendChatMessage = async (
  incidentReportId: number,
  organisationId: number,
  data: FormData
): Promise<ChatMessage> => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `http://localhost:5181/api/IncidentChats/${organisationId}/${incidentReportId}/register`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data 
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return await response.json();
};


// export const markMessagesAsRead = async (
//   incidentReportId: number
// ): Promise<void> => {
//   const token = localStorage.getItem("accessToken");
//   await fetch(
//     `http://localhost:5181/api/employer/IncidentReports/${incidentReportId}/chat/read`,
//     {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };

// export const fetchChatParticipants = async (
//   incidentReportId: number
// ): Promise<ChatParticipant[]> => {
//   const token = localStorage.getItem("accessToken");
//   const response = await fetch(
//     `http://localhost:5181/api/employer/IncidentReports/${incidentReportId}/chat/participants`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (!response.ok) throw new Error("Failed to fetch participants");
//   return await response.json();
// };
