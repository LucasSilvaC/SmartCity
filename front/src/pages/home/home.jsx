import React, { useState } from "react";
import MapaInterativo from "./map";
import FlyingBird from "./bird";
import Rain from "./rain";
import Sun from "./sun";

function Home() {
  const [chovendo, setChovendo] = useState(false);

  return (
    <>
      <MapaInterativo>
        <FlyingBird numPassaros={20} />
      </MapaInterativo>
      <Rain onRainChange={setChovendo} />
      <Sun visivel={!chovendo} />
    </>
  );
}

export default Home;