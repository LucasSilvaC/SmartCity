export default function Card({
    sensor,
    status,
    valor,
    timestamp,
    Icon,
}) {
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
        <div
            className="
                relative
                bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                border border-gray-700 rounded-md
                w-[28rem] h-[16rem] p-6
                shadow-xl
                transition-transform transition-shadow duration-300
                overflow-hidden
                cursor-pointer
                hover:scale-105
                hover:shadow-2xl
                flex flex-col items-center text-center
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

            {Icon && (
              <Icon
                className="relative z-0 text-gray-200 w-16 h-16 mb-4 mx-auto"
                title="Sensor Icon"
              />
            )}

            <h2 className="relative z-10 text-white text-3xl font-extrabold mb-6 tracking-wide truncate w-full">
                {sensor}
            </h2>

            <div className="relative z-10 grid grid-cols-1 gap-y-4 w-full max-w-xs mx-auto text-gray-300 text-sm">
                <div>
                    <p className="font-semibold text-gray-400 uppercase tracking-wide">Status</p>
                    <p
                        className={`mt-1 font-semibold ${
                            status.toLowerCase() === "ativo"
                                ? "text-green-400"
                                : "text-red-400"
                        }`}
                    >
                        {status}
                    </p>
                </div>

                <div>
                    <p className="font-semibold text-gray-400 uppercase tracking-wide">Valor</p>
                    <p className="mt-1 font-mono">{valor !== undefined ? valor : "-"}</p>
                </div>

                <div>
                    <p className="font-semibold text-gray-400 uppercase tracking-wide">Timestamp</p>
                    <p className="mt-1 font-mono">{formatDate(timestamp)}</p>
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
