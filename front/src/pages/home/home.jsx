import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapaInterativo from "./map";
import FlyingBird from "./bird";
import Rain from "./rain";
import Sun from "./sun";
import Sidebar from '../../componentes/home/barra_lateral';
import Bottombar from '../../componentes/home/barra_bottom';
import Keyboard_help from "../../componentes/home/keyboard_help";

function Home() {
  const [chovendo, setChovendo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Sidebar />
      <Bottombar />
      <MapaInterativo style={{ marginLeft: "80px" }}>
        <FlyingBird numPassaros={20} />
      </MapaInterativo>
      <Rain onRainChange={setChovendo} />
      <Sun visivel={!chovendo} />
    </>

  );
}

export default Home;