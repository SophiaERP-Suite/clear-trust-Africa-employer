import {
  Building,
  Cake,
  CalendarCheck2Icon,
  CheckCheck,
  ChevronRightIcon,
  ClipboardList,
  FileIcon,
  Mail,
  MapPin,
  MessageSquareShare,
  Phone,
  Plus,
  Search,
  User,
  UserSquareIcon,
  Venus,
  X,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { fetchApplicantDocsById } from "../../../utils/Requests/EmployeeRequests.js";
import Hashids from "hashids";

import { toast, ToastContainer } from "react-toastify";
import Modal from "react-modal";
import { useForm, useWatch, Controller } from "react-hook-form";
import { handleCreateEmployee } from "../../../utils/ResponseHandlers/EmployeeResponse.js";

import Tippy from "@tippyjs/react";
import RichTextEditor from "../../../layout/RichTextEditor.js";
import HtmlRenderer from "../../../layout/HTMLRenderer.js";
import { calculateAge } from "../../../utils/extraFunctions.js";
import {
  fetchStageByApplicationAndStage,
  getDBSApplicationComment,
  fetchDbsStages,
  submitNewComment,
} from "../../../utils/Requests/DbsRequestActions.js";
import { fetchDbsCheckById } from "../../../utils/Requests/DbsRequests.js";
import { fetchApplicantDocsById } from "../../../utils/Requests/EmployeeRequests.js";

export interface DBSStagesData {
  dbsStageId: number;
  stageName: string;
  stageDescription: string;
  stageLevel: number;
  dbsTypeId: number;
  dbsTypeName: string;
  stageAdminId: number;
  stageAdminFirstName: string;
  stageAdminLastName: string;
  slaTrackerId: number;
  duration: number;
  durationUnit: number;
  dateCreated: string;
}

interface EmployeeData {
  userId: number;
  firstName: string;
  lastName: string;
  otherNames: string;
  profileImage: string;
  phone: string;
  email: string;
  identificationNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  organisationId: number;
  role: string;
  countryName: string;
  stateName: string;
  cityName: string;
  birthPlace: string;
  lastAddress: string;
  currentAddressDuration: string;
}

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
  profile: EmployeeData;
  dbsStageName: string;
  dbsStageId: number;
  dbsStageLevel: string;
  dbsStageAdminId: number;
  dbsStageAdminName: string;
}

interface UserDocumentValues {
  userDocumentId: number;
  fileUrl: string;
  userDocumentType: string;
  status: number;
  dateCreated: string;
}

interface CommentFormValues {
  Comment: string;
  To: string;
  ToId: string;
}

// interface ActivityLogData {
//   activityLogId: number;
//   action: string;
//   dbsApplicationId: number;
//   dbsStageId: number;
//   dbsStageName: string;
//   dbsStageAdminId: number;
//   staffId: number;
//   staffFistName: string;
//   status: number;
//   staffLastName: string;
//   dateCreated: string;
// }

interface CommentLogData {
  commentLogId: number;
  comment: string;
  fromId: number;
  fromFirstName: string;
  fromLastName: string;
  to: number;
  toId: string;
  toFirstName: string;
  toLastName: string;
  dbsApplicationId: number;
  dateCreated: string;
}

// interface ActivityLogForm {
//   Action: string;
// }

// interface AdminFormValues {
//   AdminId: number;
// }

// interface StaffFormValues {
//   StaffInChargeId: number;
// }

// interface CompletedStageFormValues {
//   Summary: string;
// }

// interface ApprovedStageFormValues {
//   NextStageId: number;
//   FinalStage: boolean;
// }

// interface UserData {
//   userId: number;
//   firstName: string;
//   lastName: string;
// }

interface StageStatusData {
  dbsStageStatusId: number;
  dbsStageId: number;
  dbsStageName: string;
  dbsApplicationId: number;
  status: number;
  summary: string;
  finalStage: boolean;
  dateCreated: string;
}

const statusStyles: Record<number, string> = {
  1: "bg-orange-200/50",
  2: "bg-blue-200/50",
  3: "bg-purple-200/50",
  4: "bg-green-200/50",
  5: "bg-red-200/50",
};

const stageStatusStyles: Record<number, string> = {
  1: "bg-orange-200/50",
  2: "bg-blue-200/50",
  3: "bg-green-200/50",
};

const statusTextStyles: Record<number, string> = {
  1: "text-orange-500",
  2: "text-blue-500",
  3: "text-purple-500",
  4: "text-green-500",
  5: "text-red-500",
};

const stageStatusTextStyles: Record<number, string> = {
  1: "text-orange-500",
  2: "text-blue-500",
  3: "text-green-500",
};

const stageStatusTextValues: Record<number, string> = {
  1: "In Progress",
  2: "Completed - Awaiting Approval",
  3: "Approved",
};

// type ActivityFilterForm = {
//   StaffName: string;
//   StageLevel: number;
// };

type CommentFilterForm = {
  Sender: string;
  DateCreated: string;
};

export default function TrackerDetails() {
  const { id } = useParams();
  const [dbsDetails, setDbsDetails] = useState<DbsChecks | null>(null);
  const [commentLog, setCommentLog] = useState<CommentLogData[]>([]);
  const [totalCommentLog, setTotalCommentLog] = useState(0);
  const [activityPage, setActivityPage] = useState(1);
  const activityLimit = 3;
  const [commentPage, setCommentPage] = useState(1);
  const commentLimit = 3;
  const { register: commentFilterReg, control: commentFilterControl } =
    useForm<CommentFilterForm>();
  const commentFilters = useWatch({ control: commentFilterControl });
  const hashIds = new Hashids("ClearTrustAfricaEncode", 10);
  const hashedId = id ? Number(hashIds.decode(id)[0]) : 0;
  const [userDocuments, setUserDocuments] = useState<UserDocumentValues[]>([]);
  const [currentStageStatus, setCurrentStageStatus] =
    useState<StageStatusData | null>(null);
  const userId: number = dbsDetails?.userId ? dbsDetails.userId : 0;
  const [commentModalState, setCommentModalState] = useState(false);
  const colors = [
    "#5d009bff",
    "#ff8800ff",
    "#ff0000",
    "#003000ff",
    "#00006dff",
  ];
  // const { register, handleSubmit, reset, formState } =
  //   useForm<AdminFormValues>();
  // const { errors } = formState;
  const {
    register: commentReg,
    handleSubmit: submitComment,
    reset: resetComment,
    control: commentControl,
    formState: commentForm,
    watch,
  } = useForm<CommentFormValues>();
  const { errors: commentErrors } = commentForm;
  // const [certificate, setCertificate] = useState(false);
  const selectedRecipientGroup = watch("To");

  useEffect(() => {
    fetchDbsCheckById(hashedId)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setDbsDetails(data.data.application);
            // setCertificate(data.data.certificate);
          });
        } else {
          res.text().then((data) => {
            console.log(JSON.parse(data));
          });
        }
      })
      .catch((err) => console.log(err));
  }, [hashedId]);

  useEffect(() => {
    fetchApplicantDocsById(userId)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setUserDocuments(data.data.docs);
          });
        } else {
          res.text().then((data) => {
            console.log(JSON.parse(data));
          });
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    if (dbsDetails) {
      fetchStageByApplicationAndStage(hashedId, dbsDetails.dbsStageId)
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              setCurrentStageStatus(data.data);
            });
          } else {
            res.text().then((data) => {
              console.log(JSON.parse(data));
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [hashedId, dbsDetails]);

  // const refetchDbsDetails = async () => {
  //   const res = await fetchDbsCheckById(hashedId);
  //   if (res.status === 200) {
  //     const data = await res.json();
  //     setDbsDetails(data.data);
  //     setCertificate(data.data.certificate);
  //   } else {
  //     const resText = await res.text();
  //     console.log(JSON.parse(resText));
  //   }
  // };

  const refetchComments = async () => {
    const res = await getDBSApplicationComment(hashedId, {
      pageNumber: commentPage,
      limit: commentLimit,
      ...commentFilters,
    });
    if (res.status === 200) {
      const data = await res.json();
      setTotalCommentLog(data.data.totalCount);
      setCommentLog(data.data.comments);
    } else {
      const resText = await res.text();
      console.log(JSON.parse(resText));
    }
  };

  useEffect(() => {
    getDBSApplicationComment(hashedId, {
      pageNumber: commentPage,
      limit: commentLimit,
      ...commentFilters,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setTotalCommentLog(data.data.totalCount);
          setCommentLog(data.data.comments);
        });
      } else {
        res.text().then((data) => {
          console.log(JSON.parse(data));
        });
      }
    });
  }, [hashedId, commentPage, commentLimit, commentFilters]);

  useEffect(() => {
    // setDbsStages([]);
    fetchDbsStages({
      PageNumber: 1,
      Limit: 20,
      DBSTypeId: dbsDetails?.dbsTypeId,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          // setDbsStages(data.data.stages);
          return data
        });
      } else {
        res.text().then((data) => {
          console.log(JSON.parse(data));
        });
      }
    });
  }, [dbsDetails]);

  const splitFile = (fileUrl: string) => {
    const splits = fileUrl.split("/");
    if (splits.length > 0) {
      return splits[splits.length - 1];
    }
    return "UploadedFile";
  };

  // const generateCertificate = async () => {
  //   setOpenMoreAction(!openMoreAction);
  //   toast.success("Your Certificate is being generated");
  //   const res = await generateNewDBSCertificate(hashedId);
  //   handleCreateEmployee(res, null, null, { toast }, null).finally(async () => {
  //     await refetchDbsDetails();
  //   });
  // };

  const logComment = async (data: CommentFormValues) => {
    if (!commentErrors.Comment && !commentErrors.ToId && !commentErrors.To) {
      const loader = document.getElementById("query-loader-6");
      const text = document.getElementById("query-text-6");
      if (loader) {
        loader.style.display = "flex";
      }
      if (text) {
        text.style.display = "none";
      }
      const formData = new FormData();
      formData.append("Comment", data.Comment);
      formData.append("To", data.To);
      if (selectedRecipientGroup == "5") {
        formData.append("ToId", data.ToId);
      }
      const res = await submitNewComment(formData, hashedId);
      handleCreateEmployee(res, loader, text, { toast }, resetComment).finally(
        async () => {
          setCommentModalState(false);
          refetchComments();
        },
      );
    }
  };

  return (
    <>
      <ToastContainer />

      <Modal
        isOpen={commentModalState}
        onRequestClose={() => {
          setCommentModalState(false);
        }}
        style={{
          content: {
            width: "fit-content",
            height: "fit-content",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgb(255 255 255)",
            borderRadius: "0.5rem",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          },
        }}
      >
        <div className="h-fit max-h-[70vh] overflow-y-auto  w-70 md:w-100">
          <div className="flex justify-start">
            <p className="font-semibold text-black py-1 text-lg">
              <MessageSquareShare size={20} className="mr-2" /> Add New Comment
            </p>
          </div>
          <form onSubmit={submitComment(logComment)} noValidate>
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 mt-2">
              <div>
                <label
                  className="inline-block mb-2 text-secondary-600 dark:text-white"
                  htmlFor="email"
                >
                  Select Recipient Group
                </label>
                <div>
                  <select
                    className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    {...commentReg("To", {
                      required: "Required",
                      pattern: {
                        value: /^(?!default$).+$/,
                        message: "Required",
                      },
                    })}
                  >
                    <option value="default">Select Recipient Group</option>
                    <option value="1">CTA Organization</option>
                  </select>
                  <p className="error-msg">{commentErrors.To?.message}</p>
                </div>
              </div>
              <div>
                <label
                  className="inline-block mb-2 text-secondary-600 dark:text-white"
                  htmlFor="email"
                >
                  Comment
                </label>
                <div>
                  <Controller
                    name="Comment"
                    control={commentControl}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <p className="error-msg">{commentErrors.Comment?.message}</p>
                </div>
              </div>
            </div>
            <hr className="mt-5" />
            <div className="flex justify-end my-2 gap-2">
              <button
                className="btn text-white bg-black"
                onClick={() => setCommentModalState(false)}
              >
                <X size={18} className="mr-2" />
                Cancel
              </button>
              <button className="btn btn-success">
                <div className="dots hidden" id="query-loader-6">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span id="query-text-6">
                  <CheckCheck size={18} className="mr-2" />
                  Log Comment
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="p-6 lg:p-8 footer-inner mx-auto main-container container">
        <div className="flex flex-wrap mb-8 items-center justify-between">
          <div className="flex">
            <ClipboardList className="text-blue-600 mr-2" size={36} />
            <div>
              <h3 className="mb-0 text-black">Application Details</h3>
              <p className="text-secondary-600 text-black">
                <NavLink to="/Dashboard">Dashboard</NavLink>{" "}
                <ChevronRightIcon size={14} />{" "}
                <NavLink to="/Tracker">CTA Tracker</NavLink>{" "}
                <ChevronRightIcon size={14} />{" "}
                <NavLink to={`/Tracker/${id}`}>CTA Details</NavLink>{" "}
              </p>
            </div>
          </div>

          {dbsDetails && (
            <div className="flex flex-wrap">
              <div>
                <Tippy content="Current Application Status">
                  <p
                    className={`btn mr-2 mb-2 ${statusStyles[dbsDetails.status]} ${statusTextStyles[dbsDetails.status]} font-bold`}
                    style={{ cursor: "auto" }}
                  >
                    {dbsDetails.statusName}
                  </p>
                </Tippy>
              </div>
              <div>
                <Tippy content="Current Stage Status">
                  <p
                    className={`btn mr-2 mb-2 ${currentStageStatus ? stageStatusStyles[currentStageStatus.status] : stageStatusStyles[1]} ${currentStageStatus ? stageStatusTextStyles[currentStageStatus.status] : stageStatusTextStyles[1]} font-bold`}
                    style={{ cursor: "auto" }}
                  >
                    {currentStageStatus
                      ? stageStatusTextValues[currentStageStatus.status]
                      : "In Progress"}
                  </p>
                </Tippy>
              </div>
            </div>
          )}
        </div>
        {dbsDetails && (
          <div className="flex flex-wrap contet-inner" x-data="{ openTab: 1 }">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
              <div className="col lg:col-span-1">
                <div x-show="openTab === 4">
                  <div className="h-fit overflow-y-auto relative flex flex-col mb-8  bg-white shadow rounded-xl dark:bg-dark-card">
                    <div className="bg-[#7016d0] p-5 border-b dark:border-secondary-800 dark:border-secondary-800">
                      <div className="lg:mb-0 profile-logo profile-logo1 flex justify-center">
                        <img
                          src={dbsDetails?.profile.profileImage}
                          className="w-24 h-24 border-4 border-white mb-3 rounded-full mr-4"
                          style={{ objectFit: "cover" }}
                          alt="profile-image"
                        />
                      </div>
                      <h4 className="card-title mb-2 text-white text-center">
                        {`${dbsDetails?.profile.firstName} ${dbsDetails?.profile.lastName}`}
                      </h4>
                      <h4 className="card-title mb-0 text-white text-center">
                        ID: {dbsDetails.profile.identificationNumber}
                      </h4>
                      <h4 className="card-title mb-0 text-white text-center">
                        {`${dbsDetails.dbsType} Check`}
                      </h4>
                    </div>
                    <div className="p-6">
                      <div className="border-b dark:border-secondary-800 dark:border-secondary-800 flex items-center pb-1">
                        <User size={30} className="mr-2" />
                        <h4 className="card-title mb-0 dark:text-white font-bold">
                          Applicant Details
                        </h4>
                      </div>
                      <div className="mt-2 py-1 text-sm flex justify-start items-center">
                        <Mail size={20} className="mr-2" />
                        {dbsDetails.profile.email}
                      </div>
                      <div className="mt-2 py-1 text-sm flex justify-start items-center">
                        <Phone size={20} className="mr-2" />
                        {dbsDetails.profile.phone}
                      </div>
                      <div className="mt-2 py-1 text-sm flex justify-start items-center">
                        <Venus size={20} className="mr-2" />
                        {dbsDetails.profile.gender}
                      </div>
                      <div className="mt-2 py-1 text-sm flex justify-start items-center">
                        <Cake size={20} className="mr-2" />
                        {new Date(
                          dbsDetails.profile.dateOfBirth,
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                        {`  (${calculateAge(new Date(dbsDetails.profile.dateOfBirth))})`}
                      </div>
                      <div className="mt-2 py-1 text-sm flex justify-start items-center">
                        <MapPin size={20} className="mr-2" />
                        {dbsDetails.profile.address}
                      </div>
                      <div className="mt-5 border-b dark:border-secondary-800 dark:border-secondary-800 flex items-center pb-1">
                        <UserSquareIcon size={30} className="mr-2" />
                        <h4 className="card-title mb-0 dark:text-white font-bold">
                          Employer Details
                        </h4>
                      </div>
                      <div className="mt-2 py-1 text-sm flex justify-start items-center">
                        <User size={20} className="mr-2" />
                        {dbsDetails.requestedBy}
                      </div>
                      <div className="mt-2 py-1 text-sm flex justify-start items-center">
                        <Building size={20} className="mr-2" />
                        {dbsDetails.organisationName}
                      </div>
                      <div className="mt-2 py-1 text-sm flex justify-start items-center">
                        <CalendarCheck2Icon size={20} className="mr-2" />
                        {new Date(dbsDetails.dateCreated).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "long", year: "numeric" },
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col lg:col-span-2">
                <div x-show="openTab === 4">
                  <div className="relative flex flex-col mb-8 bg-white shadow rounded-xl dark:bg-dark-card">
                    <div className="p-5 border-b dark:border-secondary-800 dark:border-secondary-800 flex flex-wrap justify-between items-center">
                      <div className="flex items-center">
                        <MessageSquareShare size={30} className="mr-2" />
                        <h4 className="card-title mb-0 dark:text-white font-bold">
                          Comments
                        </h4>
                      </div>

                      <button
                        className="btn btn-success mr-2 mb-2"
                        onClick={() => setCommentModalState(true)}
                      >
                        <Plus size={18} className="mr-2" />
                        Add New Comment
                      </button>
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[330px]">
                          <div className="relative">
                            <Search
                              className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400"
                              size={20}
                            />
                            <input
                              type="text"
                              placeholder="Search by sender name..."
                              {...commentFilterReg("Sender")}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="relative">
                            <input
                              type="date"
                              {...commentFilterReg("DateCreated")}
                              className="w-full pl-2 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap justify-between overflow-x-auto h-fit">
                        <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-800 border dark:border-secondary-800">
                          <thead>
                            <tr className="bg-secondary-100 dark:bg-dark-bg">
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                S/N
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Sender
                              </th>
                              <th className="px-6 py-4 text-left font-medium text-black dark:text-white">
                                Comment
                              </th>
                            </tr>
                          </thead>
                          {commentLog.map((data, index) => (
                            <tr key={data.commentLogId ?? index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="iq-media-group iq-media-group-1">
                                  <h6 className="font-bold dark:text-white">
                                    {" "}
                                    #
                                    {index +
                                      activityLimit * (activityPage - 1) +
                                      1}
                                  </h6>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
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
                                    {`${data.fromFirstName[0]} ${data.fromLastName[0]}`}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      {`${data.fromFirstName} ${data.fromLastName}`}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                                <p>
                                  <HtmlRenderer html={data.comment} />
                                </p>
                                <span className="text-xs">
                                  Date:{" "}
                                  {new Date(
                                    data.dateCreated,
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </table>
                        {commentLog.length === 0 && (
                          <div className="py-4 whitespace-nowrap w-full">
                            <span className="px-6 py-4 text-left font-medium text-black dark:text-white">
                              There hasn't been any comment added for this
                              application
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap justify-between mt-6">
                        <div className="flex justify-center items-center mb-1">
                          <p className="text-black">
                            Showing{" "}
                            {commentLog.length > 0
                              ? commentPage * commentLimit - commentLimit + 1
                              : 0}{" "}
                            to{" "}
                            {commentLog.length > 0
                              ? commentPage * commentLimit -
                                commentLimit +
                                1 +
                                (commentLog.length - 1)
                              : 0}{" "}
                            of {totalCommentLog} entries
                          </p>
                        </div>
                        <div className="inline-flex flex-wrap">
                          {commentPage > 1 && (
                            <a
                              href="#"
                              onClick={() => {
                                if (commentPage > 1) {
                                  setCommentPage(commentPage - 1);
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
                            {commentPage}
                          </a>
                          {commentPage * activityLimit < totalCommentLog && (
                            <a
                              href="#"
                              onClick={() => {
                                setCommentPage(commentPage + 1);
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

                <div x-show="openTab === 4">
                  <div className="relative flex flex-col mb-8  bg-white shadow rounded-xl dark:bg-dark-card">
                    <div className="p-5 border-b dark:border-secondary-800 dark:border-secondary-800 flex items-center">
                      <FileIcon size={30} className="mr-2" />
                      <h4 className="card-title mb-0 dark:text-white font-bold">
                        Applicant Documents {`(${userDocuments.length})`}
                      </h4>
                    </div>
                    <div className="overflow-y-auto p-5">
                      {userDocuments.length === 0 && (
                        <div className="py-4 whitespace-nowrap">
                          <span className="py-4 text-left font-medium text-black dark:text-white text-wrap">
                            There are no uploaded document for{" "}
                            {dbsDetails.profile.firstName}
                          </span>
                        </div>
                      )}
                      {userDocuments.length > 0 &&
                        userDocuments.map((data: UserDocumentValues, index) => (
                          <div
                            className="p-2 border-2 rounded-xl mb-4"
                            key={index}
                            style={{ borderColor: "#7016d0" }}
                          >
                            <div className="flex justify-between items-center">
                              <a
                                className="mb-1 dark:text-white flex items-center gap-3 font-bold"
                                href={data.fileUrl}
                                target="_blank"
                              >
                                {Number(data.userDocumentType) === 1 &&
                                  "International Passport"}
                                {Number(data.userDocumentType) === 2 &&
                                  "Identification Document"}
                                {Number(data.userDocumentType) === 3 &&
                                  "Police Certificate"}{" "}
                              </a>
                              {Number(data.status) === 1 && (
                                <p className="w-15 text-sm font-light p-1 bg-orange-200 text-center rounded-lg">
                                  Pending
                                </p>
                              )}
                              {Number(data.status) === 2 && (
                                <p className="w-15 text-sm font-light p-1 bg-green-200 text-center rounded-lg">
                                  Verified
                                </p>
                              )}
                              {Number(data.status) === 3 && (
                                <p className="w-15 text-sm font-light p-1 bg-red-200 text-center rounded-lg">
                                  Rejected
                                </p>
                              )}
                            </div>
                            <div className="my-2">
                              <a
                                className="underline decoration-solid text-blue mr-2"
                                href={data.fileUrl}
                                target="_blank"
                              >
                                {splitFile(data.fileUrl)}
                              </a>
                            </div>
                            <p className="mb-1 dark:text-secondary-600 text-sm">
                              <span>
                                Uploaded On -{" "}
                                {new Date(data.dateCreated).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </p>
                            {Number(data.status) === 1 &&
                              dbsDetails.status != 4 && (
                                <div className="flex justify-end items-center gap-3 my-1">
                                  {/* <Tippy content="Mark As Rejected">
                                    <button
                                      className="btn text-white btn-danger py-1 px-2"
                                      // onClick={() =>
                                      //   docStatusUpdate(3, data.userDocumentId)
                                      // }
                                    >
                                      <X size={18} />
                                    </button>
                                  </Tippy>
                                  <Tippy content="Mark As Verified">
                                    <button
                                      className="btn btn-success py-1 px-2"
                                      // onClick={() =>
                                      //   docStatusUpdate(2, data.userDocumentId)
                                      // }
                                    >
                                      <CheckCheck size={18} />
                                    </button>
                                  </Tippy> */}
                                </div>
                              )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
