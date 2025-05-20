import React from "react";
import { twMerge } from "tailwind-merge";

export default function SettingsCard({ icon: Icon, title, selected, style }) {
  return (
    <div
      className={twMerge(
        `absolute w-40 h-48 sm:w-48 sm:h-56 p-4 rounded-xl bg-[#1c1c1c] text-white 
        flex flex-col items-center justify-center transition-all duration-500 
        border-2 border-transparent transform-gpu`,
        selected &&
          "border-[#00c476] scale-110 z-20 shadow-lg shadow-[#00c476]/30"
      )}
      style={style}
    >
      <Icon className="text-4xl mb-3 text-[#00c476]" />
      <h3 className="text-lg sm:text-xl font-bold text-center">{title}</h3>
    </div>
  );
}
