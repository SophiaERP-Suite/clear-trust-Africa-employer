import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "How long does a DBS check take?",
    answer:
      "DBS checks typically take between 5–10 working days depending on verification requirements.",
  },
  {
    question: "Why is my DBS status pending?",
    answer:
      "Your application may be awaiting document verification or third-party confirmation.",
  },
  {
    question: "I was charged but my application didn’t submit",
    answer:
      "If payment was successful but submission failed, please contact support with your receipt.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login page and click 'Forgot Password' to reset your credentials.",
  },
];

export default function HelpSupport() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg">
      {/* Header */}
      <div className="border-b p-5">
        <h1 className="text-2xl font-semibold text-black">Help & Support</h1>
        <p className="text-gray-500 text-sm mt-1">
          Get help with DBS checks, payments, and account issues
        </p>
      </div>
      <div className="p-5">
        {/* Quick Actions */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          "Track My DBS Check",
          "Common Issues",
          "Contact Support",
          "Report a Problem",
        ].map((item) => (
          <div
            key={item}
            className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <p className="font-medium text-black">{item}</p>
          </div>
        ))}
      </div> */}

        {/* FAQ Section */}
        <section className="">
          <h2 className="text-xl font-semibold text-black mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg bg-white">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left "
                >
                  <span className="font-medium text-black text-sm lg:text-md">
                    {faq.question}
                  </span>
                  <span className="text-gray-400">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>

                {activeIndex === index && (
                  <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mt-12 bg-white border rounded-xl p-5">
          <h2 className="text-xl font-semibold text-black mb-3">
            Contact Support
          </h2>

          <div className="space-y-2 text-gray-600">
            <p>
              Email:{" "}
              <span className="font-medium text-black">
                support@yourdbsapp.com
              </span>
            </p>
            <p>
              Phone:{" "}
              <span className="font-medium text-black">
                +234 812 345 6789
              </span>
            </p>
            <p>Support Hours: Monday – Friday, 9:00 AM – 5:00 PM</p>
          </div>
        </section>

        {/* Report Issue */}
        <section className="hidden mt-12 bg-white border rounded-xl p-5">
          <h2 className="text-xl font-semibold text-black mb-4">
            Report an Issue
          </h2>

          <form className="space-y-4 max-w-lg">
            <select
              required
              className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select issue type</option>
              <option value="dbs">DBS Application</option>
              <option value="payment">Payment</option>
              <option value="account">Account Access</option>
              <option value="other">Other</option>
            </select>

            <textarea
              rows={4}
              required
              placeholder="Describe your issue"
              className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Issue
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
