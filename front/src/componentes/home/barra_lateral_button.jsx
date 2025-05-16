import React from "react";

export default function SidebarButton({ label, Icon }) {
  return (
    <button
      aria-label={label}
      className={`
        text-white text-3xl mb-8 cursor-pointer
        bg-[#242424] rounded-xl shadow-md p-5
        transition-colors duration-300 hover:text-[#00c476] hover:shadow-lg
      `}
    >
      <Icon />
    </button>
  );
}
