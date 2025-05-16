import React from "react";
import keyboard_help from "../../assets/arrows.png"; 

export default function Keyboard_help() {
  return (
    <div
      className="fixed bottom-4 right-4 w-64 h-64 bg-[#1e1e1e] text-white rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center z-50"
    >
      <img
        src={keyboard_help}
        alt="Teclas direcionais"
        className="w-40 h-25 mb-4 animate-pulse-slow"
      />
      <p className="text-center text-sm font-medium text-gray-300">
        Para se mover, use as setas direcionais!
      </p>
    </div>
  );
}
