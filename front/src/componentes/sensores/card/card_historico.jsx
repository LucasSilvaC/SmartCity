import "./card.css";

export default function CardHistorico({ sensor, status, valor, timestamp, Icon }) {
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <article
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  border border-gray-700 rounded-md w-[28rem] h-[16rem] p-6
                  shadow-xl transition-transform transition-shadow duration-300
                  overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl
                  flex flex-col items-center text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-32 w-20 h-[150%]
                   bg-gradient-to-r from-transparent via-white/40 to-transparent
                   transform -skew-x-12 opacity-0 hover:opacity-70
                   transition-opacity duration-500 animate-refletir"
      />

      {Icon && (
        <Icon
          className="text-7xl text-white drop-shadow-md mb-4"
          aria-label="Ícone do sensor"
          role="img"
          focusable="false"
        />
      )}

      <header>
        <h2 className="text-white z-10 text-2xl font-semibold mb-6">
          {sensor.sensor.split("_")[0] || sensor.sensor}
        </h2>
      </header>

      <section
        className="relative z-10 flex justify-around w-full max-w-xs mx-auto text-gray-300 text-sm"
        aria-label="Detalhes do sensor"
      >
        <dl className="flex flex-col items-center">
          <dt className="font-semibold text-gray-400 uppercase tracking-wide mb-1">Status</dt>
          <dd>
            <span
              className={`w-4 h-4 rounded-full mt-1 inline-block ${
                status.toLowerCase() === "ativo" ? "bg-green-400" : "bg-red-500"
              }`}
              title={status}
              aria-label={`Status: ${status}`}
              role="img"
            />
          </dd>
        </dl>

        <dl className="flex flex-col items-center">
          <dt className="font-semibold text-gray-400 uppercase tracking-wide mb-1">Valor</dt>
          <dd>{valor !== undefined ? valor : "-"}</dd>
        </dl>

        <dl className="flex flex-col items-center">
          <dt className="font-semibold text-gray-400 uppercase tracking-wide mb-1">Timestamp</dt>
          <dd>{formatDate(timestamp)}</dd>
        </dl>
      </section>
    </article>
  );
}