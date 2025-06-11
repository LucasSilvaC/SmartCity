import { useState } from "react";
import TopbarButton from "../buttons/barra_top";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { FaBoltLightning } from "react-icons/fa6";
import { BsPersonStanding } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

export default function TopBar() {
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  return (
    <>
      <div
        className="
        fixed top-4 left-1/2 -translate-x-1/2 
        w-[32%] bg-black/70 backdrop-blur-md h-[4.8rem]
        rounded-xl shadow-lg z-50 
        flex justify-center items-center gap-x-16 px-4 select-none
      "
      >
        <div onClick={() => handleRedirect("/sensor_temperatura")}>
          <TopbarButton label="Temperatura" Icon={TbTemperatureCelsius} />
        </div>
        <div onClick={() => handleRedirect("/sensor_umidade")}>
          <TopbarButton label="Umidade" Icon={WiHumidity} />
        </div>
        <div onClick={() => handleRedirect("/sensor_luminosidade")}>
          <TopbarButton label="Luminosidade" Icon={FaBoltLightning} />
        </div>
        <div onClick={() => handleRedirect("/sensor_contador")}>
          <TopbarButton label="Contador" Icon={BsPersonStanding} />
        </div>
        <div onClick={() => setShowHelp(true)}>
          <TopbarButton label="Configurações" Icon={FiSettings} />
        </div>
      </div>
    </>
  );
}