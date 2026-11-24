import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Lightformer, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function DumbbellMesh({ hovered }) {
  const groupRef = useRef();
  const ringRef = useRef();
  const outerRingRef = useRef();

  // Handle par grip rings ki positions
  const gripOffsets = [-0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9];

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const speedMultiplier = hovered ? 1.85 : 1;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.55 * speedMultiplier;
      groupRef.current.rotation.z = -0.35 + Math.sin(t * 1.2) * 0.12;
      groupRef.current.position.y = Math.sin(t * 1.8) * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = 0.55 + Math.cos(t * 0.9) * 0.25;
      ringRef.current.rotation.y += delta * 0.4;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = -0.65 + Math.sin(t * 0.7) * 0.2;
      outerRingRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.6}>
      <group ref={groupRef} rotation={[0.25, 0, -0.35]}>
        {/* Main Chrome Shaft */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.13, 3.3, 48]} />
          <meshStandardMaterial
            color="#d4d4d8"
            metalness={0.95}
            roughness={0.14}
          />
        </mesh>

        {/* Knurled Grip Rings on Handle */}
        {gripOffsets.map((xPos, idx) => (
          <mesh
            key={idx}
            position={[xPos, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.148, 0.148, 0.05, 32]} />
            <meshStandardMaterial
              color="#3f3f46"
              metalness={0.85}
              roughness={0.35}
            />
          </mesh>
        ))}

        {/* Left Weight Stack */}
        <group position={[-1.12, 0, 0]}>
          {/* Heavy Matte Black Plate */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.92, 0.92, 0.34, 64]} />
            <meshStandardMaterial
              color="#141417"
              metalness={0.75}
              roughness={0.28}
            />
          </mesh>
          {/* Neon Accent Inner Plate */}
          <mesh position={[-0.26, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.68, 0.68, 0.2, 64]} />
            <meshStandardMaterial
              color="#ccff00"
              emissive="#ccff00"
              emissiveIntensity={hovered ? 0.65 : 0.35}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
          {/* Chrome End Collar */}
          <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.14, 32]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.95} roughness={0.12} />
          </mesh>
        </group>

        {/* Right Weight Stack */}
        <group position={[1.12, 0, 0]}>
          {/* Heavy Matte Black Plate */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.92, 0.92, 0.34, 64]} />
            <meshStandardMaterial
              color="#141417"
              metalness={0.75}
              roughness={0.28}
            />
          </mesh>
          {/* Neon Accent Inner Plate */}
          <mesh position={[0.26, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.68, 0.68, 0.2, 64]} />
            <meshStandardMaterial
              color="#ccff00"
              emissive="#ccff00"
              emissiveIntensity={hovered ? 0.65 : 0.35}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
          {/* Chrome End Collar */}
          <mesh position={[0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.14, 32]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.95} roughness={0.12} />
          </mesh>
        </group>

        {/* Inner Glowing Neon Orbit Ring */}
        <mesh ref={ringRef} rotation={[0.55, 0.2, 0]}>
          <torusGeometry args={[2.15, 0.024, 24, 128]} />
          <meshStandardMaterial
            color="#ccff00"
            emissive="#ccff00"
            emissiveIntensity={hovered ? 2.4 : 1.7}
            toneMapped={false}
          />
        </mesh>

        {/* Subtle Outer Metallic Halo Ring */}
        <mesh ref={outerRingRef} rotation={[-0.65, 0.3, 0]}>
          <torusGeometry args={[2.48, 0.012, 16, 128]} />
          <meshStandardMaterial
            color="#a1a1aa"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Dumbbell3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      className="w-full h-[420px] md:h-[520px] cursor-grab active:cursor-grabbing"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 6, 5]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-4, -3, 3]} intensity={2.5} color="#ccff00" distance={12} />
        <pointLight position={[4, 2, -4]} intensity={1.8} color="#84cc16" distance={12} />

        {/* Studio Reflections ke liye Environment */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={2.5}
            color="#ffffff"
            position={[0, 5, 2]}
            rotation={[Math.PI / 2.5, 0, 0]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            form="ring"
            intensity={2}
            color="#ccff00"
            position={[-4, 1, 3]}
            scale={4}
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            color="#71717a"
            position={[5, -2, -2]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[8, 4, 1]}
          />
        </Environment>

        <DumbbellMesh hovered={hovered} />

        {/* Floating Energy Sparks */}
        <Sparkles
          count={45}
          scale={5.2}
          size={2.2}
          speed={0.45}
          opacity={0.75}
          color="#ccff00"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.06}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}