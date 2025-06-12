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
    <div
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  border border-gray-700 rounded-md w-[28rem] h-[16rem] p-6
                  shadow-xl transition-transform transition-shadow duration-300
                  overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl
                  flex flex-col items-center text-center"
    >
      <div
        className="pointer-events-none absolute -top-16 -left-32 w-20 h-[150%]
                    bg-gradient-to-r from-transparent via-white/40 to-transparent
                    transform -skew-x-12 opacity-0 hover:opacity-70
                    transition-opacity duration-500 animate-refletir"
      />

      {Icon && (
        <Icon
          className="text-6xl text-white drop-shadow-md mb-2"
          title="Sensor"
        />
      )}

      <h2 className="text-white z-10 text-xl mb-3">
        {sensor?.split("_")[0] || sensor}
      </h2>

      <div className="relative z-10 grid grid-cols-2 gap-y-4 w-full max-w-sm mx-auto text-gray-300 text-sm">
        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">
            MAC Address
          </p>
          <p className="mt-1 font-mono break-words">{mac_address}</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Status
          </p>
          <span
            className={`w-4 h-4 rounded-full mt-1 ${
              status.toLowerCase() === "ativo"
                ? "bg-green-400"
                : "bg-red-500"
            }`}
            title={status}
          />
        </div>

        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">
            Unidade
          </p>
          <p className="mt-1 capitalize">{unidade_med}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">
            Latitude
          </p>
          <p className="mt-1">{latitude ? latitude.toFixed(5) : "N/A"}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">
            Longitude
          </p>
          <p className="mt-1">{longitude ? longitude.toFixed(5) : "N/A"}</p>
        </div>
      </div>

      <style>{`
        @keyframes refletir {
          0% {
            transform: translateX(-100%) skewX(-12deg);
            opacity: 0;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
            opacity: 0;
          }
        }
        .animate-refletir {
          animation: refletir 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}