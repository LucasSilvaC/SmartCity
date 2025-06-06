import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../componentes/sensores/header/header";
import senai_map from "../../../public/senai_map.png";
import CardHistorico from "../../componentes/sensores/card/card_historico";
import { SelectTable } from "../../componentes/select/selectTable";

export default function Historico() {
  const navigate = useNavigate();
  const [historicos, setHistoricos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sensorFilter, setSensorFilter] = useState("luminosidade");
  const [statusFilter, setStatusFilter] = useState("true"); 

  const [startIndex, setStartIndex] = useState(0);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
  const [tempoDesdeAtualizacao, setTempoDesdeAtualizacao] = useState(0);

  const intervaloTrocaRef = useRef(null);
  const intervaloTempoRef = useRef(null);

  const cardsPorPagina = 6;

  const optionsSensor = [
    { value: "luminosidade", label: "Luminosidade" },
    { value: "contador", label: "Contador" },
    { value: "umidade", label: "Umidade" },
    { value: "temperatura", label: "Temperatura" },
  ];

  const optionsStatus = [
    { value: "true", label: "Ativo" },
    { value: "false", label: "Inativo" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    const statusBoolean = statusFilter === "true";

    axios
      .get(`http://127.0.0.1:8000/api/historicos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sensor: sensorFilter,
          status: statusBoolean, 
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
  }, [sensorFilter, statusFilter]); 

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

        <div className="flex justify-center gap-4 mb-6 relative">
          <SelectTable
            options={optionsSensor}
            selectedOption={{ label: sensorFilter, value: sensorFilter }}
            setSelectedOption={(option) => setSensorFilter(option.value)}
            tituloInput="Selecione o tipo de Sensor"
          />
          
          <SelectTable
            options={optionsStatus}
            selectedOption={{ label: statusFilter === "true" ? "Ativo" : "Inativo", value: statusFilter }}
            setSelectedOption={(option) => setStatusFilter(option.value)}
            tituloInput="Selecione o status de atividade"
          />
        </div>

        {loading && <p className="text-white text-center">Carregando históricos...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {historicosVisiveis.map((historico) => (
              <CardHistorico
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
