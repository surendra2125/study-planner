import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }) {
  const { scene } = useGLTF(url);
console.log("MODEL URL:", modelUrl);
  return <primitive object={scene} />;
}

export default function ThreeViewer({ modelUrl }) {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />

      <Suspense fallback={null}>
  {modelUrl && <Model url={modelUrl} />}
</Suspense>

      <OrbitControls />
    </Canvas>
  );
}