import React from "react";
import { FaTree } from "react-icons/fa6";

export default function Panel({ label, count }) {
  const nomeSensor = label.toLowerCase();
  let decision = "";
  if (count > 199) {
    decision = "Tipo de sensor";
  }

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 border border-gray-700">
      <FaTree className="absolute text-white/80 text-[18rem] bottom-[-2rem] right-[-1rem] z-0" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col justify-between h-full px-6 py-4 text-white">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{label.toUpperCase()}</h2>
          <p className="text-sm text-gray-200 mt-1 uppercase">{decision}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-block bg-opacity-80 px-4 py-1 rounded-full font-medium text-lg shadow-sm">
            Total: {count}
          </span>
        </div>
      </div>
    </div>
  );
}
