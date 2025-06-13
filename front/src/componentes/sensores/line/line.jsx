import React from "react";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function Line({ text = "11:59:00" }) {
  return (
    <section
      className="w-[80%] mx-auto mt-[2%]"
      aria-label="Status de atualização dos sensores"
    >
      <header>
        <h1 className="text-white text-center mb-2 font-bold text-3xl">
          Sensores
        </h1>
      </header>

      <div className="flex items-center">
        <FaClockRotateLeft
          className="text-white text-3xl mr-4"
          aria-hidden="true"
        />

        <hr className="border-t border-white w-[5%] mr-2" />

        <time
          className="text-white whitespace-nowrap bg-black/60 rounded-sm p-1"
          dateTime={text}
        >
          Atualização há: {text}
        </time>

        <hr className="border-t border-white flex-1 ml-2" />
      </div>
    </section>
  );
}