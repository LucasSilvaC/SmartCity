import React from "react";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function Line({ text = "11:59:00" }) {
  return (
    <div className="flex items-center w-[80%] mx-auto mt-[3%]">
      <FaClockRotateLeft className="text-white text-3xl mr-4" />

      <hr className="border-t border-white w-[5%] mr-2" />

      <span className="text-white whitespace-nowrap bg-black/60 rounded-sm p-1">Atualização há: {text}</span>

      <hr className="border-t border-white flex-1 ml-2" />
    </div>
  );
}
