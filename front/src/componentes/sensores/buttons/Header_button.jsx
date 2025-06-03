import React from "react";

export default function Header_button({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="
        relative 
        inline-flex 
        justify-center 
        items-center 
        text-white 
        uppercase 
        font-extrabold 
        text-lg 
        px-8 
        py-3
        overflow-hidden
        focus:outline-none
        transition-all 
        duration-300 
        ease-in-out
        rounded-xl
        bg-gradient-to-br
        from-gray-900
        via-gray-800
        to-gray-900
        border
        border-gray-700
        shadow-xl
        hover:shadow-2xl
        hover:scale-105
        focus:ring-4 
        focus:ring-green-400
        active:scale-95
        cursor-pointer
      "
      style={{
        clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
      }}
    >
      <span className="relative pointer-events-none">{label}</span>
    </button>
  );
}
