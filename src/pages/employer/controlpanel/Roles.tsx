import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CheckCheck, Shield, User, X } from "lucide-react";
import type { RolesDto } from "../../../types/roles";
import Modal from "../../../utils/modal";
import { getAllRoles } from "../../../utils/Requests/roleApi";
import { useAuth } from "../../../utils/useAuth";
import {
  assignApplicantsRole,
  fetchAllApplicants,
  fetchApplicantsByRoleId,
} from "../../../utils/Requests/userApi";

type ModalType = "add" | "edit" | "delete" | null;

export interface EmployeesDto {
  userId: number;
  firstName: string;
  lastName: string;
  role: string;
  roleId: number;
}

function Roles() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<EmployeesDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedRoleInfo, setSelectedRoleInfo] = useState<EmployeesDto[]>([]);

  const [roles, setRoles] = useState<RolesDto[]>([]);

  const { user } = useAuth();
  const organisationId = user?.organisationId;

  useEffect(() => {
    fetchRoles();
    fetchEmployees();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await getAllRoles();
      setRoles(data);
    } catch (err: any) {
      setError("Failed to fetch Roles");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await fetchAllApplicants();
      setEmployees(data.data.users);
    } catch (err: any) {
      setError("Failed to fetch Permissions");
    } finally {
      setLoading(false);
    }
  };

  // Toast messages
  const notifySuccess = () => toast.success("Action successful");
  const notifyError = () => toast.error("Action Failed");

  // Call modals
  const openAddModal = () => {
    // setSelectedRole(null);
    setModalType("add");
  };

  const openDeleteModal = (roleId: number, userId: number) => {
    setSelectedRoleId(roleId);
    setSelectedUserId(userId);
    setModalType("delete");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRoleId(null);
    setSelectedUserId(null);
  };

  const handleAssignRole = async (employeeId?: string, roleId?: string) => {
    try {
      setLoading(true);

      if (!employeeId || !roleId) {
        toast.error("Please select both employee and role");
        setLoading(false);
        return;
      }

      const payload = {
        userId: Number(employeeId),
        roleId: Number(roleId),
        organisationId: Number(organisationId),
      };

      await assignApplicantsRole(payload);

      notifySuccess();
      closeModal();
      fetchRoles();
    } catch (err: any) {
      notifyError();
    } finally {
      setLoading(false);
    }
  };

  const handleUnassignRole = async () => {
    try {
      setLoading(true);

      if (!selectedRoleId || !selectedUserId) {
        toast.error("Selected item is invalid");
        setLoading(false);
        return;
      }

      const payload = {
        userId: Number(selectedUserId),
        roleId: Number(selectedRoleId),
        organisationId: Number(organisationId),
      };

      const reassignRole = await assignApplicantsRole(payload);

      if (!reassignRole) {
        toast.error("Failed to unassign role");
        setLoading(false);
        return;
      }

      await fetchRoles();
      await fetchEmployees();
      notifySuccess();
      closeModal();
      fetchRoles();
    } catch (err: any) {
      notifyError();
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (roleId?: number) => {
    setSelectedRoleId(Number(roleId));

    if (roleId) {
      setLoading(true);
      try {
        const data = await fetchApplicantsByRoleId(
          Number(organisationId),
          roleId,
        );
        setSelectedRoleInfo(data.data.users);
        console.log("assiged user: ", data.data.users);
      } catch (error) {
        console.error("Error fetching role info:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedRoleInfo([]);
    }
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
                <Shield /> Roles Management
              </h4>
            </div>
            <div className="py-2 px-3">
              <div className="overflow-x-auto">
                <div className=" overflow-x-auto p-5">
                  <ToastContainer />
                  <Modal
                    isOpen={modalType === "add"}
                    title="Assign Role to Employee"
                    message=""
                    confirmText="Assign"
                    confirmColor="green"
                    dropdownLabel="Select an employee"
                    dropdownPlaceholder="Select an employee"
                    dropdownOptions={employees.map((emp) => ({
                      value: emp.userId,
                      label: `${emp.firstName} ${emp.lastName}`,
                    }))}
                    dropdownLabel2="Select a role"
                    dropdownPlaceholder2="Select a role"
                    dropdownOptions2={roles.map((role) => ({
                      value: role.roleId,
                      label: role.name,
                    }))}
                    loading={loading}
                    headerIcon={<Shield />}
                    butonIcon={<CheckCheck />}
                    onConfirm={({
                      dropdownValue,
                      dropdownValue2,
                    }: {
                      dropdownValue?: string;
                      dropdownValue2?: string;
                    }) => handleAssignRole(dropdownValue, dropdownValue2)}
                    onCancel={closeModal}
                  />

                  <Modal
                    isOpen={modalType === "delete"}
                    title="Unassign Role"
                    message="Are you sure you want to unassign this role?"
                    confirmText="Unassign Role"
                    confirmColor="red"
                    loading={loading}
                    headerIcon={<Shield />}
                    butonIcon={<X />}
                    onConfirm={handleUnassignRole}
                    onCancel={closeModal}
                  />

                  <Modal
                    isOpen={modalType === "edit"}
                    title="Edit Role"
                    message=""
                    confirmText="Confirm Changes"
                    confirmColor="yellow"
                    loading={loading}
                    dropdownLabel="Select an employee"
                    dropdownPlaceholder="Select an employee"
                    dropdownOptions={employees.map((emp) => ({
                      value: emp.userId,
                      label: `${emp.firstName} ${emp.lastName}`,
                    }))}
                    dropdownLabel2="Select a role"
                    dropdownPlaceholder2="Select a role"
                    dropdownOptions2={roles.map((role) => ({
                      value: role.roleId,
                      label: role.name,
                    }))}
                    headerIcon={<Shield />}
                    butonIcon={<CheckCheck />}
                    onConfirm={({
                      dropdownValue,
                      dropdownValue2,
                    }: {
                      dropdownValue?: string;
                      dropdownValue2?: string;
                    }) => handleAssignRole(dropdownValue, dropdownValue2)}
                    onCancel={closeModal}
                  />

                  <div className="flex justify-end mb-2">
                    <div className="flex justify-center gap-2 mb-4">
                      <button
                        className="btn btn-success"
                        onClick={() => openAddModal()}
                      >
                        <User /> Assign User to Role
                      </button>
                    </div>
                  </div>

                  <div>
                    <div>
                      <label className="text-md text-black py-3">
                        Select a role to view people assigned
                      </label>
                      <select
                        value={selectedRoleId || ""}
                        onChange={(e) =>
                          handleRoleChange(Number(e.target.value))
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

                    <div className="mt-5">
                      {!loading &&
                      !error &&
                      (!selectedRoleInfo || selectedRoleInfo.length === 0) ? (
                        <p className="text-md text-black text-center py-4">
                          No employees found for this role.
                        </p>
                      ) : (
                        <div>
                          <h6>All Users</h6>
                          <ul className="space-y-3">
                            {selectedRoleInfo.map((role) => (
                              <li
                                key={role.userId}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                              >
                                <a>
                                  {role.firstName} {role.lastName} ({role.role})
                                </a>
                                <div>
                                  {role.role !== "Applicant" && (
                                    <button
                                      className="btn btn-danger btn-sm mr-1"
                                      type="button"
                                      onClick={() =>
                                        openDeleteModal(5, role.userId)
                                      }
                                    >
                                      {" "}
                                      <span className="btn-inner">
                                        <X /> Unassign
                                      </span>
                                    </button>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {loading && (
                        <div
                          className="loading flex items-center justify-center gap-3 text-center mt-8"
                          aria-label="Loading Roles"
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
                          <span className="text-gray-700">Please Wait... </span>
                        </div>
                      )}
                      {error && (
                        <div className="error flex justify-center text-center mt-[25%]">
                          Error: {error}
                        </div>
                      )}
                      {!loading && !error && roles.length === 0 && (
                        <div className="no-roles flex justify-center text-center mt-[25%]">
                          No Roles found.
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

export default Roles;
