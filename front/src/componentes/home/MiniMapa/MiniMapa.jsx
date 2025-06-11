import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MiniMapa() {
  const position = [-22.914103568639096, -47.06824335627237];

  return (
    <>
      <div className="bg-black/70 backdrop-blur-md w-[15rem] h-[15rem] rounded-full fixed bottom-0 right-0 m-5 z-50 overflow-hidden 
                    border-4 border-transparent 
                    hover:border-green-600 hover:shadow-lg hover:shadow-green-600 transition-all">
        <div className="w-full h-full rounded-full">
          <MapContainer
            center={position}
            zoom={18}
            scrollWheelZoom={true}
            className="w-full h-full rounded-full"
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
      </div>
    </>
  );
}
