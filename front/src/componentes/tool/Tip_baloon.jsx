import React from "react";

export default function TooltipBalloon({ children, message }) {
  return (
    <div className="fixed top-4 right-4 group inline-block z-50" aria-describedby="tooltip-message">
      {children}

      <aside
        id="tooltip-message"
        role="tooltip"
        className="opacity-0 group-hover:opacity-100 pointer-events-none
        absolute top-full right-0 mt-2 w-64 bg-white text-gray-900 rounded-md
        shadow-lg p-4 text-sm transition-opacity duration-300 whitespace-normal"
      >
        <div className="relative">
          {message}
        </div>
      </aside>
    </div>
  );
}