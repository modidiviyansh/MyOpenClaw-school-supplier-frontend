"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float floatIntensity={2} rotationIntensity={1.5} speed={1.5}>
      <mesh ref={meshRef} scale={2.2} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0.1}
          transmission={1}
          chromaticAberration={1.5}
          anisotropy={1}
          color="#4F46E5"
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.1;
      meshRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <Float floatIntensity={3} rotationIntensity={2} speed={1.2}>
      <mesh ref={meshRef} scale={1.2} position={[-4, 2, -3]}>
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={3}
          thickness={1.5}
          roughness={0.15}
          transmission={1}
          chromaticAberration={0.8}
          anisotropy={0.5}
          color="#7C3AED"
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float floatIntensity={1.5} rotationIntensity={1} speed={2}>
      <mesh ref={meshRef} scale={1} position={[4, -1.5, -2]}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={2}
          thickness={1}
          roughness={0.2}
          transmission={1}
          chromaticAberration={1.2}
          anisotropy={0.8}
          color="#EC4899"
        />
      </mesh>
    </Float>
  );
}

function FloatingDodecahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.08;
      meshRef.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <Float floatIntensity={2.5} rotationIntensity={1.8} speed={0.8}>
      <mesh ref={meshRef} scale={0.8} position={[3, 3, -4]}>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={4}
          thickness={1.8}
          roughness={0.12}
          transmission={1}
          chromaticAberration={1}
          anisotropy={0.6}
          color="#10B981"
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
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
      <pointsMaterial size={0.05} color="#4F46E5" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#818CF8" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#C7D2FE" />

        <FloatingIcosahedron />
        <FloatingOctahedron />
        <FloatingTorus />
        <FloatingDodecahedron />
        <ParticleField />
      </Canvas>
    </div>
  );
}
