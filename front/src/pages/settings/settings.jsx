import React, { useEffect, useState } from "react";
import {
  FaPlay,
  FaQuestionCircle,
  FaBook,
  FaDoorOpen,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SettingsCard from "../../componentes/settings/SettingsCard";
import logo from "../../assets/SmartCity_Logo.png";

const options = [
  { title: "Continuar", icon: FaPlay, path: "/home" },
  { title: "Ajuda", icon: FaQuestionCircle, path: "/ajuda" },
  { title: "Prototipação", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", path: "https://www.figma.com/proto/xyz123" },
  { title: "Sair", icon: FaDoorOpen, path: "/login" },
];

export default function Settings({ onClose }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 20);
    return () => clearTimeout(timer);
  }, []);

  const rotateLeft = () =>
    setSelected((prev) => (prev - 1 + options.length) % options.length);
  const rotateRight = () =>
    setSelected((prev) => (prev + 1) % options.length);

  const handleSelect = (title, path) => {
    if (title === "Continuar") {
      onClose?.();
      return;
    }

    if (title === "Prototipação") {
      window.open(path, "_blank"); 
    } else {
      navigate(path);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={`flex flex-col items-center justify-center transition-all duration-700 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
      >
        <div className="w-[80%] mb-[35rem] absolute">
          <img src={logo} alt="Logotipo da SmartCity" className="w-full" />
        </div>

        <div className="relative w-[18.75rem] h-[18.75rem] mr-[75%]">
          <button
            onClick={rotateLeft}
            className="absolute left-[-5rem] top-1/2 -translate-y-1/2 text-[2rem] text-[#00c476] hover:scale-125 transition z-30 cursor-pointer"
          >
            <FaArrowLeft />
          </button>

          <div className="relative w-full h-[12.5rem] flex items-center justify-center overflow-visible">
            {options.map((item, i) => {
              let relativeIndex = i - selected;

              if (relativeIndex < -1) relativeIndex += options.length;
              if (relativeIndex > 1) relativeIndex -= options.length;

              let x = 0;
              let z = -12.5;
              let rotateY = 0;
              let scale = 0.7;
              let opacity = 0;
              let blur = "blur-sm";

              if (relativeIndex === 0) {
                x = 0;
                z = 6.25;
                rotateY = 0;
                scale = 1.2;
                opacity = 1;
                blur = "blur-none";
              } else if (relativeIndex === -1) {
                x = -9.375;
                rotateY = 25;
                z = 0;
                opacity = 0.7;
              } else if (relativeIndex === 1) {
                x = 15.375;
                rotateY = 5;
                z = 0;
                opacity = 0.7;
              }

              return (
                <div
                  key={i}
                  onClick={() => handleSelect(item.title, item.path)}
                  className="cursor-pointer"
                  style={{
                    transform: `translateX(${x}rem) translateZ(${z}rem) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex: relativeIndex === 0 ? 20 : 10,
                    transition: "all 0.5s ease",
                    filter: blur,
                    position: "absolute",
                  }}
                >
                  <SettingsCard
                    icon={item.icon}
                    title={item.title}
                    selected={relativeIndex === 0}
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={rotateRight}
            className="absolute right-[-19rem] top-1/2 -translate-y-1/2 text-[2rem] text-[#00c476] hover:scale-125 transition z-30 cursor-pointer"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );

}