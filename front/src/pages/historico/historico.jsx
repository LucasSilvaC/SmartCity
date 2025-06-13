import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../componentes/sensores/header/header";
import senai_map from "../../../public/senai_map.png";
import CardHistorico from "../../componentes/sensores/card/card_historico";
import { SelectTable } from "../../componentes/select/selectTable";
import { HiOutlineRefresh } from "react-icons/hi";
import {
  MdOutlineSensors,
  MdCountertops,
} from "react-icons/md";
import { GoLightBulb } from "react-icons/go";
import { WiHumidity } from "react-icons/wi";
import { FaThermometerEmpty } from "react-icons/fa";

export default function Historico() {
  const navigate = useNavigate();
  const [historicos, setHistoricos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sensorFilter, setSensorFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("true");

  const [startIndex, setStartIndex] = useState(0);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
  const [tempoDesdeAtualizacao, setTempoDesdeAtualizacao] = useState(0);

  const intervaloTrocaRef = useRef(null);
  const intervaloTempoRef = useRef(null);

  const [tooltipText, setTooltipText] = useState("Limpar filtros");
  const [showTooltip, setShowTooltip] = useState(false);

  const cardsPorPagina = 6;

  const optionsSensor = [
    { value: "todos", label: "Todos" },
    { value: "luminosidade", label: "Luminosidade" },
    { value: "contador", label: "Contador" },
    { value: "umidade", label: "Umidade" },
    { value: "temperatura", label: "Temperatura" },
  ];

  const optionsStatus = [
    { value: "true", label: "Ativo" },
    { value: "false", label: "Inativo" },
  ];

  function getIconBySensorType(sensorName) {
    const tipo = sensorName.split("_")[0].toLowerCase();

    switch (tipo) {
      case "contador":
        return MdCountertops;
      case "luminosidade":
        return GoLightBulb;
      case "umidade":
        return WiHumidity;
      case "temperatura":
        return FaThermometerEmpty;
      default:
        return MdOutlineSensors;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    const statusBoolean = statusFilter === "true";

    axios
      .get(`http://127.0.0.1:8000/api/historicos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...(sensorFilter !== "todos" && { sensor: sensorFilter }),
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
      setStartIndex(
        (prevIndex) => (prevIndex + cardsPorPagina) % historicos.length
      );
      setUltimaAtualizacao(Date.now());
      setTempoDesdeAtualizacao(0);
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
  }, [historicos, ultimaAtualizacao]);

  const historicosVisiveis = [];
  for (let i = 0; i < cardsPorPagina; i++) {
    if (historicos.length === 0) break;
    const idx = (startIndex + i) % historicos.length;
    historicosVisiveis.push(historicos[idx]);
  }

  const handleClearFilters = () => {
    setSensorFilter("todos");
    setStatusFilter("true");
    setTooltipText("Filtros limpos!");
    setTimeout(() => {
      setTooltipText("Limpar filtros");
    }, 1500);
  };

  return (
    <>
      <figure className="fixed inset-0 -z-10 overflow-hidden bg-[#191b1c]">
        <img
          src={senai_map}
          alt="Mapa do SENAI com efeito de desfoque"
          className="w-full h-full object-cover blur-sm"
          aria-describedby="descricao-imagem-fundo"
        />
        <figcaption id="descricao-imagem-fundo" className="sr-only">
          Imagem de fundo do mapa do SENAI utilizada para ambientar a interface.
        </figcaption>
      </figure>

      <header>
        <Header
          onMiddleClick={() => console.log("Botão do meio clicado")}
          labels={{
            left: "Voltar",
            middle: "Histórico",
            right: "Registros",
          }}
        />
      </header>

      <main className="max-w-screen-xl mx-auto mt-[5%] px-6">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Histórico de Sensores
        </h1>

        <section className="flex justify-center items-end gap-6 mb-6 relative">
          <SelectTable
            options={optionsSensor}
            selectedOption={{ label: sensorFilter, value: sensorFilter }}
            setSelectedOption={(option) => setSensorFilter(option.value)}
            tituloInput="Selecione o tipo de Sensor"
          />

          <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {showTooltip && (
              <div className="absolute bottom-full mb-2 px-3 py-1 text-white text-md z-50 text-center">
                {tooltipText}
              </div>
            )}
            <HiOutlineRefresh
              className="text-4xl text-white cursor-pointer mb-3 transition-all hover:-translate-y-3"
              onClick={handleClearFilters}
              aria-label="Atualizar filtros"
              role="button"
            />
          </div>

          <SelectTable
            options={optionsStatus}
            selectedOption={{
              label: statusFilter === "true" ? "Ativo" : "Inativo",
              value: statusFilter,
            }}
            setSelectedOption={(option) => setStatusFilter(option.value)}
            tituloInput="Selecione o status de atividade"
          />
        </section>

        <section>
          {loading && (
            <p className="text-white text-center">Carregando históricos...</p>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {!loading && !error && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {historicosVisiveis.map((historico) => {
                const sensorName = historico.sensor.sensor || "";
                const Icon = getIconBySensorType(sensorName);

                return (
                  <article key={historico.id}>
                    <CardHistorico
                      sensor={historico.sensor}
                      status={historico.sensor.status ? "Ativo" : "Inativo"}
                      valor={historico.valor}
                      timestamp={historico.timestamp}
                      Icon={Icon}
                    />
                  </article>
                );
              })}
            </section>
          )}
        </section>
      </main>
    </>
  );
}
