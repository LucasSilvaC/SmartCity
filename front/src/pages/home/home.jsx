import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapaInterativo from "./map";
import FlyingBird from "./bird";
import Rain from "./rain";
import Sun from "./sun";
import Sidebar from '../../componentes/home/barra_lateral';
import Bottombar from '../../componentes/home/barra_bottom';
import MiniMapa from "../../componentes/home/MiniMapa/MiniMapa"

function Home() {
  const [chovendo, setChovendo] = useState(false);
  
  return (
    <>
      <Sidebar />
      <Bottombar />
      <MapaInterativo style={{ marginLeft: "80px" }}>
        <FlyingBird numPassaros={20} />
      </MapaInterativo>
      <MiniMapa />
      <Rain onRainChange={setChovendo} />
      <Sun visivel={!chovendo} />
    </>

  );
}

export default Home;