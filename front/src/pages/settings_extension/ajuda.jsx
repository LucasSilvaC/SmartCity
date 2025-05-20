import React from "react";
import Logo from "../../assets/SmartCity_Logo.png";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TbCube3dSphere } from "react-icons/tb";

export default function Ajuda() {
    return (
        <div className="bg-[#242424] w-full h-screen flex items-center justify-center text-center relative">
            <img
                src={Logo}
                alt="Logo SmartCity"
                className="absolute top-4 left-4 w-[8%]"
            />

            <div className="w-[70%] opacity-100 rounded-md overflow-hidden shadow-lg px-2 py-2">

                <div className="bg-[#242424] py-4 rounded-md mb-6 flex items-center justify-center">
                    <div className="text-[#00c476] text-8xl font-semibold">
                        <IoIosHelpCircleOutline />
                    </div>
                </div>

                <div className="border bg-[#242424] p-4 mb-4 text-left text-white rounded-md justify-between flex text-xl">
                    <p>Dúvidas para se movimentar? clique no ícone.</p>
                    <TbCube3dSphere className="cursor-pointer text-2xl"/>
                </div>
            </div>
        </div>
    );
}
