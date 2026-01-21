
const BaseURL = "http://localhost:5181";

export const getAllRoles = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/api/roles/GetAll`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};

// export const createRole = async (
//   organisationId: number,
//   data: CreateRolesDto
// ) => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch(
//     `${BaseURL}/api/orgRole/${organisationId}/create`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     }
//   );

//   if (!response.ok) {
//     const error = await response.text();
//     throw new Error(error || "Failed to create role");
//   }

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


// export const updateRole = async (
//   roleId: number,
//   organisationId: number,
//   data: UpdateRoleDto
// ) => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch(
//     `${BaseURL}/api/orgRole/${organisationId}/${roleId}/update`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     }
//   );

//   if (!response.ok) {
//     const error = await response.text();
//     throw new Error(error || "Failed to update role");
//   }

//   return response.json();
// };

