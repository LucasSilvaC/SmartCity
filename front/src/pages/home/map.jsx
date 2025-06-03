import React, { useState, useEffect, useRef } from "react";

function Map({ children }) {
  const larguraImagem = 1000;
  const alturaImagem = 480;
  const fatorZoom = 5;
  const velocidade = 7.2;

  const larguraTotal = larguraImagem * fatorZoom;
  const alturaTotal = alturaImagem * fatorZoom;

  const [larguraJanela, setLarguraJanela] = useState(window.innerWidth);
  const [alturaJanela, setAlturaJanela] = useState(window.innerHeight);

  const posicaoInicialX = Math.max(0, (larguraTotal / 2) - (larguraJanela / 2));
  const posicaoInicialY = Math.max(0, (alturaTotal / 2) - (alturaJanela / 2));

  const [posicao, setPosicao] = useState({ x: posicaoInicialX, y: posicaoInicialY });
  const posicaoRef = useRef(posicao);

  const teclasAtivas = useRef({});
  const animFrame = useRef();

  const img = "/Senai_map.png";

  useEffect(() => {
    posicaoRef.current = posicao; 
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setLarguraJanela(window.innerWidth);
      setAlturaJanela(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const novaX = Math.max(0, (larguraTotal / 2) - (larguraJanela / 2));
    const novaY = Math.max(0, (alturaTotal / 2) - (alturaJanela / 2));
    setPosicao({ x: novaX, y: novaY });
    posicaoRef.current = { x: novaX, y: novaY };
  }, [larguraJanela, alturaJanela, larguraTotal, alturaTotal]);

  useEffect(() => {
    const pressionarTecla = (e) => {
      teclasAtivas.current[e.key] = true;
    };

    const soltarTecla = (e) => {
      teclasAtivas.current[e.key] = false;
    };

    const mover = () => {
      let novaX = posicaoRef.current.x;
      let novaY = posicaoRef.current.y;

      if (teclasAtivas.current["ArrowUp"]) novaY -= velocidade;
      if (teclasAtivas.current["ArrowDown"]) novaY += velocidade;
      if (teclasAtivas.current["ArrowLeft"]) novaX -= velocidade;
      if (teclasAtivas.current["ArrowRight"]) novaX += velocidade;

      const limiteX = Math.max(0, larguraTotal - larguraJanela);
      const limiteY = Math.max(0, alturaTotal - alturaJanela);

      novaX = Math.min(Math.max(novaX, 0), limiteX);
      novaY = Math.min(Math.max(novaY, 0), limiteY);

      const novaPos = { x: novaX, y: novaY };
      posicaoRef.current = novaPos;
      setPosicao(novaPos);

      animFrame.current = requestAnimationFrame(mover);
    };

    window.addEventListener("keydown", pressionarTecla);
    window.addEventListener("keyup", soltarTecla);
    mover();

    return () => {
      window.removeEventListener("keydown", pressionarTecla);
      window.removeEventListener("keyup", soltarTecla);
      cancelAnimationFrame(animFrame.current);
    };
  }, [larguraJanela, alturaJanela]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
      <img
        src={img}
        alt="Mapa"
        style={{
          position: "absolute",
          width: `${larguraImagem}px`,
          height: "auto",
          transform: `translate(-${posicao.x}px, -${posicao.y}px) scale(${fatorZoom})`,
          transformOrigin: "top left",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />
      {React.cloneElement(children, {
        larguraTotal,
        alturaTotal,
      })}
    </div>
  );
}

export default Map;
