import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "red" | "green" | "yellow";
  inputLabel?: string;
  inputPlaceholder?: string;
  inputLabel2?: string;
  butonIcon: React.ReactNode;
  headerIcon: React.ReactNode;
  inputPlaceholder2?: string;
  dropdownLabel?: string;
  dropdownOptions?: { value: string | number; label: string }[];
  dropdownPlaceholder?: string;
  loading?: boolean;
  defaultInputValue?: string;
  defaultInputValue2?: string;
  defaultDropdownValue?: string;
  onConfirm: (data: {
    inputValue?: string;
    inputValue2?: string;
    dropdownValue?: string;
  }) => void;

  onCancel: () => void;
};

const colorMap = {
  red: "btn-danger",
  green: "btn-success",
  yellow: "btn-warning",
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "",
  inputLabel,
  inputPlaceholder,
  inputLabel2,
  inputPlaceholder2,
  butonIcon,
  headerIcon,
  dropdownLabel,
  dropdownOptions = [],
  dropdownPlaceholder = "Select an option",
  loading = false,
  defaultInputValue = "",
  defaultInputValue2 = "",
  defaultDropdownValue = "",
  onConfirm,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");

  // Update inputs when modal opens with default values
  useEffect(() => {
    if (isOpen) {
      setInputValue(defaultInputValue);
      setInputValue2(defaultInputValue2);
      setDropdownValue(defaultDropdownValue);
    } else {
      // Clear when modal closes
      setInputValue("");
      setInputValue2("");
      setDropdownValue("");
    }
  }, [isOpen, defaultInputValue, defaultInputValue2, defaultDropdownValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={!loading ? onCancel : undefined}
      />

      {/* Modal */}
      <div className="relative z-10 w-5/6 md:max-w-md rounded-md bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">
          {headerIcon} {title}
        </h2>
        <div className="mt-3 text-gray-600">{message}</div>

        {/* First Input */}
        {inputLabel && (
          <div className="mt-4">
            <label className="mb-1 block text-sm text-black font-medium">
              {inputLabel}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputPlaceholder}
              className="form-control text-sm text-black"
            />
          </div>
        )}

        {/* Second Input */}
        {inputLabel2 && (
          <div className="mt-4">
            <label className="mb-1 block text-sm text-black font-medium">
              {inputLabel2}
            </label>
            <input
              type="text"
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value)}
              placeholder={inputPlaceholder2}
              className="form-control text-sm text-black"
            />
          </div>
        )}

        {/* Dropdown */}
        {dropdownLabel && (
          <div className="mt-4">
            <label className="mb-1 block text-sm text-black font-medium">
              {dropdownLabel}
            </label>
            <select
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.target.value)}
              className="form-control text-sm text-black"
            >
              <option value="">{dropdownPlaceholder}</option>
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-white text-sm hover:bg-gray-300 disabled:opacity-50"
          >
            <X /> {cancelText}
          </button>
          <button
            onClick={() =>
              onConfirm({
                inputValue,
                inputValue2,
                dropdownValue,
              })
            }
            disabled={loading}
            className={`rounded px-4 py-2 text-sm text-white disabled:opacity-50 ${
              colorMap[confirmColor as keyof typeof colorMap]
            }`}
          >
            {butonIcon} {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
