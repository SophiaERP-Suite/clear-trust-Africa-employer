const BaseURL = "http://localhost:5181";

export interface CreateConversationDto {
  subject: string;
  recipientId: number;
  messageBody: string;
  organisationId: number;
}

export interface CreateMessageDto {
  messageBody: string;
  conversationId: number;
}

export const createConversation = async (payload: CreateConversationDto) => {
  console.log("payload", payload)
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/api/messaging/conversation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const createMessage = async (payload: CreateMessageDto) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/api/messaging/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const getConversations = async (organisationId: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/api/messaging/${organisationId}/inbox`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};

export const getMessages = async (conversationId: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/api/messaging/conversation/${conversationId}/messages`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};


// export const deleteRole = async (
//   organisationId: number,
//   roleId: number
// ) => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch(
//     `${BaseURL}/api/orgRole/${organisationId}/${roleId}/delete`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     const error = await response.text();
//     throw new Error(error || "Failed to delete role");
//   }

//   return response.json();
// };

