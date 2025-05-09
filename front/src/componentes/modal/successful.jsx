import React from "react";

export default function Successful({ message, type, onClose }) {
  const bgColor = type === "success" ? "border-green-500" : "border-red-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl text-white bg-white/10 border ${bgColor} p-8`}
      >
        <p className="text-2xl text-center mb-6 font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="block cursor-pointer mx-auto px-6 py-2 border-2 border-[#3cba51] text-white font-semibold rounded-xl hover:bg-[#3cba51] hover:text-white transition-all duration-300 ease-in-out"
        >
          OK
        </button>
      </div>
    </div>
  );
}
