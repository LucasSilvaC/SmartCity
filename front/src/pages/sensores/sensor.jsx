import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../../componentes/sensores/header/header";
import Panel from "../../componentes/sensores/panel/panel";
import senai_map from "../../../public/senai_map.png";
import Line from "../../componentes/sensores/line/line";
import Table from "../../componentes/sensores/table/table";
import Card from "../../componentes/sensores/card/card_sensor";
import ModalEditSensor from "../../componentes/modal/sensor";

function formatTempoDecorrido(segundos) {
  if (segundos < 60) {
    return `${segundos}s`;
  } else {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${minutos}m ${seg}s`;
  }
}

export default function Sensor({ tipoSensor, icon, endpoint, label }) {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sensorToEdit, setSensorToEdit] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
  const [tempoDesdeAtualizacao, setTempoDesdeAtualizacao] = useState(0);
  const [sensoresNaTabela, setSensoresNaTabela] = useState([]);
  const intervaloTrocaRef = useRef(null);
  const intervaloTempoRef = useRef(null);
  const limitTabela = 3;

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/api/sensores/?unidade_med=${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSensores(response.data);
        setLoading(false);
        setUltimaAtualizacao(Date.now());
        setSensoresNaTabela(response.data.slice(0, limitTabela));
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar sensores");
        setLoading(false);
      });
  }, [endpoint]);

  useEffect(() => {
    if (sensores.length === 0) return;

    intervaloTrocaRef.current = setInterval(() => {
      setStartIndex((prevIndex) => {
        const nextIndex = (prevIndex + 3) % sensores.length;

        const sensoresSaindo = [];
        for (let i = 0; i < 3; i++) {
          const idx = (prevIndex + i) % sensores.length;
          sensoresSaindo.push(sensores[idx]);
        }

        setSensoresNaTabela((prevTabela) => {
          const novosSensores = sensoresSaindo.filter(
            (s) => !prevTabela.some((t) => t.id === s.id)
          );

          const novaLista = [...prevTabela, ...novosSensores];

          if (novaLista.length > limitTabela) {
            return novaLista.slice(novaLista.length - limitTabela);
          }
          return novaLista;
        });

        setUltimaAtualizacao(Date.now());
        setTempoDesdeAtualizacao(0);

        return nextIndex;
      });
    }, 30000);

    intervaloTempoRef.current = setInterval(() => {
      setTempoDesdeAtualizacao(
        Math.floor((Date.now() - ultimaAtualizacao) / 1000)
      );
    }, 1000);

    return () => {
      clearInterval(intervaloTrocaRef.current);
      clearInterval(intervaloTempoRef.current);
    };
  }, [sensores, ultimaAtualizacao]);

  const handleCardClick = (sensor) => {
    setSensorToEdit(sensor);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveSensor = (savedSensor) => {
    if (sensorToEdit) {
      const updatedList = sensores.map(sensor =>
        sensor.id === savedSensor.id ? savedSensor : sensor
      );
      setSensores(updatedList);
    } else {
      setSensores(prev => [...prev, savedSensor]);
    }

    setSensoresNaTabela(prev => {
      const nova = [...prev.filter(s => s.id !== savedSensor.id), savedSensor];
      return nova.slice(-limitTabela);
    });

    handleCloseModal();
  };

  const handleDeleteSensor = async (sensorId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://127.0.0.1:8000/api/sensor/${sensorId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSensores(sensores.filter(sensor => sensor.id !== sensorId));
      setSensoresNaTabela(sensoresNaTabela.filter(sensor => sensor.id !== sensorId));
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao excluir o sensor:", error);
    }
  };

  return (
    <>
      {modalOpen && (
        <ModalEditSensor
          sensor={sensorToEdit}
          onClose={handleCloseModal}
          onSave={handleSaveSensor}
          onDelete={handleDeleteSensor}
        />
      )}

      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#191b1c]">
        <img
          src={senai_map}
          alt="Mapa estilizado do Senai como imagem de fundo"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      <Header onMiddleClick={() => console.log("Botão do meio clicado")} labels={{ middle: label }} />

      <main className="mt-[7%] max-w-[1400px] w-full mx-auto">
        <section aria-label={`Painel de sensores e tabela de ${label}`} className="flex justify-center items-start gap-4">
          <Table sensores={sensoresNaTabela} limit={limitTabela} />
          <div aria-label={`Painel com total de sensores de ${label}`} className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 relative z-20 flex w-[60%] flex-col justify-between p-6 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <Panel label={label} count={sensores.length} />
          </div>
        </section>

        <div className="flex justify-center mb-4 mt-4 px-4">
          <button
            onClick={() => {
              setSensorToEdit(null); 
              setModalOpen(true);
            }}
             className="px-6 py-3 cursor-pointer bg-[#16A34A] hover:bg-[#126B4B] text-white font-bold transition-transform duration-300 hover:scale-105 rounded-sm"
          >
            + Adicionar Sensor
          </button>
        </div>

        <section aria-label="Tempo desde a última atualização" className="mt-4">
          <Line text={formatTempoDecorrido(tempoDesdeAtualizacao)} />
        </section>

        <section
          aria-label={`Lista de cartões de sensores de ${label}`}
          className="flex max-w-[1530px] mt-[2%] w-full mx-auto justify-center items-start gap-13 flex-wrap mb-[3rem]"
          aria-live="polite"
        >
          {loading && <p className="text-white">Carregando sensores...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading &&
            !error &&
            sensoresNaTabela.map((sensor) => (
              <article key={sensor.id} onClick={() => handleCardClick(sensor)}>
                <Card
                  sensor={sensor.sensor}
                  mac_address={sensor.mac_address}
                  unidade_med={sensor.unidade_med}
                  status={sensor.status ? "Ativo" : "Inativo"}
                  latitude={sensor.latitude}
                  longitude={sensor.longitude}
                  Icon={icon}
                />
              </article>
            ))}
        </section>
      </main>
    </>
  );
}