import React from "react";
import Header_button from "../buttons/Header_button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import TopbarButton from "../../../componentes/sensores/buttons/barra_top";
import Settings from "../../../pages/settings/settings";
import SmartCity_logo from "../../../assets/SmartCity_Logo.png"

export default function Header({ onMiddleClick }) {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-center gap-8 z-50">


      <div className="fixed top-4 right-4 z-50">
        <div onClick={() => setShowHelp(true)}>
          <TopbarButton label="Configurações" Icon={FiSettings} />
        </div>
      </div>

      <div className="fixed top-4 left-4 z-50">
        <img src={SmartCity_logo} alt="Logo SmartCity" className="w-20 h-20" />
      </div>

      <Header_button onClick={() => navigate("/home")} label="Voltar" />
      <Header_button onClick={onMiddleClick} label="Contador" />
      <Header_button onClick={onMiddleClick} label="Registros" />

      {showHelp && <Settings onClose={() => setShowHelp(false)} />}
    </div>
  );
}
