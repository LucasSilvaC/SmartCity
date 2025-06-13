function TileMapa({ row, col, larguraImagem, alturaImagem, fatorZoom = 1, src }) {
  const estiloTile = {
    position: "absolute",
    top: `${row * alturaImagem * fatorZoom}px`,
    left: `${col * larguraImagem * fatorZoom}px`,
    width: `${larguraImagem * fatorZoom}px`,
    height: `${alturaImagem * fatorZoom}px`,
    imageRendering: "pixelated", 
    pointerEvents: "none",      
    userSelect: "none",       
  };

  return (
    <img
      src={src}
      alt={`Tile ${row}-${col}`}
      style={estiloTile}
      draggable={false}
    />
  );
}

export default TileMapa;
