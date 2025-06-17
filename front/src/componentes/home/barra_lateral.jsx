import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarButton from "./buttons/barra_lateral_button";
import { PiSignOutLight } from "react-icons/pi";
import { IoIosMenu } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";
import { FaTree } from "react-icons/fa6";

export default function Sidebar() {
  const [aberta, setAberta] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button
        aria-label="Abrir ou fechar menu lateral"
        title="Menu"
        onClick={() => setAberta(!aberta)}
        className="fixed top-4 left-4 z-50 text-white text-3xl bg-[#242424] p-3 rounded-xl shadow-md hover:text-[#00c476] transition-all cursor-pointer"
      >
        <IoIosMenu />
      </button>

      <aside
        aria-label="Menu lateral de navegação"
        className={`
          fixed top-0 left-0 h-screen bg-black/70 flex flex-col
          transition-all duration-300 ease-in-out select-none z-40
          ${aberta ? "w-[85px] translate-x-0" : "w-0 -translate-x-full"}
          overflow-hidden
        `}
      >
        <nav
          aria-label="Links de navegação da barra lateral"
          className="flex flex-col justify-between items-center h-full w-full pt-20"
        >
          <div className="flex flex-col items-center space-y-6">
            <SidebarButton
              label="Home"
              Icon={IoHomeOutline}
              onClick={() => navigate("/home")}
            />
            <SidebarButton
              label="Histórico"
              Icon={MdOutlineHistory}
              onClick={() => navigate("/historico")}
            />
            <SidebarButton
              label="Ambientes"
              Icon={FaTree}
              onClick={() => navigate("/ambientes")}
            />
          </div>

          {/* Logout fixado no rodapé */}
          <SidebarButton
            label="Logout"
            Icon={PiSignOutLight}
            onClick={handleLogout}
          />
        </nav>
      </aside>
    </>
  );
}