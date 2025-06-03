import React from "react";

const imagens = import.meta.glob('../../../assets/Sensores/*.png', { eager: true });

export default function Panel({ label, count }) {
  const nomeSensor = label.toLowerCase();

  const imagemKey = Object.keys(imagens).find((key) =>
    key.toLowerCase().includes(`${nomeSensor}.png`)
  );

  const imagemPath = imagemKey ? imagens[imagemKey].default : "";

  return (
    <div className="relative w-full h-[25rem] rounded-sm overflow-hidden shadow-xl">
      {imagemPath && (
        <img
          src={imagemPath}
          alt={`Sensor ${label}`}
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

      <div className="relative z-10 flex flex-col h-full px-8 py-6 text-white">
        <h2 className="text-4xl font-extrabold tracking-wide">{label.toUpperCase()}</h2>
        <p className="text-gray-300 text-lg mt-2">Tipo de sensor</p>

        <div className="flex-grow" />

        <div className="mt-auto">
          <span className="inline-block bg-[#126b4b] bg-opacity-80 px-5 py-2 rounded-sm font-semibold text-2xl shadow-lg select-none">
            Total: {count}
          </span>
        </div>
      </div>
    </div>
  );
}
