import React from "react";

export default function BottombarButton({ label, Icon, red = false }) {
  return (
    <button
      aria-label={label}
      className={`
        text-3xl cursor-pointer
        bg-[#242424] rounded-lg shadow-md p-3
        transition-colors duration-300
        ${red ? "text-red-500 hover:text-red-400" : "text-white hover:text-[#00c476]"}
      `}
    >
      <Icon />
    </button>
  );
}
