// import {
//   Key,
//   LayoutDashboard,
//   Shield,
//   Activity,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { getAllRoles } from "../../../api/roleApi";
// import { getAllOrganisationTypes } from "../../../api/orgTypeApi";
// import { getAllPermissions } from "../../../api/permissionApi";
// import { useNavigate } from "react-router-dom";

// function ControlPanelOverview() {
//   const navigate = useNavigate();

//   const quickLinks = [
//     {
//       id: "roles",
//       title: "Role Management",
//       description: "Create and manage user roles and access levels",
//       icon: <Shield className="h-8 w-8" />,
//       color: "bg-purple-100 text-purple-600",
//       path: "/ControlPanel/Roles",
//     },
//     {
//       id: "permissions",
//       title: "Permissions",
//       description: "Configure system permissions and access controls",
//       icon: <Key className="h-8 w-8" />,
//       color: "bg-blue-100 text-blue-600",
//       path: "/ControlPanel/Permissions",
//     },
//     // {
//     //   id: "permissionsAssign",
//     //   title: "Assign Permissions",
//     //   description: "Assign permissions to roles and users",
//     //   icon: <Users className="h-8 w-8" />,
//     //   color: "bg-green-100 text-green-600",
//     //   path: "/ControlPanel/RolePermissions",
//     // },
//     // {
//     //   id: "organisationType",
//     //   title: "Organisation Types",
//     //   description: "Manage different organisation classifications",
//     //   icon: <Building className="h-8 w-8" />,
//     //   color: "bg-amber-100 text-amber-600",
//     //   path: "/ControlPanel/OrganisationType",
//     // },
//     // {
//     //   id: "notifications",
//     //   title: "Notification Settings",
//     //   description: "Configure email, SMS, and in-app notifications",
//     //   icon: <Bell className="h-8 w-8" />,
//     //   color: "bg-pink-100 text-pink-600",
//     //   path: "/ControlPanel/NotificationSettings",
//     // },
//     {
//       id: "audit",
//       title: "Audit Logs",
//       description: "View system activity and user actions",
//       icon: (
//         <div className="h-8 w-8">
//           <Activity size={32} />
//         </div>
//       ),
//       color: "bg-gray-100 text-gray-600",
//       path: "/ControlPanel/audit-logs",
//     },
//   ];

//   const stats = [
//     { title: "Organisation Types", value: 120, color: "blue" },
//     { title: "Permissions", value: 450, color: "green" },
//     { title: "Active Roles", value: 10, color: "purple" },
//   ];

//   const colorMap: any = {
//     blue: "bg-blue-100 text-blue-700",
//     green: "bg-green-100 text-green-700",
//     purple: "bg-purple-100 text-purple-700",
//     red: "bg-red-100 text-red-700",
//   };

//   const [rolesCount, setRolesCount] = useState(0);
//   const [permissionsCount, setPermissionsCount] = useState(0);
//   const [orgTypeCount, setOrgTypeCount] = useState(0);

//   useEffect(() => {
//     fetchRoles();
//     fetchPermissions();
//     fetchOrgType();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const data = await getAllRoles();
//       const dataCount = data.length;
//       setRolesCount(dataCount);
//     } catch (err: any) {
//     } finally {
//     }
//   };

//   const fetchPermissions = async () => {
//     try {
//       const data = await getAllPermissions();
//       const dataCount = data.length;
//       setPermissionsCount(dataCount);
//     } catch (err: any) {
//     } finally {
//     }
//   };

//   const fetchOrgType = async () => {
//     try {
//       const data = await getAllOrganisationTypes();
//       const dataCount = data.length;
//       setOrgTypeCount(dataCount);
//     } catch (err: any) {
//       console.error(err);
//     } finally {
//     }
//   };

//   const isLoading =
//     rolesCount === 0 && permissionsCount === 0 && orgTypeCount === 0;
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   stats[0].value = orgTypeCount;
//   stats[1].value = permissionsCount;
//   stats[2].value = rolesCount;

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
//                 <LayoutDashboard /> Overview
//               </h4>
//             </div>
//             <div className="py-2 px-3">
//               <div className="overflow-x-auto">
//                 <div className=" overflow-x-auto p-5">
//                   {/* Stats Cards */}
//                   <div className="grid sm:grid-cols-3 md:grid-cols-3 gap-4">
//                     {stats.map((stat, idx) => (
//                       <div
//                         key={idx}
//                         className={`${
//                           colorMap[stat.color]
//                         } p-6 rounded-lg shadow-md`}
//                       >
//                         <h4 className="font-semibold text-lg mb-2">
//                           {stat.title}
//                         </h4>
//                         <p className="text-3xl font-bold">
//                           {" "}
//                           {isLoading ? "—" : stat.value}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Quick Actions */}
//                   <div className="mt-6">
//                     <h3 className="text-xl font-semibold mb-4">
//                       Quick Actions
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {quickLinks.map((link) => (
//                         <button
//                           key={link.id}
//                           onClick={() => navigate(link.path)}
//                           className="bg-white p-5 rounded-sm border hover:shadow-md transition-shadow text-left group cursor-pointer"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className={`p-2 rounded-lg ${link.color}`}>
//                               {link.icon}
//                             </div>
//                           </div>
//                           <h3 className="font-semibold text-gray-800 mb-1">
//                             {link.title}
//                           </h3>
//                           <p className="text-sm text-gray-600 mb-3">
//                             {link.description}
//                           </p>
//                           <span className="text-purple-600 text-sm font-medium group-hover:underline">
//                             Go to section →
//                           </span>
//                         </button>
//                       ))}
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

// export default ControlPanelOverview;
