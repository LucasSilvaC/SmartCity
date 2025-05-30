import React from "react";
import ButtonHeaderPrincipal from "../buttons/header_principal";

export default function Header({ onMiddleClick }) {
  return (
    <div className="fixed top-0 left-0 right-0 p-4 flex justify-center items-center gap-[10%]">
      <h1 className="text-white text-2xl font-bold">Contador</h1>

      <ButtonHeaderPrincipal onClick={onMiddleClick}>
        Contador
      </ButtonHeaderPrincipal>

      <h1 className="text-white text-2xl font-bold">Contador</h1>
    </div>
  );
}
