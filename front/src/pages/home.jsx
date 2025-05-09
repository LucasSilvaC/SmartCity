import React, { useEffect, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function CityScene() {
  const materials = useLoader(MTLLoader, '/Scifi_downtown_city.mtl');
  const obj = useLoader(OBJLoader, '/Scifi_downtown_city.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <primitive object={obj} position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  );
}

export default CityScene;