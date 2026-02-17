"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, OrbitControls, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Helper to create a material with animation
const createAnimatedMaterial = (color: string, i: number) => (
  <MeshTransmissionMaterial
    backside
    backsideThickness={5 + i * 0.5}
    thickness={2 + i * 0.2}
    roughness={0.1 + i * 0.02}
    transmission={1}
    chromaticAberration={1.5 + i * 0.1}
    anisotropy={1}
    color={color}
  />
);

function FloatingIcosahedron({ position, rotationSpeed, scale, color, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.rotation.y += rotationSpeed.y * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + delay) * 0.5;
    }
  });
  return (
    <Float floatIntensity={2} rotationIntensity={1.5} speed={1.5} position={position} scale={scale}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        {createAnimatedMaterial(color, 0)}
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, rotationSpeed, scale, color, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= rotationSpeed.x * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.rotation.z += rotationSpeed.y * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.getElapsedTime() * 0.4 + delay) * 0.6;
    }
  });
  return (
    <Float floatIntensity={3} rotationIntensity={2} speed={1.2} position={position} scale={scale}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        {createAnimatedMaterial(color, 1)}
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, rotationSpeed, scale, color, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed.y * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.rotation.x += rotationSpeed.x * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.getElapsedTime() * 0.6 + delay) * 0.4;
    }
  });
  return (
    <Float floatIntensity={1.5} rotationIntensity={1} speed={2} position={position} scale={scale}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        {createAnimatedMaterial(color, 2)}
      </mesh>
    </Float>
  );
}

function FloatingDodecahedron({ position, rotationSpeed, scale, color, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.rotation.y -= rotationSpeed.y * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.getElapsedTime() * 0.3 + delay) * 0.7;
    }
  });
  return (
    <Float floatIntensity={2.5} rotationIntensity={1.8} speed={0.8} position={position} scale={scale}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1, 0]} />
        {createAnimatedMaterial(color, 3)}
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 800, range = 20, color = "#4F46E5" }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * range;
      pos[i * 3 + 1] = (Math.random() - 0.5) * range;
      pos[i * 3 + 2] = (Math.random() - 0.5) * range / 2 - range / 4; // Z-depth
    }
    return pos;
  }, [count, range]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.005;
      pointsRef.current.rotation.x += delta * 0.002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]} orthographic={false}>
        <color attach="background" args={["#FDFDFA"]} /> {/* Match background to theme */}
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 8]} intensity={0.8} color="#C7D2FE" />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#818CF8" />
        
        <Environment preset="city" resolution={32} /> {/* Subtle environment for reflections */}

        <FloatingIcosahedron position={[0, 0, 0]} rotationSpeed={{ x: 0.2, y: 0.3 }} scale={2.2} color="#4F46E5" delay={0} />
        <FloatingOctahedron position={[-4, 2, -3]} rotationSpeed={{ x: 0.1, y: 0.25 }} scale={1.2} color="#6366F1" delay={1} />
        <FloatingTorus position={[4, -1.5, -2]} rotationSpeed={{ x: 0.15, y: 0.2 }} scale={1} color="#EC4899" delay={2} />
        <FloatingDodecahedron position={[3, 3, -4]} rotationSpeed={{ x: 0.08, y: 0.12 }} scale={0.8} color="#10B981" delay={3} />
        <ParticleField count={1000} range={25} color="#C7D2FE" />

      </Canvas>
    </div>
  );
}
