import React from "react";

const imagens = import.meta.glob('../../../assets/Sensores/*.png', { eager: true });

export default function Panel({ label, count }) {
  const nomeSensor = label.toLowerCase();
  const imagemKey = Object.keys(imagens).find((key) =>
    key.toLowerCase().includes(`${nomeSensor}.png`)
  );
  const imagemPath = imagemKey ? imagens[imagemKey].default : "";

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
      {imagemPath && (
        <img
          src={imagemPath}
          alt={`Sensor ${label}`}
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col justify-between h-full px-6 py-4 text-white">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{label.toUpperCase()}</h2>
          <p className="text-sm text-gray-200 mt-1 uppercase">Tipo de sensor</p>
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
