import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Folder, FolderPlus, Trash2, Trash2Icon, X } from "lucide-react";
import type { RolesDto } from "../../../types/roles";
import { getAllRoles } from "../../../utils/Requests/roleApi";
import { useAuth } from "../../../utils/useAuth";
import {
  assignModule,
  fetchModuleAssignments,
  fetchModuleByPortalType,
  unassignModule,
} from "../../../utils/Requests/moduleRequest";
import type { AssignedModuleDto } from "../../../types/module";
import Modal from "../../../utils/modal";

type ModalType = "add" | "edit" | "delete" | null;

export interface EmployeesDto {
  userId: number;
  firstName: string;
  lastName: string;
  role: string;
}

export interface ModuleDto {
  moduleId: number;
  moduleName: string;
}

function PortalModules() {
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedRoleModuleId, setSelectedRoleModuleId] = useState<
    number | null
  >(null);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedPortalType, setSelectedPortalType] = useState<string>("");
  const [selectedModuleForDelete, setSelectedModuleForDelete] =
    useState<AssignedModuleDto | null>(null);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [assignedModules, setAssignedModules] = useState<AssignedModuleDto[]>(
    [],
  );
  const [roles, setRoles] = useState<RolesDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const organisationTypeName = user?.organisationType.toUpperCase();

  useEffect(() => {
    fetchRoles();
    fetchAssignedRoles();
    fetchModule();
  }, []);

  const fetchAssignedRoles = async () => {
    try {
      setLoading(true);
      const data = await fetchModuleAssignments();
      if (data) {
        setAssignedModules(data);
      }
    } catch (err: any) {
      setError("Failed to fetch Roles");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await getAllRoles();
      if (data) {
        setRoles(data);
      }
    } catch (err: any) {
      setError("Failed to fetch Roles");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignModule = async () => {
    try {
      setLoading(true);
      if (!selectedModuleId || !selectedRoleId) {
        toast.error("Please select both module and role");
        setLoading(false);
        return;
      }

      const payload = {
        moduleId: selectedModuleId,
        roleId: selectedRoleId,
      };

      const response = await assignModule(payload);

      if (response) {
        toast.success("Module assigned successfully");
      }

      // Reset selections
      setSelectedModuleId(null);
      setSelectedRoleId(null);
      setSelectedPortalType("");
      setModules([]);
      fetchAssignedRoles();
    } catch (err: any) {
      toast.error("Failed to assign module");
    } finally {
      setLoading(false);
    }
  };

  const fetchModule = async () => {
    const portalType = organisationTypeName;

    if (portalType) {
      try {
        setLoading(true);
        const data = await fetchModuleByPortalType(portalType);
        setModules(data);
      } catch (error) {
        toast.error("Failed to fetch modules");
        setModules([]);
      } finally {
        setLoading(false);
      }
    } else {
      setModules([]);
    }
  };

  const handleUnassignModule = async () => {
    try {
      setLoading(true);
      if (!selectedRoleModuleId) {
        toast.error("Module assignment does not exist");
        setLoading(false);
        return;
      }

      const response = await unassignModule(selectedRoleModuleId);

      if (response) {
        toast.success("Module unassigned successfully");
      }

      closeModal();
      fetchAssignedRoles();
    } catch (err: any) {
      toast.error("Failed to unassign module");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (module: AssignedModuleDto) => {
    setSelectedRoleModuleId(module.roleModuleId);
    setSelectedModuleForDelete(module);
    setModalType("delete");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRoleModuleId(null);
    setSelectedModuleForDelete(null);
  };

  return (
    <div
      className="footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      <div className="flex flex-wrap contet-inner">
        <div className="flex-auto w-full">
          <div className="relative flex flex-col mb-8  bg-white dark:bg-dark-card shadow rounded">
            <div className="flex justify-between flex-auto p-5 border-b dark:border-secondary-800 rounded">
              <h4 className="mb-0 dark:text-secondary-200">
                <Folder /> Module Management
              </h4>
            </div>
            <div className="">
              <div className="overflow-x-auto">
                <div className=" overflow-x-auto p-5">
                  <ToastContainer />

                  {/* Delete Modal */}
                  <Modal
                    isOpen={modalType === "delete"}
                    title="Unassign Module"
                    message={
                      selectedModuleForDelete ? (
                        <div className="space-y-2">
                          <p>Are you sure you want to unassign this module?</p>
                          <div className="bg-gray-50 p-3 rounded-md mt-3">
                            <p className="text-sm font-medium text-gray-700">
                              <strong>Module:</strong>{" "}
                              {selectedModuleForDelete.moduleName}
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                              <strong>Role:</strong>{" "}
                              {selectedModuleForDelete.roleName}
                            </p>
                          </div>
                          <p className="text-red-600 text-sm mt-2">
                            This action cannot be undone.
                          </p>
                        </div>
                      ) : (
                        "Are you sure you want to unassign this module?"
                      )
                    }
                    confirmText="Unassign Module"
                    confirmColor="red"
                    loading={loading}
                    headerIcon={<Folder />}
                    butonIcon={<Trash2Icon />}
                    onConfirm={handleUnassignModule}
                    onCancel={closeModal}
                  />

                  <div className="hidden flex justify-end mb-2">
                    <div className="flex justify-center gap-2 mb-4"></div>
                  </div>

                  <div>
                    <h5>Assign Module to Role</h5>
                  </div>

                  <div>
                    <div className="mt-4">
                      <label className="hidden text-md text-black py-3">
                        Select a module
                      </label>
                      <select
                        value={selectedModuleId || ""}
                        onChange={(e) =>
                          setSelectedModuleId(Number(e.target.value))
                        }
                        disabled={modules.length === 0}
                        className="form-control text-black text-sm mt-2"
                      >
                        <option value="">Select a module</option>
                        {modules.map((mod) => (
                          <option key={mod.moduleId} value={mod.moduleId}>
                            {mod.moduleName}
                          </option>
                        ))}
                      </select>
                      {selectedPortalType &&
                        modules.length === 0 &&
                        !loading && (
                          <p className="text-sm text-gray-500 mt-1">
                            No modules found for this portal type
                          </p>
                        )}
                    </div>

                    <div className="mt-4">
                      <label className="hidden text-md text-black py-3">
                        Select a Role
                      </label>
                      <select
                        value={selectedRoleId || ""}
                        onChange={(e) =>
                          setSelectedRoleId(Number(e.target.value))
                        }
                        className="form-control text-black text-sm mt-2"
                      >
                        <option value="">Select Roles</option>
                        {roles.map((role) => (
                          <option key={role.roleId} value={role.roleId}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end mt-5">
                      <button
                        className="btn btn-success"
                        onClick={() => handleAssignModule()}
                      >
                        <FolderPlus /> Assign Module to Role
                      </button>
                    </div>

                    <div className="mt-8">
                      {loading ? (
                        <div
                          className="loading flex items-center justify-center gap-3 text-center mt-8"
                          aria-label="Loading Modules"
                          role="status"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 44 44"
                            stroke="currentColor"
                            aria-label="Loading"
                          >
                            <g fill="none" fillRule="evenodd" strokeWidth="4">
                              <circle
                                cx="22"
                                cy="22"
                                r="9"
                                strokeOpacity="0.2"
                              />
                              <path
                                d="M22 3 A19 19 0 0 1 41 22"
                                stroke="currentColor"
                                strokeLinecap="round"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="rotate"
                                  from="0 22 22"
                                  to="360 22 22"
                                  dur="1s"
                                  repeatCount="indefinite"
                                />
                              </path>
                            </g>
                          </svg>
                          <span className="text-gray-700">
                            Loading modules...
                          </span>
                        </div>
                      ) : error ? (
                        <div className="error flex justify-center text-center py-8">
                          <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                            Error: {error}
                          </div>
                        </div>
                      ) : !assignedModules || assignedModules.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="inline-block bg-gray-50 p-6 rounded-lg">
                            <Folder
                              className="mx-auto mb-3 text-gray-400"
                              size={48}
                            />
                            <p className="text-gray-600 font-medium">
                              No modules have been assigned.
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                              Assign modules to roles to see them here.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="px-6 py-4 border-b border-gray-200">
                            <h6 className="font-semibold text-md text-black">
                              Assigned Modules
                            </h6>
                            <p className="text-sm text-gray-500 mt-1">
                              Showing {assignedModules.length} assigned module
                              {assignedModules.length !== 1 ? "s" : ""}
                            </p>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
                                  >
                                    Module
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
                                  >
                                    Assigned Role
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
                                  >
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {assignedModules.map((mod) => (
                                  <tr
                                    key={mod.roleModuleId}
                                    className="hover:bg-gray-50 transition-colors"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                          <Folder className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                          <div className="text-md font-medium text-gray-900">
                                            {mod.moduleName}
                                          </div>
                                          <div className="text-md text-black">
                                            ID: {mod.moduleId}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">
                                        {mod.roleName || "Unassigned"}
                                      </div>
                                      <div className="text-sm text-black">
                                        {mod.roleId
                                          ? `Role ID: ${mod.roleId}`
                                          : "No role assigned"}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                      <button
                                        onClick={() => openDeleteModal(mod)}
                                        className="btn-sm btn-danger rounded-md"
                                      >
                                        <Trash2 size={17} /> Unassign
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {assignedModules.length > 10 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                  Showing 1 to 10 of {assignedModules.length}{" "}
                                  results
                                </div>
                                <div className="flex space-x-2">
                                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    Previous
                                  </button>
                                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    Next
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {!loading && !error && roles.length === 0 && (
                        <div className="mt-8 text-center py-8">
                          <div className="inline-block bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                            <p className="text-yellow-700 font-medium">
                              No roles found
                            </p>
                            <p className="text-yellow-600 text-sm mt-1">
                              Please create roles before assigning modules.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortalModules;
