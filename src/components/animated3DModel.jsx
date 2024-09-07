import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';

function Model({ path, scale }) {
  const ref = useRef();
  const { scene } = useGLTF(path, true, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/nhsg-utility-box/dracoLoader'); // Path to the Draco decoder
    loader.setDRACOLoader(dracoLoader);
  });

  // Adjust position and scale
  useEffect(() => {
    let scaleNum = parseFloat(scale);
    scene.position.set(0, -1, 0); // Move the model down
    scene.scale.set(scaleNum, scaleNum, scaleNum); // Scale the model up
  }, [scene, scale]);

  // Override materials with a single color
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({ color: '#769BE4' });
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} />;
}

function Lights() {
  const lights = [];
  for (let i = 0; i < 10; i++) {
    lights.push(
      <pointLight
        key={i}
        position={[
          Math.random() * 20 - 10,
          Math.random() * 30 - 10,
          Math.random() * 20 - 10,
        ]}
        intensity={1}
      />
    );
  }
  // Add more lights from different directions
  lights.push(<ambientLight key="ambient" intensity={0.3} />);
  lights.push(<directionalLight key="directional1" position={[5, 5, 5]} intensity={1} />);
  lights.push(<directionalLight key="directional2" position={[-5, 5, 5]} intensity={1} />);
  lights.push(<directionalLight key="directional3" position={[5, -5, 5]} intensity={1} />);
  lights.push(<directionalLight key="directional4" position={[5, 5, -5]} intensity={1} />);
  lights.push(<directionalLight key="directional5" position={[-5, -5, 5]} intensity={1} />);
  lights.push(<directionalLight key="directional6" position={[-5, 5, -5]} intensity={1} />);
  lights.push(<directionalLight key="directional7" position={[5, -5, -5]} intensity={1} />);
  lights.push(<directionalLight key="directional8" position={[-5, -5, -5]} intensity={1} />);
  return <>{lights}</>;
}

export default function Animated3DModel({ path, scale }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model path={path} scale={scale} />
        <Lights />
        <OrbitControls autoRotate enableRotate={false} enableZoom={false} />
      </Suspense>
    </Canvas>
  );
}