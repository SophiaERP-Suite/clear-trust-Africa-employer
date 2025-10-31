import { Check } from "lucide-react";

function Yearly() {
  return (
    <div className="px-6 p-6 pb-0">
      <div className="lg:flex lg:grid-cols-3 grid md:grid-cols-2 grid-cols-1 gap-8 text-center mb-8">
        <div className="flex-auto lg:w-1/4  rounded">
          <div
            x-data="{ tooltip: false }"
            className="flex relative flex-col overflow-hidden bg-white  shadow dark:bg-dark-card bg-primary-500/10 hover:bg-primary-500 type-3 ease-in-out duration-500  border dark:border-secondary-800 rounded"
          >
            <div
              className="flex-auto p-6 text-left rtl:text-right"
              x-on:mouseover="tooltip = true"
              x-on:mouseleave="tooltip = false"
            >
              <div className="absolute right-0 mt-4">
                <div className="relative">
                  {/* <div className="block bg-info-500 text-white -top-5 left-auto right-0 absolute px-4 py-1 rounded-l ">
                    Popular
                  </div> */}
                </div>
              </div>
              <h3 className="my-0  mb-3 dark:text-white block text-3xl">
                Premium
              </h3>
              <p className="mb-4 text-sm dark:text-white">Best For Everyone</p>
              <h3
                className="my-4  text-3xl dark:text-white text-black"
                x-text="yearly ? '$150/Yr' : '$50/Mo'"
              >
                ₦6,000,000/Yr
              </h3>
              <ul className="p-0 mb-0 mt-4">
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Unlimited
                    investigations per month
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Full forensic and cyber
                    intelligence suite
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Access to historical
                    investigation archives
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Real-time alerts on
                    flagged entities
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Integration with law
                    enforcement databases
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Dedicated account
                    manager & custom API access
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> 24/7 priority support +
                    legal advisory
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white">
                    <Check size={16} className="mr-3" />
                    Certificate of completion
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary border rtl:mr-2 dark:border-secondary-800"
                  >
                    Try Now
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-auto lg:w-1/4  rounded">
          <div
            x-data="{ tooltip: false }"
            className="flex relative flex-col overflow-hidden bg-white  shadow dark:bg-dark-card bg-primary-500/10  hover:bg-primary-500 type-3 ease-in-out duration-500  border dark:border-secondary-800 rounded"
          >
            <div
              className="flex-auto p-6 text-left rtl:text-right"
              x-on:mouseover="tooltip = true"
              x-on:mouseleave="tooltip = false"
            >
              <div className="absolute right-0 mt-4">
                <div className="relative" style={{ display: "none" }}>
                  <div
                    x-on:mouseover="tooltip1 = true"
                    x-on:mouseleave="tooltip1 = false"
                    className="block bg-info-500 text-white -top-5 left-auto right-0 absolute px-4 py-1 rounded-l "
                  >
                    Popular
                  </div>
                </div>
              </div>
              <h3 className="my-0  mb-3 dark:text-white">Pro</h3>
              <p className="mb-4 text-sm dark:text-white">
                Best For Professionals
              </p>
              <h3
                className="my-4 text-3xl dark:text-white text-black"
                x-text="yearly ? '$50/Yr' : '$25/Mo'"
              >
                ₦2,400,000/Yr
              </h3>

              <ul className="space-y-2">
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Up to 10 comprehensive
                    background checks monthly
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Financial and criminal
                    record investigation
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Advanced digital
                    forensics (social & digital footprint)
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Priority report
                    delivery (within 48 hours)
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Dedicated case officer
                    and live tracking dashboard
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> 24/7 email & chat
                    support
                  </p>
                </li>

                <li>
                  <p className="mb-5 text-sm dark:text-white">
                    <Check size={16} className="mr-3" />
                    Certificate of completion
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary border rtl:mr-2 dark:border-secondary-800"
                  >
                    Try Now
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-auto lg:w-1/4  rounded">
          <div
            x-data="{ tooltip: false }"
            className="flex relative flex-col overflow-hidden bg-white  shadow dark:bg-dark-card bg-primary-500/10  hover:bg-primary-500 type-3 ease-in-out duration-500  border dark:border-secondary-800 rounded"
          >
            <div
              className="flex-auto p-6 text-left rtl:text-right"
              x-on:mouseover="tooltip = true"
              x-on:mouseleave="tooltip = false"
            >
              <div className="absolute right-0 mt-4">
                <div className="relative" style={{ display: "none" }}>
                  <div
                    x-on:mouseover="tooltip1 = true"
                    x-on:mouseleave="tooltip1 = false"
                    className="block bg-info-500 text-white -top-5 left-auto right-0 absolute px-4 py-1 rounded-l "
                  >
                    Popular
                  </div>
                </div>
              </div>
              <h3 className="my-0  mb-3 dark:text-white">Starter</h3>
              <p className="mb-4 text-sm dark:text-white">Best For Beginners</p>
              <h3
                className="my-4 text-3xl dark:text-white text-black"
                x-text="yearly ? '$50/Yr' : '$25/Mo'"
              >
                ₦600,000/Yr
              </h3>

              <ul className="space-y-2">
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Basic background
                    verification (1–3 checks)
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Police clearance and
                    identity validation
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Employment & address
                    verification
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Access to investigation
                    reports (PDF only)
                  </p>
                </li>
                <li>
                  <p className="mb-5 text-sm dark:text-white flex items-center">
                    <Check size={16} className="mr-3" /> Email support
                  </p>
                </li>
                <ul className="space-y-2">
                  <li>
                    <p className="mb-5 text-sm dark:text-white flex items-center">
                      <Check size={16} className="mr-3" /> Basic background
                      verification (1–3 checks)
                    </p>
                  </li>
                  <li>
                    <p className="mb-5 text-sm dark:text-white flex items-center">
                      <Check size={16} className="mr-3" /> Police clearance and
                      identity validation
                    </p>
                  </li>
                  <li>
                    <p className="mb-5 text-sm dark:text-white flex items-center">
                      <Check size={16} className="mr-3" /> Employment & address
                      verification
                    </p>
                  </li>
                  <li>
                    <p className="mb-5 text-sm dark:text-white flex items-center">
                      <Check size={16} className="mr-3" /> Access to
                      investigation reports (PDF only)
                    </p>
                  </li>
                  <li>
                    <p className="mb-5 text-sm dark:text-white flex items-center">
                      <Check size={16} className="mr-3" /> Email support
                    </p>
                  </li>
                </ul>

                <li>
                  <p className="mb-5 text-sm dark:text-white">
                    <Check size={16} className="mr-3" />
                    Certificate of completion
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary border rtl:mr-2 dark:border-secondary-800"
                  >
                    Try Now
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Yearly;
