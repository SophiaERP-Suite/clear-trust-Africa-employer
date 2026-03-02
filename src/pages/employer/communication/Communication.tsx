import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Bell,
  Send,
  AlertCircle,
  Plus,
  ChevronRightIcon,
  Pen,
  SendHorizonal,
  AlarmCheckIcon,
} from "lucide-react";
import type { EmployeesDto } from "../controlPanel/Roles";
import Modal from "../../../utils/modal";
import {
  createConversation,
  createMessage,
  getConversations,
  getMessages,
} from "../../../utils/Requests/MessagingRequest";
import { useAuth } from "../../../utils/useAuth";
import { toast } from "react-toastify";
import Loading from "../../../utils/Loading";
import { formatMessageTime } from "../../../utils/dateUtils";
import {
  getNotifications,
  readNotifications,
} from "../../../utils/Requests/NotificationRequest";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchAllApplicants } from "../../../utils/Requests/userApi";

type ModalType = "add" | "edit" | "delete" | null;

interface ConversationDto {
  conversationId: number;
  subject: string;
  createdBy: string;
  sentTo: string;
  lastMessage: string;
  lastMessageDate: string;
}

interface MessageDto {
  messageId: number;
  senderId: number;
  senderName: string;
  messageBody: string;
  dateCreated: string;
}

interface NotificationDto {
  title: string;
  icon: string;
  isRead: boolean;
  message: string;
  actionUrl: string;
  notificationId: number;
  notificationType: string;
  dateCreated: string;
}

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  // const [selectedRoute, setSelectedRoute] = useState("institution");
  const [employees, setEmployees] = useState<EmployeesDto[]>([]);
  const [allConversations, setAllConversations] = useState<ConversationDto[]>(
    [],
  );
  const [notifications, setNotifications] = useState<NotificationDto[]>();
  const [notificationCount, setNotificationCount] = useState<number | null>(0);
  const [selectedConversation, setSelectedConversations] = useState<
    number | null
  >(null);
  const [allMessages, setAllMessages] = useState<MessageDto[]>([]);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const organisationId = user?.organisationId;
  const currentUserId = user?.userId;

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    fetchConversations();
    const intervalId = setInterval(() => {
      refetchMessages;
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchConversations = async () => {
    try {
      const data = await getConversations(Number(organisationId));
      setAllConversations(data);
    } catch (err: any) {
      setError("Failed to fetchconversations");
    } finally {
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await fetchAllApplicants();
      setEmployees(data.data.users);
    } catch (err: any) {
      setError("Failed to fetch users");
    } finally {
    }
  };

  const handleSelectConversation = async (conversationId: number) => {
    try {
      setLoading(true);
      setError(null);

      setSelectedConversations(conversationId);

      const response = await getMessages(conversationId);

      if (!response || response.length === 0) {
        setAllMessages([]);
        setError("There are no messages for this conversation");
        return;
      }

      setSelectedChat(conversationId);
      setAllMessages(response);
    } catch (err: any) {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchNotifications = async () => {
    const userNotifications = await getNotifications(0);
    if (!userNotifications) {
      return;
    }

    setNotifications(userNotifications);
    setNotificationCount(userNotifications.length);
    console.log("userNotifications", userNotifications);
  };

  const handleReadNotification = async (
    notificationId: number,
    actionUrl: string,
  ) => {
    const readNotification = await readNotifications(notificationId);

    if (!readNotification) {
      toast.error("Could not mark notification as read");
      return;
    }

    navigate(`../${actionUrl}`);
  };

  const openAddModal = () => {
    setModalType("add");
  };

  const closeModal = () => {
    setModalType(null);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const handleSendMessage = async () => {
    try {
      const messagePayload = {
        messageBody: messageInput || " ",
        conversationId: Number(selectedConversation) || 0,
      };
      const newConversation = createMessage(messagePayload);

      if (!newConversation) {
        toast.error("Could not send message");
        return;
      } else {
        // toast.success("Message sent");
        setModalType(null);
        setMessageInput("");
      }
      const newMessage: MessageDto = {
        messageId: allMessages[allMessages.length - 1].messageId,
        senderId: currentUserId ?? 0,
        senderName: `${user?.firstName} ${user?.lastName}`,
        messageBody: messageInput,
        dateCreated: new Date().toISOString(),
      };
      const newmessages = allMessages;
      newmessages.push(newMessage);
      setAllMessages(newmessages);
    } catch (err: any) {
      setError(err);
    }
  };

  const refetchMessages = async () => {
    try {
      const response = await getMessages(Number(selectedConversation));

      if (!response || response.length === 0) {
        setAllMessages([]);
        setError("There are no messages for this conversation");
        return;
      }
      toast.warning("Refetching messages");
      console.log(response);
      setAllMessages(response);
    } catch (err: any) {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateConversation = async (
    inputValue?: string,
    inputValue2?: string,
  ) => {
    try {
      setLoading(true);

      const conversationPayload = {
        subject: inputValue || "",
        recipientId: 0,
        messageBody: inputValue2 || "",
        organisationId: organisationId || 0,
      };

      const response = await createConversation(conversationPayload);

      if (!response) {
        toast.error("Could not send message");
        return;
      }

      toast.success("Message sent");

      await fetchConversations();

      setModalType(null);
    } catch (error: any) {
      setError(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      <Modal
        isOpen={modalType === "add"}
        title="Start a conversation"
        message=""
        confirmText="Start"
        confirmColor="green"
        inputLabel="Enter Message Subject"
        inputPlaceholder="Enter subject here"
        inputLabel2="Enter Message "
        inputPlaceholder2="Enter message here"
        loading={loading}
        headerIcon={<Pen />}
        butonIcon={<SendHorizonal />}
        onConfirm={({
          inputValue,
          inputValue2,
        }: {
          inputValue?: string;
          inputValue2?: string;
        }) => handleCreateConversation(inputValue, inputValue2)}
        onCancel={closeModal}
      />
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="col-md-12">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex">
              <MessageSquare
                className="text-[rgb(112_22_208/0.9)] mr-2 "
                size={36}
              />
              <div>
                <h3 className="mb-0 text-black">Communication</h3>
                <p className="text-secondary-600 text-black">
                  Dashboard <ChevronRightIcon size={14} /> Communication{" "}
                </p>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto  py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-md border border-slate-200 mb-8 w-fit">
          {[
            { id: "messages", label: "Messages", icon: MessageSquare },
            { id: "notifications", label: "Notifications", icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const isNotificationTab = tab.id === "notifications";
            const showBadge =
              isNotificationTab &&
              notificationCount != null &&
              notificationCount > 0;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 relative ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}

                {/* Notification badge - only for notifications tab */}
                {showBadge && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <button
                  className="btn-sm btn-success btn"
                  onClick={() => openAddModal()}
                >
                  <Plus size={15} /> New Conversation
                </button>
              </div>
              <div className="overflow-y-auto">
                {allConversations.map((conv) => (
                  <div
                    key={conv.conversationId}
                    onClick={() =>
                      handleSelectConversation(conv.conversationId)
                    }
                    className={`p-4 border-b border-slate-100 cursor-pointer transition-colors ${
                      selectedChat === conv.conversationId
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* <div
                        className={`w-12 h-12 rounded-full flex items-center bg-blue-500 justify-center text-white font-semibold`}
                      >
                        A
                      </div> */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-black truncate">
                            {/* Admin <br />  */}
                            {conv.subject}
                          </p>
                          <span className="text-xs text-black">
                            {formatMessageTime(conv.lastMessageDate)}
                          </span>
                        </div>
                        <p className="text-xs text-black truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div
              className="lg:col-span-2 bg-white rounded-md border border-slate-200 flex flex-col"
              style={{ height: "680px" }}
            >
              {allMessages.length > 0 ? (
                <>
                  {/* Chat Header */}
                  <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                              bg-green-500
                        `}
                      >
                        A
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {/* {con} */} Admin
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2"></div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {!loading && error && (
                      <p className="text-sm text-slate-500">{error}</p>
                    )}

                    {loading && <Loading />}
                    <div
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto p-4 space-y-4"
                    ></div>
                    {allMessages.map((msg) => {
                      const isOwnMessage =
                        Number(msg.senderId) === Number(currentUserId);

                      return (
                        <div
                          key={msg.messageId}
                          className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-md ${isOwnMessage ? "order-2" : "order-1"}`}
                          >
                            {!isOwnMessage && (
                              <p className="text-xs text-slate-500 mb-1 ml-1">
                                {msg.senderName || "Admin"}
                              </p>
                            )}
                            <div
                              className={`p-3 rounded-md bg-green-600 text-white`}
                            >
                              <p className="text-sm">{msg.messageBody}</p>
                            </div>
                            <div className="flex items-center gap-1 mt-1 ml-1">
                              <span className="text-xs text-slate-400">
                                {" "}
                                {new Date(msg.dateCreated).toLocaleDateString(
                                  "en-GB",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>
                              {/* {isOwnMessage && (
                                <CheckCheck
                                  className={`w-3 h-3 ${
                                    selectedRoute === "institution"
                                      ? "text-blue-600"
                                      : selectedRoute === "staff"
                                        ? "text-purple-600"
                                        : "text-green-600"
                                  }`}
                                />
                              )} */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-slate-200">
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <textarea
                          placeholder="Type your message..."
                          rows={2}
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim() || !selectedConversation}
                        className="btn btn-success"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">
                      Select a conversation to start messaging
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      Choose from your conversations on the left
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 space-y-3">
              <div className="bg-white rounded-md p-4 border border-slate-200 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">
                  {notificationCount === 0
                    ? "No notifications available"
                    : `You have ${notificationCount} unread notification(s)`}
                </p>
                <button className="hidden text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Mark all as read
                </button>
              </div>
              {notifications ? (
                notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.notificationId}
                      className={`bg-white rounded-md p-4 border transition-colors ${
                        notif.isRead
                          ? "border-slate-200"
                          : "border-blue-300 bg-blue-50"
                      }`}
                    >
                      <div
                        onClick={() =>
                          handleReadNotification(
                            notif.notificationId,
                            notif.actionUrl,
                          )
                        }
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <div
                          className={`p-2 rounded-md ${
                            notif.notificationType === "Action"
                              ? "bg-red-100"
                              : notif.notificationType === "Information"
                                ? "bg-blue-100"
                                : notif.notificationType === "Warning"
                                  ? "bg-purple-100"
                                  : "bg-slate-100"
                          }`}
                        >
                          {notif.notificationType === "Warning" && (
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          )}
                          {notif.notificationType === "Action" && (
                            <AlarmCheckIcon className="w-5 h-5 text-blue-600" />
                          )}
                          {notif.notificationType === "Information" && (
                            <Bell className="w-5 h-5 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-slate-900">
                              {notif.title}
                            </p>
                            <span className="text-xs text-slate-500">
                              {formatMessageTime(notif.dateCreated)}
                              {}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            {notif.message}
                          </p>
                        </div>
                        {!notif.isRead && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )
              ) : (
                <div className="txet-sm text-gray-700 text-center">
                  Could not get any notification
                </div>
              )}
            </div>

            {/* Notification Settings */}
            <div className="hidden bg-white rounded-md p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Case Updates", enabled: true },
                  { label: "New Messages", enabled: true },
                  { label: "Evidence Submissions", enabled: true },
                  { label: "Team Mentions", enabled: true },
                  { label: "System Alerts", enabled: false },
                  { label: "Daily Digest", enabled: true },
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{pref.label}</span>
                    <button
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        pref.enabled ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          pref.enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
