import React from "react";
import Logo from '../assets/logo.png';
import { FaCity } from "react-icons/fa";

export default function Home() {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-[#2e813c] text-white flex flex-col items-center py-6">
                <div className="text-4xl font-bold mb-10">SmartCity</div>
                <FaCity className="text-6xl"/>
                <nav className="flex flex-col gap-4 w-full items-start px-6 mt-10">
                    <button className="bg-[#3cba51] w-full text-left ">TESTE1</button>
                    <button className="bg-[#3cba51] w-full text-left ">TESTE2</button>
                    <button className="bg-[#3cba51] w-full text-left ">TESTE3</button>
                    <button className="bg-[#3cba51] w-full text-left ">TESTE4</button>
                    <button className="bg-[#3cba51] w-full text-left ">TESTE5</button>
                    <button className="bg-[#3cba51] w-full text-left ">TESTE6</button>
                    <button className="bg-[#3cba51] w-full text-left ">TESTE7</button>
                </nav>
            </aside>

            <main className="flex-1 p-6 overflow-auto">
                <div className="flex items-center gap-4 mb-13 mt-4">
                    <img src={Logo} className="w-[3%] rounded-full right-5 absolute" />
                </div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold mt">Informações</h1>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 bg-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white h-40 rounded shadow-md flex items-center justify-center text-gray-500"
                                >
                                    Box {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6 mt-10">
                    <h1 className="text-2xl font-semibold mt">Ações</h1>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 bg-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white h-40 rounded shadow-md flex items-center justify-center text-gray-500"
                                >
                                    Box {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}