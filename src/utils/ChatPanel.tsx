import { useState, useEffect, useRef } from "react";
import {
  EllipsisVertical,
  HelpCircle,
  Loader2,
  Paperclip,
  Pen,
  Reply,
  Send,
  Trash2,
  X,
} from "lucide-react";
import {
  type ChatMessage,
  fetchIncidentChatMessages,
  sendChatMessage,
} from "./Requests/IncidentChatRequests";
import { toast, ToastContainer } from "react-toastify";

interface ChatPanelProps {
  incidentReportId: number;
  currentUserId: number;
  organisationId: number;
  currentUserName: string;
  onClose: () => void;
}

export default function ChatPanel({
  incidentReportId,
  currentUserId,
  organisationId,
  onClose,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [incidentReportId]);

  useEffect(() => {
    loadChatData();

    const interval = setInterval(loadChatData, 20000);

    return () => clearInterval(interval);
  }, [incidentReportId]);

  const loadChatData = async () => {
    try {
      const fetchedMessages = await fetchIncidentChatMessages(incidentReportId);

      console.log("chat fetched message", fetchedMessages);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error loading chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() && !selectedFile) return;

    setIsSending(true);

    const formData = new FormData();
    formData.append("Comments", newMessage); // ✅ EXACT name
    if (selectedFile) {
      formData.append("File", selectedFile); // ✅ EXACT name
    }

    try {
      const sentMessage = await sendChatMessage(
        incidentReportId,
        organisationId,
        formData
      );

      if (!sentMessage) {
        toast.success("I got here");
        return;
      }

      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Add state for file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Add file input handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Function to remove selected file
  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6">
          <p>Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Chat Header */}
        <div className="border-b p-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Incident Comments</h3>
            {/* <p className="text-sm text-gray-500">
              {participants.length} participants
            </p> */}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <X />
          </button>
        </div>

        {/* Participants List (Optional Sidebar) */}
        <div className="border-b bg-gray-50">
          <div className="flex items-center gap-2 overflow-x-auto">
          
          </div>
        </div>

        {/* Messages Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => {
            const isOwnMessage = message.fromId === currentUserId;

            return (
              <div
                key={message.chatId}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] min-w-[50%] rounded-lg p-3 ${
                    isOwnMessage
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold">
                      {message.from}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-md">
                    {message.comments}
                  </p>{" "}
                  {message.fileUrl && message.fileUrl !== "/" && (
                    <div className="mt-2 p-2 bg-gray-50 rounded border">
                      <div className="flex items-center">
                        <Paperclip size={16} className="text-gray-500 mr-2" />
                        <a
                           href={`http://localhost:5181${message.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm truncate"
                        >
                          {message.fileName || "Download File"}
                        </a>
                        {message.fileSize && (
                          <span className="text-xs text-gray-500 ml-2">
                            {message.fileSize}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end mt-1">
                    {/* {isOwnMessage && (
                      <span className="text-xs">
                        {message.isRead ? (
                          <CheckCheck size={12} />
                        ) : (
                          <Check size={12} />
                        )}
                      </span>
                    )} */}
                    <span className="text-xs opacity-75">
                      {new Date(message.dateCreated).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </span>
                  </div>
                </div>{" "}
                <div>
                  <button onClick={() => setIsOpen(!isOpen)}>
                    <EllipsisVertical />
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        {/* Only show edit/delete for current user's messages */}
                        {message.fromId === currentUserId && (
                          <>
                            <button
                              onClick={() => {
                                // setIsEditing(true);
                                setIsOpen(false);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-3"
                            >
                              <Pen size={14} />
                              Edit Message
                            </button>

                            <button
                              onClick={() => {
                                // onDelete(message.id);
                                setIsOpen(false);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 gap-3"
                            >
                              <Trash2 size={14} />
                              Delete Message
                            </button>

                            <div className="border-t my-1"></div>
                          </>
                        )}

                        {/* Show reply for all messages */}
                        <button
                          onClick={() => {
                            // onReply(message.id);
                            setIsOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-3"
                        >
                          <Reply size={14} />
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {/* <form onSubmit={handleSendMessage} className="border-t p-4">
          <div className="flex items-start gap-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Paperclip size={20} />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Smile size={20} />
            </button>

            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="form-control text-black"
              rows={2}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />

            <button
              type="submit"
              disabled={isSending || !newMessage.trim()}
              className="btn btn-success"
            >
              <Send size={20} />
            </button>
          </div>
        </form> */}

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="border-t p-4">
          {/* Show selected file preview */}
          {selectedFile && (
            <div className="mb-3 p-2 bg-gray-50 rounded border flex items-center justify-between">
              <div className="flex items-center">
                <Paperclip size={16} className="text-gray-500 mr-2" />
                <span className="text-sm truncate max-w-xs">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={removeSelectedFile}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="flex items-start gap-2">
            {/* File Upload Button */}
            <label className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <Paperclip size={20} />
            </label>

            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                selectedFile
                  ? "Add a comment (optional)..."
                  : "Type your message..."
              }
              className="form-control text-black flex-1"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />

            <button
              type="submit"
              disabled={isSending || (!newMessage.trim() && !selectedFile)}
              className="btn btn-success disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Sending...
                </span>
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
          <p className="text-center py-3 text-red-800 text-xs"><HelpCircle width={15} height={15} /> Please write a description for every file you send</p>
        </form>
      </div>
    </div>
  );
}
