import { useState } from "react";
import {
  Search,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  Video,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Headphones,
  Send,
  ChevronRightIcon,
  CircleQuestionMark,
} from "lucide-react";

export default function HelpSupportPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState("faq");

  const categories = [
    { id: "all", label: "All Topics", icon: BookOpen },
    { id: "getting-started", label: "Getting Started", icon: CheckCircle },
    { id: "requests", label: "Requests & Cases", icon: FileText },
    { id: "billing", label: "Billing & Payment", icon: AlertCircle },
    { id: "security", label: "Security & Privacy", icon: HelpCircle },
    { id: "technical", label: "Technical Support", icon: MessageCircle },
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I submit an investigation request?",
      answer:
        'To submit an investigation request, navigate to the "Request Investigation" page, fill out the multi-step form with your details, select the type of investigation needed, specify your budget and timeline, and upload any supporting documents. You\'ll receive a confirmation email with your request ID within minutes.',
    },
    {
      id: 2,
      category: "getting-started",
      question: "What types of investigations do you handle?",
      answer:
        "We handle various types of investigations including corporate fraud, missing persons, background checks, cyber crime, asset recovery, insurance fraud, surveillance, and custom investigation requests. Each case is assigned to specialized agents based on the investigation type.",
    },
    {
      id: 3,
      category: "requests",
      question: "How long does it take to review my request?",
      answer:
        "Our team reviews all investigation requests within 24 hours. For urgent or critical cases, we prioritize review and can respond within 2-4 hours. You'll be notified via email and SMS when an agent is assigned to your case.",
    },
    {
      id: 4,
      category: "requests",
      question: "Can I track the progress of my investigation?",
      answer:
        "Yes! Once your request is accepted and an agent is assigned, you can track real-time progress through your dashboard. You'll see investigation milestones, receive regular updates, and can communicate directly with your assigned agent.",
    },
    {
      id: 5,
      category: "requests",
      question: "What if I need to modify my request after submission?",
      answer:
        "You can modify your request before an agent accepts it by contacting our support team. Once a case is in progress, you can add additional information or requirements by messaging your assigned agent directly through the platform.",
    },
    {
      id: 6,
      category: "billing",
      question: "How does pricing work?",
      answer:
        "Pricing is based on the complexity, duration, and resources required for your investigation. When submitting a request, you specify a budget range. Our agents will provide a detailed quote before starting work. Payment is typically structured as: 50% upfront, 50% upon completion.",
    },
    {
      id: 7,
      category: "billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, credit/debit cards, and corporate payment arrangements. All transactions are secure and encrypted. For corporate clients, we offer NET 30 payment terms after credit approval.",
    },
    {
      id: 8,
      category: "billing",
      question: "Is there a refund policy?",
      answer:
        "If we are unable to accept your case or you cancel before work begins, you'll receive a full refund of any deposit. For ongoing investigations, refunds are prorated based on work completed. Terms are outlined in your service agreement.",
    },
    {
      id: 9,
      category: "security",
      question: "How is my information protected?",
      answer:
        "We use bank-level 256-bit encryption for all data transmission and storage. All information is protected under strict confidentiality agreements. Access is limited to assigned investigators and essential personnel only. We comply with international data protection standards.",
    },
    {
      id: 10,
      category: "security",
      question: "Who can see my case details?",
      answer:
        "Only your assigned agent, supervising case manager, and authorized support staff can access your case details. We maintain strict access controls and audit logs. All personnel sign confidentiality agreements before handling any cases.",
    },
    {
      id: 11,
      category: "security",
      question: "What happens to my data after the investigation?",
      answer:
        "Case files are retained securely for 7 years as per legal requirements, then permanently deleted. You can request your data at any time or ask for early deletion (where legally permitted). All evidence and documents are encrypted in secure storage.",
    },
    {
      id: 12,
      category: "technical",
      question: "I can't access my account. What should I do?",
      answer:
        'First, try resetting your password using the "Forgot Password" link. If issues persist, contact our technical support team at support@investigationplatform.com or use the live chat. We typically respond within 1 hour during business hours.',
    },
    {
      id: 13,
      category: "technical",
      question: "How do I upload large files?",
      answer:
        "Our platform supports files up to 100MB per upload. For larger files, you can compress them or upload multiple files. If you need to share very large files (video footage, etc.), contact your agent for secure transfer alternatives like encrypted cloud storage links.",
    },
    {
      id: 14,
      category: "technical",
      question: "Is there a mobile app?",
      answer:
        "Currently, our platform is web-based and fully responsive, working on all mobile devices through your browser. A dedicated mobile app for iOS and Android is planned for Q2 2026. You'll receive notifications via email and SMS.",
    },
  ];

  const quickLinks = [
    {
      title: "Submit a Request",
      description: "Start a new investigation",
      icon: FileText,
      link: "/request",
    },
    {
      title: "Track My Cases",
      description: "View active investigations",
      icon: Clock,
      link: "/tracker",
    },
    {
      title: "Contact Agent",
      description: "Message your investigator",
      icon: MessageCircle,
      link: "/communication",
    },
    {
      title: "Billing & Payments",
      description: "View invoices and payments",
      icon: AlertCircle,
      link: "/payment",
    },
  ];

  const contactOptions = [
    {
      title: "Live Chat",
      description: "Chat with our support team",
      icon: MessageCircle,
      availability: "Available 24/7",
      action: "Start Chat",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Phone Support",
      description: "+234 XXX XXX XXXX",
      icon: Phone,
      availability: "Mon-Fri, 8AM-6PM WAT",
      action: "Call Now",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Email Support",
      description: "support@platform.com",
      icon: Mail,
      availability: "Response within 4 hours",
      action: "Send Email",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Video Call",
      description: "Schedule a video meeting",
      icon: Video,
      availability: "By appointment",
      action: "Book Session",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      (activeCategory === "all" || faq.category === activeCategory) &&
      (searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              <CircleQuestionMark
                className="text-[rgb(112_22_208/0.9)] mr-2 "
                size={36}
              />
              <div>
                <h3 className="mb-0 text-black">Help & Support</h3>
                <p className="text-secondary-600 text-black">
                  Dashboard <ChevronRightIcon size={14} /> Help & Support{" "}
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

      <main className="max-w-7xl mx-auto py-8">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-md p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-gray-100 rounded-full group-hover:bg-[rgba(112,22,208,0.9)] transition-colors">
                    <Icon size={25} className=" text-[rgb(112_22_208/0.9)] group-hover:text-gray-800  transition-colors" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {link.title}
                </h3>
                <p className="text-sm text-slate-500">{link.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-md border border-slate-200 mb-8 w-fit">
          {[
            { id: "faq", label: "FAQ", icon: HelpCircle },
            { id: "guides", label: "Guides & Tutorials", icon: BookOpen },
            { id: "contact", label: "Contact Support", icon: Headphones },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <a
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md text-sm cursor-pointer font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </a>
            );
          })}
        </div>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-md p-4 border border-slate-200 sticky top-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const count =
                      category.id === "all"
                        ? faqs.length
                        : faqs.filter((faq) => faq.category === category.id)
                            .length;

                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                          activeCategory === category.id
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{category.label}</span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            activeCategory === category.id
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-md border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {filteredFaqs.length}{" "}
                    {filteredFaqs.length === 1 ? "question" : "questions"} found
                  </p>
                </div>

                <div className="divide-y divide-slate-200">
                  {filteredFaqs.length === 0 ? (
                    <div className="p-12 text-center">
                      <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600 font-medium">
                        No questions found
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        Try a different search or category
                      </p>
                    </div>
                  ) : (
                    filteredFaqs.map((faq) => (
                      <div key={faq.id} className="p-6">
                        <button
                          onClick={() =>
                            setExpandedFaq(
                              expandedFaq === faq.id ? null : faq.id
                            )
                          }
                          className="w-full flex items-start justify-between gap-4 text-left"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 mb-1">
                              {faq.question}
                            </h4>
                            {expandedFaq === faq.id && (
                              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                                {faq.answer}
                              </p>
                            )}
                          </div>
                          {expandedFaq === faq.id ? (
                            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                          )}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === "guides" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Getting Started Guide",
                description:
                  "Learn the basics of using our investigation platform",
                duration: "5 min read",
                type: "Article",
                category: "Beginner",
              },
              {
                title: "How to Submit a Request",
                description:
                  "Step-by-step guide to submitting your first investigation request",
                duration: "3 min read",
                type: "Tutorial",
                category: "Beginner",
              },
              {
                title: "Understanding Case Progress",
                description:
                  "Learn how to track and monitor your investigation progress",
                duration: "4 min read",
                type: "Article",
                category: "Intermediate",
              },
              {
                title: "Communication Best Practices",
                description:
                  "Tips for effective communication with your assigned agent",
                duration: "6 min read",
                type: "Guide",
                category: "Intermediate",
              },
              {
                title: "Security & Privacy Settings",
                description:
                  "How to configure your account security and privacy preferences",
                duration: "7 min read",
                type: "Tutorial",
                category: "Advanced",
              },
              {
                title: "Document Upload Guidelines",
                description:
                  "Best practices for uploading and managing case documents",
                duration: "4 min read",
                type: "Guide",
                category: "Beginner",
              },
            ].map((guide, idx) => (
              <div
                key={idx}
                className="bg-white rounded-md p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {guide.type}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                    {guide.category}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {guide.title}
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {guide.duration}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Options */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-md p-6 border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                  Get in Touch
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contactOptions.map((option, idx) => {
                    const Icon = option.icon;
                    return (
                      <div
                        key={idx}
                        className="p-6 border border-slate-200 rounded-md hover:border-blue-300 transition-colors"
                      >
                        <div
                          className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mb-4`}
                        >
                          <Icon className="w-6 h-6" size={25} />
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-1">
                          {option.title}
                        </h4>
                        <p className="text-sm text-slate-600 mb-2">
                          {option.description}
                        </p>
                        <p className="text-xs text-slate-500 mb-4">
                          {option.availability}
                        </p>
                        <button className="w-full px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                          {option.action}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-md p-6 border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                  Send us a Message
                </h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Describe your issue or question..."
                      className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <a className="w-full btn btn-primary">
                    <Send className="w-4 h-4" />
                    Send Message
                  </a>
                </form>
              </div>
            </div>

            {/* Support Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-md p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Support Hours
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monday - Friday</span>
                    <span className="font-medium text-slate-900">
                      8AM - 6PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Saturday</span>
                    <span className="font-medium text-slate-900">
                      9AM - 4PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sunday</span>
                    <span className="font-medium text-slate-900">Closed</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-slate-600">Emergency cases:</p>
                    <p className="font-medium text-slate-900">24/7 Available</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-md p-6 border border-blue-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Need Urgent Help?
                    </h3>
                    <p className="text-sm text-blue-700">
                      For critical or time-sensitive matters, call our emergency
                      hotline
                    </p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                  Call Emergency Line
                </button>
              </div>

              <div className="bg-white rounded-md p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Popular Resources
                </h3>
                <div className="space-y-3">
                  {[
                    "Getting Started Guide",
                    "Security Best Practices",
                    "Payment & Billing FAQ",
                    "Case Tracking Tutorial",
                  ].map((resource, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex items-center justify-between text-sm text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      <span>{resource}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
