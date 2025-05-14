import React from "react";

function Sun({ visivel }) {
  const gif = "/sun.gif"; 

  return (
    <img
      src={gif}
      alt="Sol"
      style={{
        position: "fixed",
        top: "10px",
        right: "0px",
        width: "auto",
        height: "20%",
        zIndex: 1000,
        opacity: visivel ? 1 : 0,
        transition: "opacity 1s ease-in-out",
        pointerEvents: "none",
      }}
    />
  );
}

export default Sun;
