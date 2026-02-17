"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, OrbitControls, Environment, AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface AnimatedMaterialProps {
  color: string;
  thickness: number;
  roughness: number;
  chromaticAberration: number;
  transparent: boolean;
  opacity: number;
}

// Helper to create a material with animation properties
const createAnimatedMaterial = ({ color, thickness, roughness, chromaticAberration, transparent, opacity }: AnimatedMaterialProps) => {
  const config = useMemo(() => ({
    backside: true,
    backsideThickness: thickness * 1.5,
    thickness: thickness,
    roughness: roughness,
    transmission: 1,
    chromaticAberration: chromaticAberration,
    anisotropy: 1,
    color: color,
    transparent: transparent,
    opacity: opacity,
    // More advanced options for a unique look
    distortion: 0.2, // Subtle distortion for glass-like effect
    distortionScale: 0.5,
    temporalDistortion: 0.1,
    resolution: 512,
  }), [color, thickness, roughness, chromaticAberration, transparent, opacity]);
  return <MeshTransmissionMaterial {...config} />;
};

function FloatingShape({ geometry, position, rotationSpeed, scale, color, delay, materialConfig }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Organic rotation based on time and a unique rotation speed
      meshRef.current.rotation.x += rotationSpeed.x * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.rotation.y += rotationSpeed.y * state.clock.getElapsedTime() * 0.0001;
      meshRef.current.rotation.z += rotationSpeed.z * state.clock.getElapsedTime() * 0.0001;

      // Subtle floating motion within viewport bounds
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + delay) * 0.5 * (viewport.height / 10);
      meshRef.current.position.x = position[0] + Math.cos(state.clock.getElapsedTime() * 0.4 + delay) * 0.6 * (viewport.width / 10);
    }
  });

  return (
    <Float floatIntensity={3 + scale} rotationIntensity={2 + scale} speed={1.5 + scale * 0.2} position={position} scale={scale}>
      <mesh ref={meshRef} geometry={geometry}>
        {createAnimatedMaterial({ ...materialConfig, color })}
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 1000, range = 30, color = "#4F46E5", speed = 0.05 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * range;
      pos[i * 3 + 1] = (Math.random() - 0.5) * range;
      pos[i * 3 + 2] = (Math.random() - 0.5) * range; // Full 3D range
    }
    return pos;
  }, [count, range]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Rotate the particle field slowly
      pointsRef.current.rotation.y += delta * speed * 0.5;
      pointsRef.current.rotation.x += delta * speed * 0.2;
      pointsRef.current.rotation.z += delta * speed * 0.1;

      // Simple, subtle movement/drift for each particle (could be more complex with custom shader)
      const positionAttribute = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < positionAttribute.count; i++) {
        let x = positionAttribute.getX(i);
        let y = positionAttribute.getY(i);
        let z = positionAttribute.getZ(i);

        // Add small random perturbation over time
        x += Math.sin(state.clock.getElapsedTime() * 0.1 + i) * 0.0005;
        y += Math.cos(state.clock.getElapsedTime() * 0.15 + i) * 0.0005;
        z += Math.sin(state.clock.getElapsedTime() * 0.2 + i) * 0.0005;

        // Wrap particles around if they go too far
        if (x > range / 2) x = -range / 2;
        if (x < -range / 2) x = range / 2;
        if (y > range / 2) y = -range / 2;
        if (y < -range / 2) y = range / 2;
        if (z > range / 2) z = -range / 2;
        if (z < -range / 2) z = range / 2;

        positionAttribute.setXYZ(i, x, y, z);
      }
      positionAttribute.needsUpdate = true;
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
      <pointsMaterial size={0.08} color={color} transparent opacity={0.6} sizeAttenuation={true} />
    </points>
  );
}

export default function Scene3D() {
  const icosahedronGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  const octahedronGeometry = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const torusGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.4, 16, 32), []);
  const dodecahedronGeometry = useMemo(() => new THREE.DodecahedronGeometry(1, 0), []);
  const knotGeometry = useMemo(() => new THREE.TorusKnotGeometry(1, 0.3, 100, 16), []);

  const materialConfigBase = {
    thickness: 2,
    roughness: 0.1,
    chromaticAberration: 1.5,
    transparent: true,
    opacity: 0.9,
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 40 }} dpr={[1, 2]} orthographic={false}>
        <color attach="background" args={["rgb(var(--background))"]} />

        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 8]} intensity={1} color="#C7D2FE" />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -5, 5]} intensity={0.7} color="#818CF8" />
        <directionalLight position={[0, -10, -5]} intensity={0.3} color="#EC4899" /> {/* Accent light */}
        
        <Environment preset="city" resolution={64} /> {/* Higher resolution environment */}

        {/* Main large shapes */}
        <FloatingShape
          geometry={icosahedronGeometry}
          position={[0, 0, 0]}
          rotationSpeed={{ x: 0.2, y: 0.3, z: 0.1 }}
          scale={3}
          color="#4F46E5"
          delay={0}
          materialConfig={materialConfigBase}
        />
        <FloatingShape
          geometry={octahedronGeometry}
          position={[-6, 4, -8]}
          rotationSpeed={{ x: 0.1, y: 0.25, z: 0.15 }}
          scale={2}
          color="#6366F1"
          delay={1}
          materialConfig={materialConfigBase}
        />
        <FloatingShape
          geometry={knotGeometry}
          position={[7, -3, -6]}
          rotationSpeed={{ x: 0.15, y: 0.2, z: 0.05 }}
          scale={1.8}
          color="#EC4899"
          delay={2}
          materialConfig={materialConfigBase}
        />

        {/* Smaller, more numerous shapes */}
        <FloatingShape
          geometry={dodecahedronGeometry}
          position={[-3, -5, 2]}
          rotationSpeed={{ x: 0.08, y: 0.12, z: 0.2 }}
          scale={1.2}
          color="#10B981"
          delay={3}
          materialConfig={{ ...materialConfigBase, roughness: 0.3, thickness: 1.5, opacity: 0.8 }}
        />
        <FloatingShape
          geometry={torusGeometry}
          position={[5, 6, 1]}
          rotationSpeed={{ x: 0.13, y: 0.09, z: 0.18 }}
          scale={1.5}
          color="#8B5CF6"
          delay={4}
          materialConfig={{ ...materialConfigBase, chromaticAberration: 0.8, thickness: 1, opacity: 0.7 }}
        />
        <FloatingShape
          geometry={icosahedronGeometry}
          position={[-8, 1, 5]}
          rotationSpeed={{ x: 0.2, y: 0.1, z: 0.05 }}
          scale={1}
          color="#3B82F6"
          delay={5}
          materialConfig={{ ...materialConfigBase, roughness: 0.05, thickness: 2.5, opacity: 0.95 }}
        />

        {/* Particle Field for added depth and dynamism */}
        <ParticleField count={1500} range={40} color="rgb(var(--primary))" speed={0.08} />

      </Canvas>
    </div>
  );
}
