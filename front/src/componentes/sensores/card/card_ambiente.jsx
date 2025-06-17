import "./card.css";

export default function Card({ sig, descricao, ni, responsavel, Icon }) {
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
          aria-label="Ícone representativo do ambiente"
          role="img"
          focusable="false"
        />
      )}

      <header>
        <h2 className="text-white z-10 text-xl mb-3 font-semibold tracking-wide">
          {descricao}
        </h2>
      </header>

      <section
        className="relative z-10 grid grid-cols-2 gap-y-4 w-full max-w-sm mx-auto text-gray-300 text-sm"
        aria-label="Informações do cartão"
      >
        <dl>
          <dt className="font-semibold text-gray-400 uppercase tracking-wide">SIG</dt>
          <dd>{sig}</dd>
        </dl>

        <dl>
          <dt className="font-semibold text-gray-400 uppercase tracking-wide">Nº NI</dt>
          <dd>{ni}</dd>
        </dl>

        <dl className="col-span-2">
          <dt className="font-semibold text-gray-400 uppercase tracking-wide">Responsável</dt>
          <dd className="mt-1">{responsavel}</dd>
        </dl>
      </section>
    </article>
  );
}