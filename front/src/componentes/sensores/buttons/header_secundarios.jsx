import React from "react";

export default function ButtonHeaderSecundario({ onClick, children }) {
  return (
    <div className="max-w-md w-auto rounded-lg overflow-hidden" style={{ zIndex: 1000 }}>
      <button
        onClick={onClick}
        className="
          bg-[#00c476] 
          text-white 
          py-4 
          px-8 
          text-2xl 
          font-bold 
          cursor-pointer 
          w-full
          hover:bg-[#126b4b] 
          hover:scale-105 
          transition-transform 
          duration-300 
          ease-in-out
        "
        style={{
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
        }}
      >
        {children}
      </button>
    </div>
  );
}
