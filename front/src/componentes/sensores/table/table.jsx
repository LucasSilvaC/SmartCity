import React from "react";

export default function Table({ sensores = [], limit = 10 }) {
  const sensoresLimitados = sensores.slice(0, limit);

  return (
    <div className="h-full w-[40%] flex flex-col rounded-sm shadow-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex-1 overflow-auto">
        <table className="w-full h-full table-fixed">
          <thead className="bg-gradient-to-r from-green-700 via-[#126b4b] to-green-700">
            <tr>
              <th className="w-1/3 px-4 py-3 text-left text-white font-semibold uppercase tracking-wide">
                Unidade
              </th>
              <th className="w-1/3 px-4 py-3 text-left text-white font-semibold uppercase tracking-wide">
                Status
              </th>
              <th className="w-1/3 px-4 py-3 text-left text-white font-semibold uppercase tracking-wide">
                Mac Address
              </th>
            </tr>
          </thead>

          <tbody>
            {sensoresLimitados.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-3 text-center text-gray-400 italic"
                >
                  Nenhum sensor exibido ainda.
                </td>
              </tr>
            )}
            {sensoresLimitados.map((sensor, idx) => (
              <tr
                key={sensor.id}
                className={`${
                  idx % 2 === 0 ? "bg-black/60" : "bg-black/30"
                } hover:bg-black/40 hover:cursor-pointer transition-colors duration-200`}
              >
                <td className="px-4 py-3 text-white capitalize">{sensor.unidade_med}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    sensor.status ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {sensor.status ? "Ativo" : "Inativo"}
                </td>
                <td className="px-4 py-3 text-white truncate">{sensor.mac_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
