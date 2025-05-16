import React, { useState, useEffect, useRef } from "react";
import TileMapa from "./boxmap";

function Map({ children }) {
  const larguraImagem = 1000;
  const alturaImagem = 480;
  const fatorZoom = 2;
  const velocidade = 7.2;

  const larguraTotal = larguraImagem * 2 * fatorZoom;
  const alturaTotal = alturaImagem * 2 * fatorZoom;

  const [larguraJanela, setLarguraJanela] = useState(window.innerWidth);
  const [alturaJanela, setAlturaJanela] = useState(window.innerHeight);

  const [posicao, setPosicao] = useState({ x: 0, y: 0 });
  const posicaoRef = useRef(posicao);
  const teclasAtivas = useRef({});
  const animFrame = useRef();

  const img = "/Senai_map.png";

  useEffect(() => {
    setPosicao({ x: 0, y: 0 });
    posicaoRef.current = { x: 0, y: 0 };
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
      <div
        style={{
          position: "absolute",
          width: `${larguraTotal}px`,
          height: `${alturaTotal}px`,
          transform: `translate(-${posicao.x}px, -${posicao.y}px)`,
        }}
      >
        {[0, 1].map((rowIdx) =>
          [0, 1].map((colIdx) => (
            <TileMapa
              key={`${rowIdx}-${colIdx}`}
              row={rowIdx}
              col={colIdx}
              larguraImagem={larguraImagem}
              alturaImagem={alturaImagem}
              fatorZoom={fatorZoom}
              src={img}
            />
          ))
        )}

        {React.cloneElement(children, {
          larguraTotal,
          alturaTotal,
        })}
      </div>
    </div>
  );
}

export default Map;