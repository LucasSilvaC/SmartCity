import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../componentes/sensores/header/header";
import Panel from "../../componentes/sensores/panel/panel_ambientes";
import senai_map from "../../../public/senai_map.png";
import Line from "../../componentes/sensores/line/line";
import Card from "../../componentes/sensores/card/card_ambiente";
import ModalEditAmbiente from "../../componentes/modal/ambiente";
import { BsBuilding } from "react-icons/bs";

function formatTempoDecorrido(segundos) {
  if (segundos < 60) {
    return `${segundos}s`;
  } else {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${minutos}m ${seg}s`;
  }
}

export default function Ambientes() {
  const navigate = useNavigate();
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ambienteToEdit, setAmbienteToEdit] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
  const [tempoDesdeAtualizacao, setTempoDesdeAtualizacao] = useState(0);
  const [ambientesNaTabela, setAmbientesNaTabela] = useState([]);

  const intervaloTrocaRef = useRef(null);
  const intervaloTempoRef = useRef(null);
  const limitTabela = 8;

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
        setLoading(false);
        setUltimaAtualizacao(Date.now());
        setAmbientesNaTabela([]);
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar ambientes");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (ambientes.length === 0) return;

    intervaloTrocaRef.current = setInterval(() => {
      setStartIndex((prevIndex) => {
        const nextIndex = (prevIndex + 3) % ambientes.length;

        const ambientesSaindo = [];
        for (let i = 0; i < 3; i++) {
          const idx = (prevIndex + i) % ambientes.length;
          ambientesSaindo.push(ambientes[idx]);
        }

        setAmbientesNaTabela((prevTabela) => {
          const novosAmbientes = ambientesSaindo.filter(
            (s) => !prevTabela.some((t) => t.id === s.id)
          );

          const novaLista = [...prevTabela, ...novosAmbientes];

          if (novaLista.length > limitTabela) {
            return novaLista.slice(novaLista.length - limitTabela);
          }
          return novaLista;
        });

        setUltimaAtualizacao(Date.now());
        setTempoDesdeAtualizacao(0);

        return nextIndex;
      });
    }, 10000);

    intervaloTempoRef.current = setInterval(() => {
      setTempoDesdeAtualizacao(
        Math.floor((Date.now() - ultimaAtualizacao) / 1000)
      );
    }, 1000);

    return () => {
      clearInterval(intervaloTrocaRef.current);
      clearInterval(intervaloTempoRef.current);
    };
  }, [ambientes, ultimaAtualizacao]);

  const ambientesVisiveis = [];
  for (let i = 0; i < 3; i++) {
    const idx = (startIndex + i) % ambientes.length;
    ambientesVisiveis.push(ambientes[idx]);
  }

  const handleOpenModal = (ambiente = null) => {
    setAmbienteToEdit(ambiente);
    setModalOpen(true);
  };

  const handleSaveAmbiente = (ambienteSalvo) => {
    if (ambienteToEdit) {
      setAmbientes((prev) =>
        prev.map((a) => (a.id === ambienteSalvo.id ? ambienteSalvo : a))
      );
    } else {
      setAmbientes((prev) => [...prev, ambienteSalvo]);
    }
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <ModalEditAmbiente
          ambiente={ambienteToEdit}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveAmbiente}
        />
      )}

      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#191b1c]">
        <img
          src={senai_map}
          alt="Mapa estilizado do Senai como imagem de fundo"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      <Header
        onMiddleClick={() => console.log("Botão do meio clicado")}
        labels={{ middle: "Ambientes" }}
        historicoPath="/historico_ambiente"
      />

      <main className="flex mt-[5%] max-w-[1400px] w-full mx-auto justify-center items-start gap-4">
        <section
          aria-label="Painel de contagem de ambientes"
          className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 relative z-20 flex w-[60%] flex-col justify-between p-6 rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
        >
          <Panel label="Ambientes" count={ambientes.length} />
        </section>
      </main>

      <div className="flex justify-center mb-4 mt-6 px-4">
        <button
          onClick={() => handleOpenModal(null)}
          className="px-6 py-3 bg-[#16A34A] text-white font-bold hover:bg-[#126B4B] transition-transform duration-300 hover:scale-105 rounded-sm"
        >
          + Adicionar Ambiente
        </button>
      </div>

      <section aria-label="Tempo desde a última atualização" className="mt-4">
        <Line text={formatTempoDecorrido(tempoDesdeAtualizacao)} />
      </section>

      <section
        aria-label="Cartões de ambientes"
        className="flex max-w-[1530px] mt-[2%] w-full mx-auto justify-center items-start gap-13 flex-wrap"
      >
        {loading && <p className="text-white">Carregando ambientes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          ambientesVisiveis.map((ambiente) => (
            <article key={ambiente.id} onClick={() => handleOpenModal(ambiente)} className="cursor-pointer">
              <Card
                sig={ambiente.sig}
                descricao={ambiente.descricao}
                ni={ambiente.ni}
                responsavel={ambiente.responsavel}
                Icon={BsBuilding}
              />
            </article>
          ))
        }
      </section>
    </>
  );
}