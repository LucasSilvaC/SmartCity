import "./card.css";

export default function Card({
  sensor,
  mac_address,
  unidade_med,
  status,
  latitude,
  longitude,
  Icon,
}) {
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
          className="text-6xl text-white drop-shadow-md mb-2"
          aria-label="Ícone do sensor"
          role="img"
          focusable="false"
        />
      )}

      <header>
        <h2 className="text-white z-10 text-xl mb-3">
          {sensor?.split("_")[0] || sensor}
        </h2>
      </header>

      <section
        className="relative z-10 grid grid-cols-2 gap-y-4 w-full max-w-sm mx-auto text-gray-300 text-sm"
        aria-label="Informações detalhadas do sensor"
      >
        <dl>
          <dt className="font-semibold text-gray-400 uppercase tracking-wide">MAC Address</dt>
          <dd className="mt-1 break-words">{mac_address}</dd>
        </dl>

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

        <dl>
          <dt className="font-semibold text-gray-400 uppercase tracking-wide">Unidade</dt>
          <dd className="mt-1 capitalize">{unidade_med}</dd>
        </dl>

        <dl>
          <dt className="font-semibold text-gray-400 uppercase tracking-wide">Latitude</dt>
          <dd className="mt-1">{latitude ? latitude.toFixed(5) : "N/A"}</dd>
        </dl>

        <dl>
          <dt className="font-semibold text-gray-400 uppercase tracking-wide">Longitude</dt>
          <dd className="mt-1">{longitude ? longitude.toFixed(5) : "N/A"}</dd>
        </dl>
      </section>
    </article>
  );
}