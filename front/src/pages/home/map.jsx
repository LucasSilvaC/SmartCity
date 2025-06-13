import React, { useState, useEffect, useRef } from "react";

export default function Map({ children }) {
  const larguraImagem = 1000;
  const alturaImagem = 480;

  const fatorZoom = 2.7;

  const velocidade = 7.2;

  const [larguraJanela, setLarguraJanela] = useState(window.innerWidth);
  const [alturaJanela, setAlturaJanela] = useState(window.innerHeight);

  const calculaLimites = () => {
    const maxX = Math.max(0, larguraImagem - larguraJanela / fatorZoom);
    const maxY = Math.max(0, alturaImagem - alturaJanela / fatorZoom);
    return { maxX, maxY };
  };

  const { maxX: limXInicial, maxY: limYInicial } = calculaLimites();
  const posInicialX = Math.max(0, limXInicial / 2);
  const posInicialY = Math.max(0, limYInicial / 2);

  const [posicao, setPosicao] = useState({ x: posInicialX, y: posInicialY });
  const posicaoRef = useRef(posicao);

  const teclasAtivas = useRef({});
  const animFrame = useRef();

  const img = "/Senai_map.png";

  useEffect(() => {
    posicaoRef.current = posicao;
  }, [posicao]);

  useEffect(() => {
    const handleResize = () => {
      setLarguraJanela(window.innerWidth);
      setAlturaJanela(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { maxX, maxY } = calculaLimites();
    const novaPosX = Math.max(0, maxX / 2);
    const novaPosY = Math.max(0, maxY / 2);
    setPosicao({ x: novaPosX, y: novaPosY });
    posicaoRef.current = { x: novaPosX, y: novaPosY };
  }, [larguraJanela, alturaJanela]);

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

      const { maxX, maxY } = calculaLimites();

      novaX = Math.min(Math.max(novaX, 0), maxX);
      novaY = Math.min(Math.max(novaY, 0), maxY);

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
          transform: `scale(${fatorZoom}) translate(-${posicao.x}px, -${posicao.y}px)`,
          transformOrigin: "top left",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />
      {React.cloneElement(children, {
        larguraTotal: larguraImagem * fatorZoom,
        alturaTotal: alturaImagem * fatorZoom,
      })}
    </div>
  );
}