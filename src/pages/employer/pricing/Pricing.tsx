import { useState } from "react";
import { ChevronRightIcon, Coins } from "lucide-react";
import Month from "./Month";
import Yearly from "./Year";

export default function Pricing() {
  const [pricingType, setPricingType] = useState("monthly");

  const sections = [
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];
  return (
    <div
      className="p-6 lg:p-8 footer-inner mx-auto main-container container"
      x-bind:className="setting.page_layout"
    >
      {/* Header */}
      <div className="flex flex-wrap mb-8 justify-between gap-4">
        <div className="col-md-12">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex">
              <Coins className="text-[rgb(112_22_208/0.9)] mr-2 " size={36} />
              <div>
                <h3 className="mb-0 text-black">Pricing</h3>
                <p className="text-secondary-600 text-black">
                  Dashboard <ChevronRightIcon size={14} /> Pricing{" "}
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

      {/* Sidebar-like section switcher */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-full flex-auto">
          <div className="relative flex flex-col mb-8 bg-white rounded shadow dark:bg-dark-card">
            <div className="flex justify-between flex-wrap p-5 border-b dark:border-secondary-800">
              <h4 className="mb-0 dark:text-white">Choose Plan</h4>
              <div className="inline-block">
                <label className="flex items-center cursor-pointer mb-0 gap-2 border p-1 rounded-md">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      onClick={() => setPricingType(section.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-md shadow transition-all ${
                        pricingType === section.id
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      {section.label}
                    </a>
                  ))}
                </label>
              </div>
            </div>
            <div>
              {pricingType === "monthly" && <Month />}
              {pricingType === "yearly" && <Yearly />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
