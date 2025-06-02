import React from "react";
import Sensor_img from "../../../assets/Sensores/Contador.png";

export default function Panel({label}) {
    const fakeCount = 123;

    return (
        <div className="relative w-full h-[25rem] rounded-lg overflow-hidden shadow-lg">
            <img
                src={Sensor_img}
                alt="Sensor"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex flex-col h-full px-6 py-4">
                <h2 className="text-white text-3xl font-bold">SENSOR</h2>
                <p className="text-gray-300 text-lg mt-1">Tipo: {label}</p>

                <div className="flex-1" />

                <div className="mt-auto">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full font-semibold text-xl">
                        {fakeCount}
                    </span>
                </div>
            </div>
        </div>
    );
}
