import { useState, useEffect } from "react";
import MapaInterativo from "./map";
import FlyingBird from "./bird";
import Rain from "./rain";
import Sun from "./sun";
import Sidebar from '../../componentes/home/barra_lateral';
import Bottombar from '../../componentes/home/barra_bottom';
import MiniMapa from "../../componentes/home/MiniMapa/MiniMapa";
import Alert from "../../componentes/modal/alert";

export default function Home() {
  const [chovendo, setChovendo] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const jaMostrouModal = localStorage.getItem("modalShown");

    if (!jaMostrouModal) {
      setModal({
        show: true,
        message: "Para se mover use as setas direcionais do teclado",
        type: "alert",
      });
      localStorage.setItem("modalShown", "true");
    }
  }, []);

  const handleCloseModal = () => {
    setModal({ show: false, message: "", type: "" });
  };

  return (
    <>
      {modal.show && (
        <Alert
          message={modal.message}
          type={modal.type}
          onClose={handleCloseModal}
        />
      )}
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