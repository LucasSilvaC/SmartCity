import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../componentes/sensores/header/header";
import senai_map from "../../../public/senai_map.png";
import Card from "../../componentes/sensores/card/card_historico";

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
  const [sensorFilter, setSensorFilter] = useState("luminosidade");

  const [startIndex, setStartIndex] = useState(0);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
  const [tempoDesdeAtualizacao, setTempoDesdeAtualizacao] = useState(0);

  const intervaloTrocaRef = useRef(null);
  const intervaloTempoRef = useRef(null);

  const cardsPorPagina = 6;

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/api/historicos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sensor: sensorFilter,
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
  }, [sensorFilter]);

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

      <div className="max-w-screen-xl mx-auto mt-[5%] px-6">
        <h1 className="text-5xl font-bold text-white text-center mb-6">Histórico de Sensores</h1>

        <div className="flex justify-center gap-4 mb-6">
          <select
            className="bg-gray-800 text-white py-3 px-6 cursor-pointer rounded-md shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 appearance-none"
            value={sensorFilter}
            onChange={(e) => setSensorFilter(e.target.value)}
          >
            <option value="luminosidade" className="hover:bg-gray-700 transition-colors">Luminosidade</option>
            <option value="contador" className="hover:bg-gray-700 transition-colors">Contador</option>
            <option value="umidade" className="hover:bg-gray-700 transition-colors">Umidade</option>
            <option value="temperatura" className="hover:bg-gray-700 transition-colors">Temperatura</option>
          </select>
        </div>

        {loading && <p className="text-white text-center">Carregando históricos...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {historicosVisiveis.map((historico) => (
              <Card
                key={historico.id}
                sensor={historico.sensor}
                mac_address={historico.sensor.mac_address}
                status={historico.sensor.status ? "Ativo" : "Inativo"}
                valor={historico.valor}
                timestamp={historico.timestamp}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
