import React from "react";

export default function Successful({ message, type, onClose }) {
  const borderColor = type === "success" ? "border-green-500" : "border-green-700";
  const bgGradient = "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-opacity-90";
  const textColor = "text-white";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      role="presentation"
      aria-hidden="false"
    >
      <section
        className={`w-full max-w-md rounded-2xl shadow-2xl border-4 ${borderColor} p-8 flex flex-col items-center ${bgGradient}`}
        role="alertdialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <h2
          id="modal-title"
          className={`text-3xl font-extrabold mb-6 text-center ${textColor}`}
        >
          Atenção
        </h2>
        <p id="modal-description" className={`${textColor} text-center mb-6`}>
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-4/5 cursor-pointer h-12 rounded-lg border-2 border-green-600 bg-transparent text-white font-semibold hover:bg-[#126B4B] hover:shadow-lg transition duration-300 ease-in-out"
          aria-label="Fechar modal"
        >
          OK
        </button>
      </section>
    </div>
  );
}