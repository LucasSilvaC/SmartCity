import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapaInterativo from "./map";
import FlyingBird from "./bird";
import Rain from "./rain";
import Sun from "./sun";
import Sidebar from '../../componentes/home/barra_lateral';
import Bottombar from '../../componentes/home/barra_bottom';
import MiniMapa from "../../componentes/home/MiniMapa/MiniMapa"

export default function Home() {
  const [chovendo, setChovendo] = useState(false);

  return (
    <>
      <header>
        <Sidebar />
      </header>

      <nav>
        <Bottombar />
      </nav>

      <main>
        <section aria-label="Mapa Interativo da cidade">
          <MapaInterativo>
            <FlyingBird numPassaros={20} />
          </MapaInterativo>
        </section>

        <aside aria-label="Mini mapa da cidade">
          <MiniMapa />
        </aside>
      </main>

      <footer>
        <Rain onRainChange={setChovendo} />
        <Sun visivel={!chovendo} />
      </footer>
    </>
  );
}