"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

function LetterMesh({
  rotationRef,
  autoRotateX,
  draggable,
  color,
  text,
}: {
  rotationRef: { current: number };
  autoRotateX: boolean;
  draggable: boolean;
  color: string;
  text: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const xAngle = useRef(0);
  const fontSize = text.length === 1 ? 1.8 : 1.1;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (draggable) {
      groupRef.current.rotation.y = (rotationRef.current * Math.PI) / 180;
    }
    if (autoRotateX) {
      xAngle.current += delta * 0.4;
      groupRef.current.rotation.y = xAngle.current;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="/helvetiker_bold.typeface.json"
          size={fontSize}
          height={0.45}
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.06}
          bevelSegments={16}
        >
          {text}
          <meshPhysicalMaterial
            color={color}
            transmission={0.88}
            thickness={0.8}
            roughness={0.02}
            metalness={0}
            ior={1.5}
            envMapIntensity={2}
            transparent
          />
        </Text3D>
      </Center>
    </group>
  );
}

export function Letter3D({
  size = 200,
  autoRotateX = false,
  draggable = true,
  color = "white",
  text = "M",
}: {
  size?: number;
  autoRotateX?: boolean;
  draggable?: boolean;
  color?: string;
  text?: string;
}) {
  const rotationRef = useRef(15);
  const startX = useRef(0);
  const startAngle = useRef(0);

  return (
    <div
      style={{
        width: size,
        height: size,
        touchAction: "none",
        cursor: draggable ? "grab" : "default",
      }}
      onPointerDown={
        draggable
          ? (e) => {
              (e.currentTarget as HTMLDivElement).setPointerCapture(
                e.pointerId,
              );
              startX.current = e.clientX;
              startAngle.current = rotationRef.current;
            }
          : undefined
      }
      onPointerMove={
        draggable
          ? (e) => {
              if (e.buttons !== 1) return;
              rotationRef.current =
                startAngle.current + (e.clientX - startX.current) * 0.6;
            }
          : undefined
      }
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 3]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[4, 6, 4]} intensity={3} />
        <directionalLight
          position={[-3, -1, 2]}
          intensity={0.8}
          color="#fffbe6"
        />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <LetterMesh
            rotationRef={rotationRef}
            autoRotateX={autoRotateX}
            draggable={draggable}
            color={color}
            text={text}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
