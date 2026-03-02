import { useEffect, useState } from "react";
import {
  Search,
  ChevronRightIcon,
  Eye,
  ClipboardList,
  ShieldCheck,
  CheckCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { fetchDbsChecks } from "../../../utils/Requests/DbsRequests";
import { useForm, useWatch } from "react-hook-form";
import Hashids from "hashids";
import Tippy from "@tippyjs/react";
import { useAuth } from "../../../utils/useAuth";
import Modal from "../../../utils/modal";
import { toast, ToastContainer } from "react-toastify";
import { getDBSCertificateByCertificateCode } from "../../../utils/Requests/DbsRequestActions";

type ModalType = "add" | "edit" | "delete" | null;

interface DbsChecks {
  dbsApplicationId: number;
  userId: number;
  requestedById: number;
  dbsTypeId: number;
  status: number;
  statusName: string;
  submittedAt: string;
  completedAt: string;
  dateCreated: string;
  userFirstName: string;
  userLastName: string;
  organisationName: string;
  requestedBy: string;
  staffInChargeId: number;
  staffInChargeFirstName: string;
  staffInChargeLastName: string;
  adminId: number;
  adminFirstName: string;
  adminLastName: string;
  dbsType: string;
  dbsTypeCost: number;
}

type FilterForm = {
  UserName: string;
  OrganisationName: string;
  Status: number;
  Type: number;
};

export interface DBSStatus {
  statusId: number;
  statusName: string;
}

export interface DBSTypes {
  dbsTypeId: number;
  typeName: string;
  typeCost: number;
  description: string;
}

const statusStyles: Record<number, string> = {
  1: "bg-orange-200/50",
  2: "bg-blue-200/50",
  3: "bg-purple-200/50",
  4: "bg-green-200/50",
  5: "bg-red-200/50",
};

const statusTextStyles: Record<number, string> = {
  1: "text-orange-500",
  2: "text-blue-500",
  3: "text-purple-500",
  4: "text-green-500",
  5: "text-red-500",
};

export default function DBSTrackerModule() {
  const [dbsChecks1, setDbsChecks1] = useState<DbsChecks[]>([]);
  const [modalType, setModalType] = useState<ModalType>(null);
  // const [dbsStatus, setDbsStatus] = useState<DBSStatus[]>([]);
  // const [dbsType, setDbsType] = useState<DBSTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dbsPage, setDbsPage] = useState(1);
  const dbsLimit = 5;
  const [totalDbsChecks, setTotalDbsChecks] = useState(0);
  const colors = [
    "#5d009bff",
    "#ff8800ff",
    "#ff0000",
    "#003000ff",
    "#00006dff",
  ];
  const { register, control } = useForm<FilterForm>();
  const filters = useWatch({ control });
  const hashIds = new Hashids("ClearTrustAfricaEncode", 10);

  const { user } = useAuth();
  const organisationId = user?.organisationId;
  const organisationType = user?.organisationType;

  useEffect(() => {
    fetchDbsChecks({
      pageNumber: dbsPage,
      limit: dbsLimit,
      ...filters,
      OrganisationId: organisationId,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log("dbs checks data", data);
            setDbsChecks1(data.data.checks);
            setTotalDbsChecks(data.data.totalCount);
          });
        } else {
          res.text().then((data) => {
            console.log(JSON.parse(data));
          });
        }
      })
      .catch((err) => console.log(err));
  }, [dbsPage, dbsLimit, filters, organisationId]);

  // Call modals
  const openAddModal = () => {
    setModalType("add");
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleFindCheck = (inputValue?: string) => {
    console.log("Finding check for:", inputValue);

    if (!inputValue || inputValue === "") {
      toast.error("Please provide valid input to search");
      return;
    }

    const certificate = getDBSCertificateByCertificateCode(inputValue);

    if (!certificate) {
      toast.error("No CT Check found for the provided details");
      return;
    }
  };

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      <ToastContainer />
      <Modal
        isOpen={modalType === "add"}
        title="Verify User CT Check"
        message=""
        confirmText="Confirm"
        confirmColor="green"
        loading={isLoading}
        inputLabel="Enter the certificate number"
        inputPlaceholder="Enter details here ..."
        headerIcon={<ShieldCheck />}
        butonIcon={<CheckCheck />}
        onConfirm={({ inputValue }: { inputValue?: string }) =>
          handleFindCheck(inputValue)
        }
        onCancel={closeModal}
      />

      {/* Header */}
      <div className="mb-6">
        <div className="w-full mb-8">
          <div className="row">
            <div className="col-md-12">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex">
                  <ClipboardList className="text-blue-600 mr-2" size={36} />
                  <div>
                    <h3 className="mb-0 text-black">CT Tracker & Compliance</h3>
                    <p className="text-secondary-600 text-black">
                      <NavLink to="/Dashboard">Dashboard</NavLink>{" "}
                      <ChevronRightIcon size={14} />{" "}
                      <NavLink to="/Tracker">CT Tracker</NavLink>{" "}
                    </p>
                  </div>
                </div>

                <div></div>
              </div>

              {/* <div className="d-none flex justify-end mt-4">
                <button
                  onClick={() => openAddModal()}
                  className="btn btn-success"
                >
                  <ShieldCheck /> Verify CT Check
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        {/* Filters */}
        <div className=" p-5 border-b">
          <div className="hidden flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search
                  className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by applicant name..."
                  {...register("UserName")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search
                  className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by organisation name..."
                  {...register("OrganisationName")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* <select
              {...register("Status")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              {dbsStatus.map((data, index) => (
                <option value={data.statusId} key={index}>
                  {data.statusName}
                </option>
              ))}
            </select>
            <select
              {...register("Type")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {dbsType.map((data, index) => (
                <option value={data.dbsTypeId} key={index}>
                  {data.typeName}
                </option>
              ))}
            </select> */}
          </div>
          <h4 className="mb-2 sm:mb-0 text-xl font-bold">All CT Checks</h4>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="p-5">
            <div className="flex flex-wrap rounded-md justify-between overflow-x-auto">
              <table className="min-w-full divide-y rounded-md divide-secondary-200 dark:divide-secondary-800 border dark:border-secondary-800">
                <thead>
                  <tr className="bg-secondary-100 dark:bg-dark-bg">
                    <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                      S/N
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                      {" "}{organisationType === "Agent" ? "Candidates" : " Employee"}
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                      Request Type
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                      Request Date
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
                  {dbsChecks1.map((data, index) => (
                    <tr key={data.dbsApplicationId ?? index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="iq-media-group iq-media-group-1">
                          <h6 className="font-bold dark:text-white">
                            {" "}
                            #{index + dbsLimit * (dbsPage - 1) + 1}
                          </h6>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex w-50 items-center gap-3">
                          <div
                            className="h-12 w-12 border rounded-full"
                            style={{
                              backgroundColor: colors[index % 4],
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "#ffffff",
                            }}
                          >
                            {`${data.userFirstName[0]} ${data.userLastName[0]}`}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {`${data.userFirstName} ${data.userLastName}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        <p
                          className={`p-1 px-2 text-center rounded-lg ${
                            statusStyles[data.status] ?? "bg-gray-200"
                          } ${statusTextStyles[data.status] ?? "text-black"} font-bold`}
                        >
                          {data.statusName}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                        {data.dbsType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                        {new Date(data.dateCreated).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "short", year: "numeric" },
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                        <div className="flex items-center list-user-action">
                          <Tippy content="Preview Application">
                            <NavLink
                              to={`/Tracker/${hashIds.encode(String(data.dbsApplicationId))}`}
                              className="btn btn-info btn-icon btn-sm mr-1"
                            >
                              <span className="btn-inner">
                                <Eye />
                              </span>
                            </NavLink>
                          </Tippy>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {dbsChecks1.length === 0 ? (
                <div className="py-4 whitespace-nowrap w-full">
                  <span className="px-6 py-4 text-left font-medium text-black dark:text-white">
                    There hasn't been any dbs checks
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-wrap justify-between my-6 mx-5">
              <div className="flex justify-center items-center mb-1">
                <p className="text-black">
                  Showing{" "}
                  {dbsChecks1.length > 0
                    ? dbsPage * dbsLimit - dbsLimit + 1
                    : 0}{" "}
                  to{" "}
                  {dbsChecks1.length > 0
                    ? dbsPage * dbsLimit -
                      dbsLimit +
                      1 +
                      (dbsChecks1.length - 1)
                    : 0}{" "}
                  of {totalDbsChecks} entries
                </p>
              </div>
              <div className="inline-flex flex-wrap">
                {dbsPage > 1 && (
                  <a
                    href="#"
                    onClick={() => {
                      if (dbsPage > 1) {
                        setDbsPage(dbsPage - 1);
                      }
                    }}
                    className="border-t border-b border-l text-primary-500 border-secondary-500 px-2 py-1 rounded-l dark:border-secondary-800"
                  >
                    Previous
                  </a>
                )}
                <a
                  href="#"
                  className="border text-white border-secondary-500 cursor-pointer bg-primary-500 px-4 py-1 dark:border-secondary-800"
                >
                  {dbsPage}
                </a>
                {dbsPage * dbsLimit < totalDbsChecks && (
                  <a
                    href="#"
                    onClick={() => {
                      setDbsPage(dbsPage + 1);
                    }}
                    className="border-r border-t border-b text-primary-500 border-secondary-500 px-4 py-1 rounded-r dark:border-secondary-800"
                  >
                    Next
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
