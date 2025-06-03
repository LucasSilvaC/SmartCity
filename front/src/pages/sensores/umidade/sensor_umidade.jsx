import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../componentes/sensores/header/header";
import Panel from "../../../componentes/sensores/panel/panel";
import senai_map from "../../../../public/senai_map.png";
import Line from "../../../componentes/sensores/line/line";
import Table from "../../../componentes/sensores/table/table";
import Card from "../../../componentes/sensores/card/card_sensor";
import { WiHumidity } from "react-icons/wi";

function formatTempoDecorrido(segundos) {
    if (segundos < 60) {
        return `${segundos}s`;
    } else {
        const minutos = Math.floor(segundos / 60);
        const seg = segundos % 60;
        return `${minutos}m ${seg}s`;
    }
}

export default function Sensor_umidade() {
    const navigate = useNavigate();
    const [sensores, setSensores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [startIndex, setStartIndex] = useState(0);
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
    const [tempoDesdeAtualizacao, setTempoDesdeAtualizacao] = useState(0);

    const [sensoresNaTabela, setSensoresNaTabela] = useState([]);

    const intervaloTrocaRef = useRef(null);
    const intervaloTempoRef = useRef(null);

    const limitTabela = 8;

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("http://127.0.0.1:8000/api/sensores/?unidade_med=umidade", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setSensores(response.data);
                setLoading(false);
                setUltimaAtualizacao(Date.now());
                setSensoresNaTabela([]);
            })
            .catch((err) => {
                setError(err.message || "Erro ao carregar sensores");
                setLoading(false);
            });
    }, []);

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
    }, [sensores, ultimaAtualizacao]);

    const sensoresVisiveis = [];
    for (let i = 0; i < 3; i++) {
        const idx = (startIndex + i) % sensores.length;
        sensoresVisiveis.push(sensores[idx]);
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
                    middle: "umidade",
                    right: "Registros",
                }}
            />

            <div className="flex mt-[7%] max-w-[1400px] w-full mx-auto justify-center items-start gap-4">
                <Table sensores={sensoresNaTabela} limit={limitTabela} />
                <div className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 relative z-20 flex w-[60%] flex-col justify-between p-6 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
                    <Panel label="umidade" count={sensores.length} />
                </div>
            </div>

            <Line text={formatTempoDecorrido(tempoDesdeAtualizacao)} />

            <div className="flex max-w-[1530px] mt-[2%] w-full mx-auto justify-center items-start gap-13 flex-wrap">
                {loading && <p className="text-white">Carregando sensores...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading &&
                    !error &&
                    sensoresVisiveis.map((sensor) => (
                        <Card
                            key={sensor.id}
                            sensor={sensor.sensor}
                            mac_address={sensor.mac_address}
                            unidade_med={sensor.unidade_med}
                            status={sensor.status ? "Ativo" : "Inativo"}
                            latitude={sensor.latitude}
                            longitude={sensor.longitude}
                            Icon={WiHumidity}
                        />
                    ))}
            </div>
        </>
    );
}