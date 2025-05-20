import React, { useEffect, useState } from "react";

function Rain({ onRainChange }) {
  const [active, setActive] = useState(false);
  const intervaloMs = 1 * 60 * 1000;
  const duracaoMs = 20 * 1000;
  const gif = "/rain.gif";

  useEffect(() => {
    const startRain = () => {
      setActive(true);
      onRainChange?.(true); 

      setTimeout(() => {
        setActive(false);
        onRainChange?.(false); 
      }, duracaoMs);
    };

    const intervalo = setInterval(startRain, intervaloMs);

    startRain();

    return () => clearInterval(intervalo);
  }, [onRainChange]);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 70, 150, 0.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${gif})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}

export default Rain;