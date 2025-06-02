import React from "react";
import { BsPersonStanding } from "react-icons/bs";

export default function Card({
  sensor,
  mac_address,
  unidade_med,
  status,
  latitude,
  longitude,
}) {
  return (
    <div className="relative bg-black/60 border border-white rounded-lg w-[25rem] h-[14rem] p-6 shadow-lg overflow-hidden">
      <h2 className="text-white text-2xl font-bold mb-4">{sensor}</h2>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-white text-sm">
        <div>
          <p className="font-semibold">MAC Address</p>
          <p className="mt-1">{mac_address}</p>
        </div>

        <div>
          <p className="font-semibold">Unidade de Medida</p>
          <p className="mt-1">{unidade_med}</p>
        </div>

        <div>
          <p className="font-semibold">Status</p>
          <p className="mt-1">{status}</p>
        </div>

        <div>
          <p className="font-semibold">Latitude</p>
          <p className="mt-1">{latitude}</p>
        </div>

        <div>
          <p className="font-semibold">Longitude</p>
          <p className="mt-1">{longitude}</p>
        </div>
      </div>

      <BsPersonStanding className="absolute bottom-4 right-4 text-white text-2xl opacity-75 hover:opacity-100 transition-opacity" />
    </div>
  );
}