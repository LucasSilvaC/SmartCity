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
        font-semibold 
        text-lg 
        px-8 
        py-3
        overflow-hidden
        focus:outline-none
        transition-all 
        duration-300 
        ease-in-out
        shadow-[inset_0_0_0_2px_#737385,0_0_0_2px_#2E2F3B]
        bg-[#5A5B67]
        hover:bg-[#4f5060] 
        hover:scale-105 
        hover:shadow-[inset_0_0_0_2px_#737385,0_0_0_2px_#1f1f2b]
        focus:ring-4 
        focus:ring-green-300
      "
      style={{
        clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
      }}
    >
      <span className="relative pointer-events-none">{label}</span>
    </button>
  );
}
