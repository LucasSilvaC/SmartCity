import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../componentes/sensores/header/header";
import senai_map from "../../../public/senai_map.png";
import Card from "../../componentes/sensores/card/card_ambiente";
import { BsBuilding } from "react-icons/bs";

export default function HistoricoAmbiente() {
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const porPagina = 6;

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/ambientes/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAmbientes(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar ambientes");
        setLoading(false);
      });
  }, []);

  const ambientesFiltrados = ambientes.filter(
    (ambiente) =>
      ambiente.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      ambiente.sig.toString().toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(ambientesFiltrados.length / porPagina);
  const ambientesVisiveis = ambientesFiltrados.slice(
    (paginaAtual - 1) * porPagina,
    paginaAtual * porPagina
  );

  const handlePagina = (direcao) => {
    setPaginaAtual((antiga) => {
      if (direcao === "prev") return Math.max(1, antiga - 1);
      if (direcao === "next") return Math.min(totalPaginas, antiga + 1);
    });
  };

  return (
    <>
      <figure className="fixed inset-0 -z-10 overflow-hidden bg-[#191b1c]">
        <img
          src={senai_map}
          alt="Mapa do SENAI com desfoque"
          className="w-full h-full object-cover blur-sm"
          aria-describedby="descricao-img-fundo"
        />
        <figcaption id="descricao-img-fundo" className="sr-only">
          Imagem de fundo com mapa do SENAI utilizada como ambientação da interface.
        </figcaption>
      </figure>

      <header>
        <Header labels={{ middle: "Hist Ambientes" }} historicoPath="/" />
      </header>

      <main className="max-w-screen-xl mx-auto mt-[5%] px-6">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Histórico de Ambientes
        </h1>

        <section className="flex justify-center mb-6 flex-col items-center">
          <label className="text-white text-xl">Nome do ambiente</label>
          <input
            type="text"
            placeholder="Buscar por nome ou sigla..."
            className="w-full max-w-md px-4 py-2 rounded-md
             bg-gradient-to-br from-gray-800 to-gray-700
             text-white placeholder-gray-400
             border border-gray-600 shadow-md
             focus:outline-none focus:ring-2 focus:ring-gray-500
             transition-all duration-200"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPaginaAtual(1);
            }}
            aria-label="Campo de busca por nome ou sigla de ambiente"
          />
        </section>

        <section>
          {loading && <p className="text-white text-center">Carregando...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {!loading && !error && (
            <>
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {ambientesVisiveis.map((ambiente) => (
                  <article key={ambiente.id}>
                    <Card
                      sig={ambiente.sig}
                      descricao={ambiente.descricao}
                      ni={ambiente.ni}
                      responsavel={ambiente.responsavel}
                      Icon={BsBuilding}
                    />
                  </article>
                ))}
              </section>

              <nav className="flex justify-center mt-6 gap-4" aria-label="Paginação de ambientes">
                <button
                  onClick={() => handlePagina("prev")}
                  disabled={paginaAtual === 1}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 
                 text-white px-5 py-2 rounded-md shadow-md 
                 transition-transform duration-200 
                 hover:scale-105 hover:shadow-lg 
                 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Página anterior"
                >
                  ◀ Anterior
                </button>

                <span className="text-gray-300 px-4 py-2 font-mono">
                  Página {paginaAtual} de {totalPaginas}
                </span>

                <button
                  onClick={() => handlePagina("next")}
                  disabled={paginaAtual === totalPaginas}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 
                 text-white px-5 py-2 rounded-md shadow-md 
                 transition-transform duration-200 
                 hover:scale-105 hover:shadow-lg 
                 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Próxima página"
                >
                  Próximo ▶
                </button>
              </nav>
            </>
          )}
        </section>
      </main>
    </>
  );
}