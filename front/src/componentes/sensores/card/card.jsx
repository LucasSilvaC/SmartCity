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
    <article className="relative bg-black/60 border border-white rounded-lg w-[25rem] h-[14rem] p-6 shadow-lg overflow-hidden text-white">
      <header>
        <h2 className="text-2xl font-bold mb-4">{sensor}</h2>
      </header>

      <section className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm" aria-label="Detalhes do sensor">
        <dl>
          <dt className="font-semibold">MAC Address</dt>
          <dd className="mt-1">{mac_address}</dd>
        </dl>

        <dl>
          <dt className="font-semibold">Unidade de Medida</dt>
          <dd className="mt-1">{unidade_med}</dd>
        </dl>

        <dl>
          <dt className="font-semibold">Status</dt>
          <dd className="mt-1">{status}</dd>
        </dl>

        <dl>
          <dt className="font-semibold">Latitude</dt>
          <dd className="mt-1">{latitude}</dd>
        </dl>

        <dl>
          <dt className="font-semibold">Longitude</dt>
          <dd className="mt-1">{longitude}</dd>
        </dl>
      </section>

      <BsPersonStanding
        className="absolute bottom-4 right-4 text-white text-2xl opacity-75 hover:opacity-100 transition-opacity"
        role="img"
        aria-label="Ícone representando pessoa em pé"
      />
    </article>
  );
}