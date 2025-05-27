import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Mapa() {
    const position = [-22.914103568639096, -47.06824335627237];

    return (
        <div className="flex h-screen">
            <div className="w-[33%] bg-[#171310] p-15 h-full justify-center items-center flex flex-col gap-10 text-center">
                <div className="flex w-[80%] justify-center">
                    <h1 className="text-5xl text-white font-bold">Senai Roberto Mange</h1>
                </div>
                <div className="flex rounded-xl border-1 border-white w-[80%]">
                    <img
                        src="src/assets/Senai_Mange.jpg"
                        alt="Senai"
                        className="object-cover rounded-xl w-full h-auto"
                    />
                </div>
            </div>

            <div className="flex-1 w-[34%] h-full">
                <MapContainer
                    center={position}
                    zoom={18}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Tiles © Esri"
                    />
                    <Marker position={position}>
                        <Popup>Senai Roberto Mange</Popup>
                    </Marker>
                </MapContainer>
            </div>

            <div className="w-[33%] bg-[#171310] p-4 h-full">
            </div>
        </div>
    );
}
