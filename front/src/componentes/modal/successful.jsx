import React from "react";

export default function Successful({ message, type, onClose }) {
  const bgColor = type === "success" ? "border-[#00c476] border-3" : "border-[#126b4b] border-3";

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl text-white bg-white/10 border ${bgColor} p-8`}
      >
        <p className="text-4xl text-center mb-6 font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="w-[80%] h-[3.3rem] block cursor-pointer mx-auto px-6 py-2 border-2 border-[#126b4b] text-white font-semibold rounded-md hover:bg-[#126b4b] hover:text-white transition-all duration-300 ease-in-out"
        >
          OK
        </button>
      </div>
    </div>
  );
}
