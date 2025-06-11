export default function Card({
  sig,
  descricao,
  ni,
  responsavel,
  Icon,
}) {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-md w-[20rem] h-[14rem] p-4 shadow-xl transition-transform transition-shadow duration-300 overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl">
      <div className="pointer-events-none absolute -top-16 -left-32 w-20 h-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 opacity-0 hover:opacity-70 transition-opacity duration-500 animate-refletir" />

      <h2 className="relative z-10 text-white text-2xl font-extrabold mb-4 tracking-wide truncate">
        {descricao}
      </h2>

      <div className="relative z-10 grid grid-cols-3 gap-x-4 gap-y-3 text-gray-300 text-xs">
        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">SIG</p>
          <p className="mt-1">{sig}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">Nº NI</p>
          <p className="mt-1">{ni}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide">Responsável</p>
          <p className="mt-1">{responsavel}</p>
        </div>
      </div>

      {Icon && (
        <Icon
          className="absolute bottom-3 right-3 cursor-pointer text-gray-500 text-2xl opacity-50 hover:opacity-90 transition-opacity duration-300"
          title="Ambiente Icon"
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
