import { useState } from 'react';
import { MessageSquare, Bell, Users, Send, Search, Phone, Video, MoreVertical, Paperclip, Shield, AlertCircle, CheckCheck, Settings, ChevronRightIcon } from 'lucide-react';

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [selectedRoute, setSelectedRoute] = useState('institution');

  const institutionConversations = [
    { 
      id: 1, 
      name: 'Field Operations Team', 
      type: 'group',
      lastMessage: 'Surveillance complete. Ready for debrief.',
      time: '5m ago',
      unread: 2,
      status: 'active',
      avatar: 'FO'
    },
    { 
      id: 2, 
      name: 'institution Marcus Chen', 
      type: 'direct',
      lastMessage: 'Suspect located at coordinates shared',
      time: '12m ago',
      unread: 1,
      status: 'online',
      avatar: 'MC'
    },
    { 
      id: 3, 
      name: 'Case Briefing - Operation Phoenix', 
      type: 'case',
      lastMessage: 'New intel from informant confirmed',
      time: '45m ago',
      unread: 0,
      status: 'active',
      avatar: 'OP'
    },
    { 
      id: 4, 
      name: 'Undercover Unit', 
      type: 'group',
      lastMessage: 'Check-in scheduled for 1800 hours',
      time: '2h ago',
      unread: 0,
      status: 'active',
      avatar: 'UU'
    },
  ];

  const staffConversations = [
    { 
      id: 1, 
      name: 'Evidence Processing Team', 
      type: 'group',
      lastMessage: 'Lab results for Case #1847 complete',
      time: '10m ago',
      unread: 3,
      status: 'active',
      avatar: 'EP'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson - Records', 
      type: 'direct',
      lastMessage: 'Documents requested are ready',
      time: '25m ago',
      unread: 1,
      status: 'online',
      avatar: 'SJ'
    },
    { 
      id: 3, 
      name: 'IT Support', 
      type: 'support',
      lastMessage: 'System upgrade scheduled for tonight',
      time: '1h ago',
      unread: 0,
      status: 'active',
      avatar: 'IT'
    },
    { 
      id: 4, 
      name: 'Administrative Office', 
      type: 'group',
      lastMessage: 'Monthly reports due by end of week',
      time: '3h ago',
      unread: 0,
      status: 'active',
      avatar: 'AO'
    },
  ];

  const adminConversations = [
    { 
      id: 1, 
      name: 'Department Heads', 
      type: 'group',
      lastMessage: 'Budget approval meeting tomorrow',
      time: '8m ago',
      unread: 2,
      status: 'active',
      avatar: 'DH'
    },
    { 
      id: 2, 
      name: 'Chief Administrator', 
      type: 'direct',
      lastMessage: 'Policy review document attached',
      time: '30m ago',
      unread: 1,
      status: 'online',
      avatar: 'CA'
    },
    { 
      id: 3, 
      name: 'Compliance Team', 
      type: 'group',
      lastMessage: 'Quarterly audit results available',
      time: '2h ago',
      unread: 0,
      status: 'active',
      avatar: 'CT'
    },
    { 
      id: 4, 
      name: 'HR Department', 
      type: 'support',
      lastMessage: 'New hire orientation next Monday',
      time: '4h ago',
      unread: 0,
      status: 'active',
      avatar: 'HR'
    },
  ];

  const conversations = selectedRoute === 'institution' ? institutionConversations : 
                       selectedRoute === 'staff' ? staffConversations : 
                       adminConversations;

  const institutionNotifications = [
    { id: 1, type: 'alert', title: 'Urgent: Suspect Movement', message: 'Target has left primary location - backup requested', time: '3m ago', read: false },
    { id: 2, type: 'message', title: 'New Assignment', message: 'You have been assigned to Operation Phoenix', time: '20m ago', read: false },
    { id: 3, type: 'evidence', title: 'Intel Update', message: 'New surveillance footage available for review', time: '1h ago', read: true },
    { id: 4, type: 'system', title: 'Safety Check-In Required', message: 'Please confirm your status by 1800 hours', time: '2h ago', read: true },
  ];

  const staffNotifications = [
    { id: 1, type: 'alert', title: 'Evidence Request', message: 'Urgent evidence processing needed for Case #1847', time: '10m ago', read: false },
    { id: 2, type: 'message', title: 'Document Ready', message: 'Requested case files have been prepared', time: '30m ago', read: false },
    { id: 3, type: 'evidence', title: 'Lab Results Complete', message: 'Forensic analysis completed for 3 cases', time: '2h ago', read: true },
    { id: 4, type: 'system', title: 'System Update', message: 'Evidence management system will be updated tonight', time: '3h ago', read: true },
  ];

  const adminNotifications = [
    { id: 1, type: 'alert', title: 'Budget Approval Required', message: 'Q4 budget request awaiting your approval', time: '15m ago', read: false },
    { id: 2, type: 'message', title: 'Compliance Alert', message: 'Monthly compliance report submitted for review', time: '45m ago', read: false },
    { id: 3, type: 'evidence', title: 'Audit Complete', message: 'Quarterly system audit results available', time: '2h ago', read: true },
    { id: 4, type: 'system', title: 'Policy Update', message: 'New data protection policy requires approval', time: '4h ago', read: true },
  ];

  const notifications = selectedRoute === 'institution' ? institutionNotifications : 
                       selectedRoute === 'staff' ? staffNotifications : 
                       adminNotifications;

  const institutionAnnouncements = [
    { id: 1, title: 'Field Operations Briefing - Friday 0800', content: 'All field institutions required to attend tactical planning session', priority: 'high', date: 'Oct 28, 2025' },
    { id: 2, title: 'New Safety Protocol Update', content: 'Updated safety procedures for undercover operations', priority: 'high', date: 'Oct 27, 2025' },
    { id: 3, title: 'Equipment Maintenance Schedule', content: 'Surveillance equipment check required this week', priority: 'medium', date: 'Oct 25, 2025' },
  ];

  const staffAnnouncements = [
    { id: 1, title: 'Evidence Processing Training', content: 'Mandatory training session on new evidence protocols - Wednesday 2PM', priority: 'high', date: 'Oct 28, 2025' },
    { id: 2, title: 'Lab Access Schedule Change', content: 'Forensics lab hours extended to accommodate case load', priority: 'medium', date: 'Oct 26, 2025' },
    { id: 3, title: 'Document Management Update', content: 'New digital filing system implementation next week', priority: 'low', date: 'Oct 23, 2025' },
  ];

  const adminAnnouncements = [
    { id: 1, title: 'Executive Committee Meeting - Monday 10AM', content: 'Strategic planning and budget review for next quarter', priority: 'high', date: 'Oct 28, 2025' },
    { id: 2, title: 'Policy Review Deadline', content: 'All department policies must be reviewed by end of month', priority: 'high', date: 'Oct 27, 2025' },
    { id: 3, title: 'Annual Audit Preparation', content: 'Documentation preparation for annual compliance audit', priority: 'medium', date: 'Oct 24, 2025' },
  ];

  const announcements = selectedRoute === 'institution' ? institutionAnnouncements : 
                       selectedRoute === 'staff' ? staffAnnouncements : 
                       adminAnnouncements;

  const messages = [
    { id: 1, sender: 'Det. James Rodriguez', content: 'The surveillance footage has been uploaded to the evidence locker', time: '10:45 AM', isMine: false },
    { id: 2, sender: 'You', content: 'Thanks. I\'ll review it this afternoon. Have we received the warrant yet?', time: '10:47 AM', isMine: true },
    { id: 3, sender: 'Det. James Rodriguez', content: 'Yes, it came through 30 minutes ago. All documentation is in the case file.', time: '10:48 AM', isMine: false },
    { id: 4, sender: 'You', content: 'Perfect. Let\'s schedule a briefing for tomorrow morning.', time: '10:50 AM', isMine: true },
  ];

  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
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

            <div>
              {/* <a
                href="applicantNew"
                className="text-black btn shadow-md bg-white border focus:bg-gray-200"
              >
                <Plus size={18} className="mr-2" />
                Pay
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto  py-8">
        {/* Role Selector */}
        <div className="bg-white rounded-md p-4 border border-slate-200 mb-6">
          <div className=" flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900 mb-1">Communication Route</p>
              <p className="text-xs text-slate-500">Select who you want to communicate with</p>
            </div>
            <div className="flex gap-2">
              {[
                { id: 'institution', label: 'Institution', icon: Shield },
                { id: 'staff', label: 'Staff', icon: Users },
                { id: 'admin', label: 'Admin', icon: Settings }
              ].map((route) => {
                const Icon = route.icon;
                return (
                  <a
                    key={route.id}
                    onClick={() => setSelectedRoute(route.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedRoute === route.id
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {route.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-md border border-slate-200 mb-8 w-fit">
          {[
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'announcements', label: 'Announcements', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <a
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </a>
            );
          })}
        </div>

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-4 border-b border-slate-100 cursor-pointer transition-colors ${
                      selectedChat === conv.id ? 'bg-blue-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                        conv.type === 'group' ? 'bg-purple-500' :
                        conv.type === 'case' ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-slate-900 truncate">{conv.name}</p>
                          <span className="text-xs text-slate-500">{conv.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2 bg-white rounded-md border border-slate-200 flex flex-col" style={{ height: '680px' }}>
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        selectedRoute === 'institution' ? 'bg-blue-500' :
                        selectedRoute === 'staff' ? 'bg-purple-500' : 'bg-green-500'
                      }`}>
                        {conversations[0]?.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{conversations[0]?.name}</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {conversations[0]?.status === 'online' ? 'Online' : 'Active'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-md transition-colors">
                        <Phone className="w-5 h-5 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-md transition-colors">
                        <Video className="w-5 h-5 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-md transition-colors">
                        <MoreVertical className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex items-center justify-center">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                        selectedRoute === 'institution' ? 'bg-blue-100' :
                        selectedRoute === 'staff' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        <Shield className={`w-3 h-3 ${
                          selectedRoute === 'institution' ? 'text-blue-700' :
                          selectedRoute === 'staff' ? 'text-purple-700' : 'text-green-700'
                        }`} />
                        <span className={`text-xs font-medium ${
                          selectedRoute === 'institution' ? 'text-blue-700' :
                          selectedRoute === 'staff' ? 'text-purple-700' : 'text-green-700'
                        }`}>
                          Secure {selectedRoute.charAt(0).toUpperCase() + selectedRoute.slice(1)} Communication
                        </span>
                      </div>
                    </div>
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md ${msg.isMine ? 'order-2' : 'order-1'}`}>
                          {!msg.isMine && (
                            <p className="text-xs text-slate-500 mb-1 ml-1">{msg.sender}</p>
                          )}
                          <div className={`p-3 rounded-md ${
                            msg.isMine 
                              ? selectedRoute === 'institution' ? 'bg-blue-600 text-white' :
                                selectedRoute === 'staff' ? 'bg-purple-600 text-white' : 'bg-green-600 text-white'
                              : 'bg-slate-100 text-slate-900'
                          }`}>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <div className="flex items-center gap-1 mt-1 ml-1">
                            <span className="text-xs text-slate-400">{msg.time}</span>
                            {msg.isMine && (
                              <CheckCheck className={`w-3 h-3 ${
                                selectedRoute === 'institution' ? 'text-blue-600' :
                                selectedRoute === 'staff' ? 'text-purple-600' : 'text-green-600'
                              }`} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-slate-200">
                    <div className="flex items-end gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-md transition-colors">
                        <Paperclip className="w-5 h-5 text-slate-600" />
                      </button>
                      <div className="flex-1">
                        <textarea
                          placeholder="Type your message..."
                          rows={2}
                          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button className={`p-3 rounded-md hover:opacity-90 transition-colors ${
                        selectedRoute === 'institution' ? 'bg-blue-600' :
                        selectedRoute === 'staff' ? 'bg-purple-600' : 'bg-green-600'
                      } text-white`}>
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">Select a conversation to start messaging</p>
                    <p className="text-sm text-slate-400 mt-1">Choose from your conversations on the left</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="bg-white rounded-md p-4 border border-slate-200 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">You have {notifications.filter(n => !n.read).length} unread notifications</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Mark all as read
                </button>
              </div>
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`bg-white rounded-md p-4 border transition-colors ${
                    notif.read ? 'border-slate-200' : 'border-blue-300 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-md ${
                      notif.type === 'alert' ? 'bg-red-100' :
                      notif.type === 'message' ? 'bg-blue-100' :
                      notif.type === 'evidence' ? 'bg-purple-100' : 'bg-slate-100'
                    }`}>
                      {notif.type === 'alert' && <AlertCircle className="w-5 h-5 text-red-600" />}
                      {notif.type === 'message' && <MessageSquare className="w-5 h-5 text-blue-600" />}
                      {notif.type === 'evidence' && <Shield className="w-5 h-5 text-purple-600" />}
                      {notif.type === 'system' && <Bell className="w-5 h-5 text-slate-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-slate-900">{notif.title}</p>
                        <span className="text-xs text-slate-500">{notif.time}</span>
                      </div>
                      <p className="text-sm text-slate-600">{notif.message}</p>
                    </div>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-md p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Case Updates', enabled: true },
                  { label: 'New Messages', enabled: true },
                  { label: 'Evidence Submissions', enabled: true },
                  { label: 'Team Mentions', enabled: true },
                  { label: 'System Alerts', enabled: false },
                  { label: 'Daily Digest', enabled: true },
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{pref.label}</span>
                    <button
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        pref.enabled ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          pref.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-md p-6 border border-slate-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        announcement.priority === 'high' ? 'bg-red-100 text-red-700' :
                        announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {announcement.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-500">{announcement.date}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{announcement.title}</h3>
                  <p className="text-sm text-slate-600">{announcement.content}</p>
                </div>
              ))}
            </div>

            {/* Create Announcement */}
            <div className="bg-white rounded-md p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Post Announcement</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Announcement title"
                    className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Type your announcement..."
                    className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Post Announcement
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}