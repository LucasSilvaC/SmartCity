import React, { useState } from "react";
import SidebarButton from "./barra_lateral_button";
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
        <SidebarButton label="Home" Icon={IoHomeOutline} />
        </div>
        <SidebarButton label="Histórico" Icon={MdOutlineHistory } />
        <SidebarButton label="Ambientes" Icon={FaTree } />
        <SidebarButton label="Dashboards" Icon={GoGraph } />
        <SidebarButton label="Mapa" Icon={LuMapPin } />
        <div className="flex-grow"></div>
        <SidebarButton label="Perfil" Icon={CgProfile } />
        <SidebarButton label="Logout" Icon={PiSignOutLight} />
      </aside>
    </>
  );
}