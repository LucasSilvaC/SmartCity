import React from "react";
import BottombarButton from "./barra_bottom_button";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { FaBoltLightning } from "react-icons/fa6";
import { BsPersonStanding } from "react-icons/bs";

export default function BottomBar() {
  return (
    <div
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2 
        w-[28%] bg-black/70 backdrop-blur-md h-[4.8rem]
        rounded-xl shadow-lg z-50 
        flex justify-center items-center gap-x-16 px-4 select-none
      "
    >
      <BottombarButton label="Temperatura" Icon={TbTemperatureCelsius} />
      <BottombarButton label="Umidade" Icon={WiHumidity} />
      <BottombarButton label="Luminosidade" Icon={FaBoltLightning} />
      <BottombarButton label="Contador" Icon={BsPersonStanding} />
    </div>
  );
}
