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
      className="
        relative 
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
        border border-gray-700 rounded-md 
        w-[28rem] h-[14rem] p-6 
        shadow-xl 
        transition-transform transition-shadow duration-300 
        overflow-hidden
        cursor-pointer
        hover:scale-105 
        hover:shadow-2xl
      "
    >
      <div
        className="
          pointer-events-none
          absolute -top-16 -left-32 w-20 h-[150%] 
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          transform -skew-x-12
          opacity-0
          hover:opacity-70
          transition-opacity duration-500
          animate-refletir
        "
      />

      <h2 className="relative z-10 text-white text-3xl font-extrabold mb-5 tracking-wide truncate">
        {sensor}
      </h2>

      <div className="relative z-10 grid grid-cols-3 gap-x-8 gap-y-4 text-gray-300 text-sm">
        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">MAC Address</p>
          <p className="mt-1 font-mono break-words">{mac_address}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">Unidade</p>
          <p className="mt-1 capitalize">{unidade_med}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">Status</p>
          <p
            className={`mt-1 font-semibold ${status.toLowerCase() === "ativo"
              ? "text-green-400"
              : "text-red-400"
              }`}
          >
            {status}
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">Latitude</p>
          <p className="mt-1">{latitude.toFixed(5)}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">Longitude</p>
          <p className="mt-1">{longitude.toFixed(5)}</p>
        </div>

        <div />
      </div>

      {Icon && (
        <Icon
          className="absolute bottom-5 right-5 cursor-pointer text-gray-500 text-3xl opacity-50 hover:opacity-90 transition-opacity duration-300"
          title="Sensor Icon"
        />
      )}

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
