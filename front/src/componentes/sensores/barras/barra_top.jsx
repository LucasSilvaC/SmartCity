import { useState } from "react";
import TopbarButton from "../buttons/barra_top";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { FaBoltLightning } from "react-icons/fa6";
import { BsPersonStanding } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

export default function TopBar() {
  const [showHelp, setShowHelp] = useState(false);

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  return (
    <nav
      aria-label="Navegação de sensores"
      className="
        fixed top-4 left-1/2 -translate-x-1/2 
        w-[32%] bg-black/70 backdrop-blur-md h-[4.8rem]
        rounded-xl shadow-lg z-50 
        flex justify-center items-center gap-x-16 px-4 select-none
      "
    >
      <button
        onClick={() => handleRedirect("/sensor_temperatura")}
        aria-label="Ir para o sensor de temperatura"
      >
        <TopbarButton label="Temperatura" Icon={TbTemperatureCelsius} />
      </button>

      <button
        onClick={() => handleRedirect("/sensor_umidade")}
        aria-label="Ir para o sensor de umidade"
      >
        <TopbarButton label="Umidade" Icon={WiHumidity} />
      </button>

      <button
        onClick={() => handleRedirect("/sensor_luminosidade")}
        aria-label="Ir para o sensor de luminosidade"
      >
        <TopbarButton label="Luminosidade" Icon={FaBoltLightning} />
      </button>

      <button
        onClick={() => handleRedirect("/sensor_contador")}
        aria-label="Ir para o sensor contador de pessoas"
      >
        <TopbarButton label="Contador" Icon={BsPersonStanding} />
      </button>

      <button
        onClick={() => setShowHelp(true)}
        aria-label="Abrir configurações"
      >
        <TopbarButton label="Configurações" Icon={FiSettings} />
      </button>
    </nav>
  );
}