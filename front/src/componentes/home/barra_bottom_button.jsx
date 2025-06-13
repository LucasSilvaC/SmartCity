import React from "react";

export default function BottombarButton({ label, Icon, red = false }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`
        text-3xl cursor-pointer
        bg-[#242424] rounded-lg shadow-md p-3
        transition-all duration-300 ease-in-out transform
        hover:scale-105 hover:-translate-y-1
        ${red ? "text-red-500 hover:text-red-400" : "text-white hover:text-[#00c476]"}
      `}
    >
      <span className="sr-only">{label}</span>
      <Icon />
    </button>
  );
}