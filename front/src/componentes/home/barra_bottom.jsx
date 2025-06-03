import { useState } from "react";
import BottombarButton from "./buttons/barra_bottom_button";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { GoLightBulb } from "react-icons/go";
import { BsPersonStanding } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Settings from "../../pages/settings/settings";

export default function BottomBar() {
  const [showHelp, setShowHelp] = useState(false);

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  return (
    <>
      <div
        className="
        fixed bottom-4 left-1/2 -translate-x-1/2 
        w-[32%] bg-black/70 backdrop-blur-md h-[4.8rem]
        rounded-xl shadow-lg z-50 
        flex justify-center items-center gap-x-16 px-4 select-none
      "
      >
        <div onClick={() => handleRedirect("/sensor_temperatura")}>
          <BottombarButton label="Temperatura" Icon={TbTemperatureCelsius} />
        </div>
        <div onClick={() => handleRedirect("/sensor_umidade")}>
          <BottombarButton label="Umidade" Icon={WiHumidity} />
        </div>
        <div onClick={() => handleRedirect("/sensor_luminosidade")}>
          <BottombarButton label="Luminosidade" Icon={GoLightBulb } />
        </div>
        <div onClick={() => handleRedirect("/sensor_contador")}>
          <BottombarButton label="Contador" Icon={BsPersonStanding} />
        </div>
        <div onClick={() => setShowHelp(true)}>
          <BottombarButton label="Configurações" Icon={FiSettings} />
        </div>
      </div>

      {showHelp && <Settings onClose={() => setShowHelp(false)} />}
    </>
  );
}