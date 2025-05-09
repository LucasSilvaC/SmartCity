import React, { useState } from 'react';

const Jogo = () => {
  const [posicao, setPosicao] = useState({ x: 0, y: 0 });

  // Caminho da imagem de fundo
  const mapaImagem = "/Senai_map.png"; // Caminho para a imagem

  // Tamanho da janela de visualização (o tamanho que você vê da imagem)
  const larguraJanela = 500;
  const alturaJanela = 500;

  const moverImagem = (evento) => {
    // Obter a posição do mouse
    const mouseX = evento.clientX;
    const mouseY = evento.clientY;

    // Definir a nova posição da "janela" com base na posição do mouse
    setPosicao({
      x: Math.max(0, Math.min(mouseX - larguraJanela / 2, 2000 - larguraJanela)), // Impede que ultrapasse o limite da imagem
      y: Math.max(0, Math.min(mouseY - alturaJanela / 2, 2000 - alturaJanela)),
    });
  };

  // Fatores de zoom
  const fatorZoom = 2; // Aqui você pode ajustar o nível de zoom

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden', // Impede que a imagem saia da tela
        position: 'relative',
        backgroundColor: '#000',
      }}
      onMouseMove={moverImagem} // Detecta o movimento do mouse
    >
      <div
        style={{
          position: 'absolute',
          top: `0`,
          left: `0`,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${mapaImagem})`,
          backgroundSize: `${1100 * fatorZoom}px ${400 * fatorZoom}px`, // Aumenta o tamanho da imagem
          backgroundAttachment: 'fixed', // A imagem de fundo fica fixa
          backgroundPosition: `-${posicao.x * fatorZoom}px -${posicao.y * fatorZoom}px`, // Ajusta a posição de fundo com zoom
          overflow: 'hidden',
        }}
      ></div>

      {/* Janela de visualização */}
      <div
        style={{
          position: 'absolute',
          top: `${posicao.y}px`,
          left: `${posicao.x}px`,
          width: `${larguraJanela}px`,
          height: `${alturaJanela}px`,
          border: 'transparent', // Um contorno branco para indicar a janela
          pointerEvents: 'none', // Para garantir que a "janela" não interfira com a interação do mouse
        }}
      />
    </div>
  );
};

export default Jogo;
