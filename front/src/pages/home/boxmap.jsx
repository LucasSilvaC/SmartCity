function TileMapa({ row, col, larguraImagem, alturaImagem, fatorZoom, src }) {
  return (
    <img
      src={src}
      alt={`Tile ${row}-${col}`}
      style={{
        position: "absolute",
        top: `${row * alturaImagem * fatorZoom}px`,
        left: `${col * larguraImagem * fatorZoom}px`,
        width: `${larguraImagem * fatorZoom}px`,
        height: `${alturaImagem * fatorZoom}px`,
        imageRendering: "pixelated",
      }}
    />
  );
}

export default TileMapa;
