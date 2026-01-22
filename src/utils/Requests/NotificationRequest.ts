const BaseURL = "http://localhost:5181";

export const getNotifications = async (recipientId: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/api/notifications/user/${recipientId}`,
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

export const readNotifications = async (notificationId: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/api/notifications/messages/${notificationId}/read`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
};

// export const getMessages = async (conversationId: number) => {
//   const token = localStorage.getItem("accessToken");
//   const response = await fetch(
//     `${BaseURL}/api/messaging/conversation/${conversationId}/messages`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
//   return response.json();
// };

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
