import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../componentes/sensores/header/header";
import senai_map from "../../../public/senai_map.png";
import Card from "../../componentes/sensores/card/card_historico";
import { BsPersonStanding } from "react-icons/bs";

function formatTempoDecorrido(segundos) {
  if (segundos < 60) {
    return `${segundos}s`;
  } else {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${minutos}m ${seg}s`;
  }
}

export default function Historico() {
  const navigate = useNavigate();
  const [historicos, setHistoricos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startIndex, setStartIndex] = useState(0);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
  const [tempoDesdeAtualizacao, setTempoDesdeAtualizacao] = useState(0);

  const intervaloTrocaRef = useRef(null);
  const intervaloTempoRef = useRef(null);

  const cardsPorPagina = 4;

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/historicos/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHistoricos(response.data);
        setLoading(false);
        setUltimaAtualizacao(Date.now());
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar históricos");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (historicos.length === 0) return;

    intervaloTrocaRef.current = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + cardsPorPagina) % historicos.length);
      setUltimaAtualizacao(Date.now());
      setTempoDesdeAtualizacao(0);
    }, 10000);

    intervaloTempoRef.current = setInterval(() => {
      setTempoDesdeAtualizacao(Math.floor((Date.now() - ultimaAtualizacao) / 1000));
    }, 1000);

    return () => {
      clearInterval(intervaloTrocaRef.current);
      clearInterval(intervaloTempoRef.current);
    };
  }, [historicos, ultimaAtualizacao]);

  const historicosVisiveis = [];
  for (let i = 0; i < cardsPorPagina; i++) {
    if (historicos.length === 0) break;
    const idx = (startIndex + i) % historicos.length;
    historicosVisiveis.push(historicos[idx]);
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#191b1c]">
        <img
          src={senai_map}
          alt="Imagem de fundo"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      <Header
        onMiddleClick={() => console.log("Botão do meio clicado")}
        labels={{
          left: "Voltar",
          middle: "Histórico",
          right: "Registros",
        }}
      />

      <div className="flex max-w-[1530px] mt-[13%] w-full mx-auto justify-center items-start gap-13 flex-wrap">
        {loading && <p className="text-white">Carregando históricos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          historicosVisiveis.map((historico) => (
            <Card
              key={historico.id}
              sensor={historico.sensor.sensor}
              mac_address={historico.sensor.mac_address}
              status={historico.sensor.status ? "Ativo" : "Inativo"}
              valor={historico.valor}
              timestamp={historico.timestamp}
              Icon={BsPersonStanding} 
            />
          ))}
      </div>
    </>
  );
}