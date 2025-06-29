import React from "react";

export default function SidebarButton({ label, Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`
        text-white text-3xl mb-8 cursor-pointer
        bg-[#242424] rounded-xl shadow-md p-5
        transition-all duration-300 ease-in-out transform
        hover:scale-105 hover:-translate-y-1
        hover:text-[#00c476] hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00c476]
      `}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}