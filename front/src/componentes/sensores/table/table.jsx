import React from "react";

export default function Table() {
  const rows = [
    { colunaA: "Item 1", colunaB: "Descrição 1" },
    { colunaA: "Item 2", colunaB: "Descrição 2" },
    { colunaA: "Item 3", colunaB: "Descrição 3" },
    { colunaA: "Item 4", colunaB: "Descrição 4" },
    { colunaA: "Item 5", colunaB: "Descrição 5" },
  ];

  return (
    <div className="h-full w-[40%] flex flex-col rounded-sm shadow-lg overflow-hidden border border-white">
      <div className="flex-1 overflow-auto">
        <table className="w-full h-full table-fixed">
          <thead className="bg-[#126b4b]">
            <tr>
              <th className="w-1/2 px-4 py-3 text-left text-white font-medium uppercase">
                Sensor
              </th>
              <th className="w-1/2 px-4 py-3 text-left text-white font-medium uppercase">
                MAC Adress
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={`
                  ${idx % 2 === 0 ? "bg-black/60" : "bg-black/20"}
                  hover:bg-black/40 hover:cursor-pointer
                  transition-colors 
                  duration-200
                `}
              >
                <td className="px-4 py-3 text-white">{row.colunaA}</td>
                <td className="px-4 py-3 text-white">{row.colunaB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
