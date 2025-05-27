import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarButton from "./buttons/barra_lateral_button";
import { PiSignOutLight } from "react-icons/pi";
import { IoIosMenu } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";
import { FaTree } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { LuMapPin } from "react-icons/lu";

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
        aria-label="Menu"
        onClick={() => setAberta(!aberta)}
        className="fixed top-4 left-4 z-50 text-white text-3xl bg-[#242424] p-3 rounded-xl shadow-md hover:text-[#00c476] transition-all cursor-pointer"
      >
        <IoIosMenu />
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-screen bg-black/70 flex flex-col items-center pt-20 z-40 select-none
          transition-all duration-300 ease-in-out
          ${aberta ? "w-[85px] translate-x-0" : "w-0 -translate-x-full"}
          overflow-hidden
        `}
      >
        <div className="mt-10">
          <SidebarButton
            label="Home"
            Icon={IoHomeOutline}
            onClick={() => navigate("/home")}
          />
        </div>
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
        <SidebarButton
          label="Dashboards"
          Icon={GoGraph}
          onClick={() => navigate("/dashboards")}
        />
        <SidebarButton
          label="Mapa"
          Icon={LuMapPin}
          onClick={() => navigate("/mapa")}
        />
        <div className="flex-grow"></div>
        <SidebarButton
          label="Perfil"
          Icon={CgProfile}
          onClick={() => navigate("/perfil")}
        />
        <SidebarButton label="Logout" Icon={PiSignOutLight} onClick={handleLogout} />
      </aside>
    </>
  );
}