import React from "react";

export default function TooltipBalloon({ children, message }) {
  return (
    <div className="fixed top-4 right-4 group inline-block z-50">
      {children}

      <div
        className="opacity-0 group-hover:opacity-100 pointer-events-none
          absolute top-full right-0 mt-2 w-64 bg-white text-gray-900 rounded-md
          shadow-lg p-4 text-sm transition-opacity duration-300"
        style={{ whiteSpace: "normal" }}
      >
        <div className="relative">
          <div
            className="absolute top-[-2px] right-1 w-4 h-4 bg-white rotate-45
              border-l border-t border-gray-300"
          />
          {message}
        </div>
      </div>
    </div>
  );
}
