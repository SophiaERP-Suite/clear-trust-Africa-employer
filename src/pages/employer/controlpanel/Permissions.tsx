// import { Pen, Plus, Key, Trash, Trash2, Check, CheckCheck } from "lucide-react";
// import { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// // import {
// //   createPermission,
// //   deletePermission,
// //   getAllPermissions,
// //   updatePermission,
// // } from "../../../api/permissionApi";
// // import type { PermissionsDto } from "../../../types/controlPanel/permissions";
// // import Modal from "../../utils/modal";
// // import { getAllOrganisationTypes } from "../../../api/orgTypeApi";
// // import type { OrganisationTypeDto } from "../../../types/controlPanel/organisationType";
// // import Loading from "../../utils/Loading";

// type ModalType = "add" | "edit" | "delete" | null;

// function Permissions() {
//   const [permissions, setPermissions] = useState<PermissionsDto[]>([]);
//   const [organisationTypes, setOrganisationTypes] = useState<
//     OrganisationTypeDto[]
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [modalType, setModalType] = useState<ModalType>(null);
//   const [selectedPermissionId, setSelectedPermissionId] = useState<
//     number | null
//   >(null);

//   useEffect(() => {
//     fetchPermissions();
//     fetchOrgType();
//   }, []);

//   const fetchPermissions = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllPermissions();
//       setPermissions(data);
//     } catch (err: any) {
//       console.error(err);
//       setError("Failed to fetch Permissions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrgType = async () => {
//     try {
//       // setLoading(true);
//       const data = await getAllOrganisationTypes();
//       setOrganisationTypes(data);
//       console.log(data);
//     } catch (err: any) {
//       console.error(err);
//       setError("Failed to fetch Permissions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toast messages
//   const notifySuccess = () => toast.success("Action successful");
//   const notifyError = () => toast.error("Action Failed");

//   // Call modals
//   const openAddModal = () => {
//     setModalType("add");
//   };

//   const openDeleteModal = (PermissionId: number) => {
//     setSelectedPermissionId(PermissionId);
//     setModalType("delete");
//   };

//   const openEditModal = (PermissionId: number) => {
//     setSelectedPermissionId(PermissionId);
//     setModalType("edit");
//   };

//   const closeModal = () => {
//     setModalType(null);
//     setSelectedPermissionId(null);
//   };

//   const handleNewPermission = async (
//     permissionInput?: string,
//     permissionInput2?: string,
//     orgTypeId?: string
//   ) => {
//     try {
//       setLoading(true);

//       // Validation
//       if (!permissionInput || !permissionInput2 || !orgTypeId) {
//         toast.error("Please fill all fields");
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         name: permissionInput,
//         description: permissionInput2,
//         organisationTypeId: parseInt(orgTypeId),
//       };

//       await createPermission(payload);
//       notifySuccess();

//       closeModal();
//       fetchPermissions();
//     } catch (err: any) {
//       notifyError();
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdatePermission = async (
//     permissionInput?: string,
//     permissionInput2?: string,
//     orgTypeId?: string
//   ) => {
//     try {
//       setLoading(true);
//       setLoading(true);

//       if (!permissionInput || !permissionInput2 || !orgTypeId) {
//         toast.error("Please fill all fields");
//         setLoading(false);
//         return;
//       }

//       if (!selectedPermissionId) return;

//       const permissionId = selectedPermissionId;

//       const payload = {
//         name: permissionInput,
//         description: permissionInput2,
//         organisationTypeId: parseInt(orgTypeId),
//       };

//       await updatePermission(permissionId, payload);
//       notifySuccess();
//       closeModal();
//       fetchPermissions();
//     } catch (err: any) {
//       notifyError();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeletePermission = async () => {
//     try {
//       setLoading(true);
//       if (!selectedPermissionId) return;
//       const PermissionId = selectedPermissionId;
//       await deletePermission(PermissionId);
//       notifySuccess();
//       closeModal();
//       fetchPermissions();
//     } catch (err: any) {
//       notifyError();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="footer-inner mx-auto main-container container"
//       x-bind:className="setting.page_layout"
//     >
//       <div className="flex flex-wrap contet-inner">
//         <div className="flex-auto w-full">
//           <div className="relative flex flex-col mb-8  bg-white dark:bg-dark-card shadow rounded">
//             <div className="flex justify-between flex-auto p-5 border-b dark:border-secondary-800 rounded">
//               <h4 className="mb-0 dark:text-secondary-200">
//                 <Key /> Permissions Management
//               </h4>
//             </div>
//             <div className="py-2 px-3">
//               <div className="overflow-x-auto">
//                 <div className=" overflow-x-auto p-5">
//                   <ToastContainer />
//                   <Modal
//                     isOpen={modalType === "add"}
//                     title="Add New Permission"
//                     message=""
//                     confirmText="Add Permission"
//                     confirmColor="green"
//                     loading={loading}
//                     inputLabel="New Permission Name"
//                     inputPlaceholder="Enter Permission Name..."
//                     inputLabel2="Permission Description"
//                     inputPlaceholder2="Enter Permission Description..."
//                     headerIcon={<Check width={22} />}
//                     butonIcon={<CheckCheck width={22} />}
//                     dropdownLabel="Organisation Type"
//                     dropdownOptions={organisationTypes.map((type) => ({
//                       value: type.organisationTypeId,
//                       label: type.name,
//                     }))}
//                     onConfirm={handleNewPermission}
//                     onCancel={closeModal}
//                   />

//                   <Modal
//                     isOpen={modalType === "delete"}
//                     title="Delete Permission"
//                     message="Are you sure you want to delete this Permission? This action cannot be undone."
//                     confirmText="Delete Permission"
//                     confirmColor="red"
//                     headerIcon={<Trash2 width={22} />}
//                     butonIcon={<Trash2 width={22} />}
//                     loading={loading}
//                     onConfirm={handleDeletePermission}
//                     onCancel={closeModal}
//                   />

//                   <Modal
//                     isOpen={modalType === "edit"}
//                     title="Edit Permission"
//                     message=""
//                     confirmText="Confirm Changes"
//                     confirmColor="yellow"
//                     loading={loading}
//                     inputLabel="New Permission Name"
//                     inputPlaceholder="Enter Permission Name..."
//                     inputLabel2="Permission Description"
//                     inputPlaceholder2="Enter Permission Description..."
//                     dropdownLabel="Organisation Type"
//                     dropdownOptions={organisationTypes.map((type) => ({
//                       value: type.organisationTypeId,
//                       label: type.name,
//                     }))}
//                     defaultDropdownValue=""
//                     defaultInputValue=""
//                     defaultInputValue2=""
//                     headerIcon={<Pen width={22} />}
//                     butonIcon={<Pen width={22} />}
//                     onConfirm={handleUpdatePermission}
//                     onCancel={closeModal}
//                   />
//                   <h3 className="text-xl font-semibold mb-4"></h3>

//                   <div>
//                     {" "}
//                     <h3 className="text-lg font-semibold mb-4">
//                       All Permissions
//                     </h3>
//                     <div className="flex justify-end items-center flex-wrap mb-4">
//                       <button
//                         className="btn btn-success mb-4"
//                         onClick={() => openAddModal()}
//                       >
//                         <Plus /> Add New Permission
//                       </button>
//                     </div>
//                     <div className="overflow-x-auto">
//                       {loading && <Loading />}
//                       {error && (
//                         <div className="error flex justify-center text-center mt-[25%]">
//                           Error: {error}
//                         </div>
//                       )}
//                       {!loading && !error && permissions.length === 0 && (
//                         <div className="no-roles flex justify-center text-center mt-[25%]">
//                           No Permissions found.
//                         </div>
//                       )}
//                       {!loading && !error && permissions.length > 0 && (
//                         <table className="min-w-full overflow-hidden divide-y divide-secondary-200 dark:divide-secondary-800 border text-sm dark:border-secondary-800">
//                           <thead>
//                             <tr className="bg-gray-100 text-gray-700">
//                               <th className="p-3 text-left">Name</th>
//                               <th className="p-3 text-left">Description</th>
//                               <th className="p-3 text-left">OrgType</th>
//                               <th className="p-3 text-right">Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {permissions.map((perm) => (
//                               <tr
//                                 key={perm.permissionId}
//                                 className="border-b hover:bg-gray-50"
//                               >
//                                 <td className="p-3">{perm.name}</td>
//                                 <td className="p-3">{perm.description}</td>
//                                 <td className="p-3">
//                                   {perm.organisationTypeName}
//                                 </td>
//                                 <td className="p-3 text-right">
//                                   <button
//                                     className="btn btn-danger btn-icon btn-sm mr-1"
//                                     type="button"
//                                     onClick={() =>
//                                       openDeleteModal(perm.permissionId)
//                                     }
//                                   >
//                                     {" "}
//                                     <span className="btn-inner">
//                                       <Trash
//                                         className=""
//                                         style={{ scale: "140%" }}
//                                       />
//                                     </span>
//                                   </button>
//                                   <button
//                                     className="btn btn-warning btn-icon btn-sm mr-1"
//                                     type="button"
//                                     onClick={() =>
//                                       openEditModal(perm.permissionId)
//                                     }
//                                   >
//                                     <Pen />
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Permissions;
