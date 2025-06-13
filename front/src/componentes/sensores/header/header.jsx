import React from "react";
import Header_button from "../buttons/Header_button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import TopbarButton from "../../../componentes/sensores/buttons/barra_top";
import Settings from "../../../pages/settings/settings";
import SmartCity_logo from "../../../assets/SmartCity_Logo.png"

export default function Header({ onMiddleClick, labels = {}, historicoPath }) {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-center items-center gap-8 z-50">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowHelp(true)}
          aria-label="Abrir configurações"
        >
          <TopbarButton label="Configurações" Icon={FiSettings} />
        </button>
      </div>

      <div className="fixed top-4 left-4 z-50">
        <img
          src={SmartCity_logo}
          alt="Logo da SmartCity - clique para voltar ao início"
          className="w-20 h-20 cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Voltar para a página inicial"
          onClick={() => navigate("/home")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/home")}
        />
      </div>

      <nav aria-label="Navegação principal do cabeçalho" className="flex gap-8">
        <Header_button
          onClick={() => navigate("/home")}
          label={labels.left || "Voltar"}
        />
        <Header_button onClick={onMiddleClick} label={labels.middle} />
        <Header_button
          onClick={() => navigate(historicoPath || "/historico")}
          label={labels.right || "Registros"}
        />
      </nav>

      {showHelp && <Settings onClose={() => setShowHelp(false)} />}
    </header>
  );
}