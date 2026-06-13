import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { theme } from "../content";
import { motion as cfg, allowHeavyFx, prefersReducedMotion } from "../motionConfig";

/* A single weight plate (a disc on the bar) with a glowing accent rim. */
function Plate({ x, radius, thickness, accent }) {
  return (
    <group position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, thickness, 64]} />
        <meshStandardMaterial color="#15151a" metalness={0.85} roughness={0.32} />
      </mesh>
      <mesh position={[0, thickness / 2 + 0.001, 0]}>
        <ringGeometry args={[radius * 0.4, radius * 0.62, 48]} />
        <meshStandardMaterial color="#0c0c10" metalness={0.6} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* accent rim */}
      <mesh>
        <torusGeometry args={[radius * 0.99, thickness * 0.28, 20, 80]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.45}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/* The full dumbbell — choreographed by scroll progress + time + camera dolly. */
function Dumbbell({ scrollRef, reducedMotion }) {
  const group = useRef();

  const steel = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c7ccd6", metalness: 1, roughness: 0.22 }),
    []
  );
  const darkSteel = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#2a2d34", metalness: 0.95, roughness: 0.35 }),
    []
  );

  const plates = useMemo(
    () => [
      { d: 1.02, radius: 1.0, thickness: 0.26 },
      { d: 1.34, radius: 0.82, thickness: 0.24 },
      { d: 1.62, radius: 0.64, thickness: 0.22 },
    ],
    []
  );

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    // Reduced motion: hold a clean static pose, no scroll/time-driven movement.
    if (reducedMotion) return;

    const t = state.clock.elapsedTime;
    const p = scrollRef?.current ?? 0;

    // Majestic continuous spin in the hero that keeps winding as you scroll.
    g.rotation.y += (t * 0.18 + p * Math.PI * 3.2 - g.rotation.y) * 0.07;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -0.5 + Math.sin(p * Math.PI) * 0.8, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.18 + p * 0.6, 0.05);

    // Travel: large & center-right in the hero, drifting across + shrinking on scroll.
    g.position.x = THREE.MathUtils.lerp(g.position.x, THREE.MathUtils.lerp(1.7, -2.4, p), 0.05);
    g.position.y = Math.sin(t * 0.7) * 0.16 - p * 0.5;

    const s = THREE.MathUtils.lerp(1.45, 0.82, p);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.05));

    // Cinematic camera dolly for depth.
    const cam = state.camera;
    const dz = cfg.scene.cameraDolly;
    cam.position.z += (THREE.MathUtils.lerp(9.6, 9.6 - dz * 2, p) - cam.position.z) * 0.04;
    cam.position.y += (THREE.MathUtils.lerp(0.4, -0.3, p) - cam.position.y) * 0.04;
    cam.lookAt(0, 0, 0);
  });

  return (
    <group ref={group} rotation={[0.18, 0, -0.5]} position={[1.7, 0, 0]} scale={1.45}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow material={steel}>
        <cylinderGeometry args={[0.17, 0.17, 2.1, 32]} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow material={darkSteel}>
        <cylinderGeometry args={[0.185, 0.185, 1.1, 24]} />
      </mesh>

      {[1, -1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow material={darkSteel}>
            <cylinderGeometry args={[0.3, 0.3, 0.22, 32]} />
          </mesh>
          {plates.map((pl, i) => (
            <Plate key={i} x={side * pl.d} radius={pl.radius} thickness={pl.thickness} accent={theme.accent} />
          ))}
          <mesh position={[side * 1.82, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow material={steel}>
            <cylinderGeometry args={[0.5, 0.5, 0.14, 48]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function DumbbellScene({ scrollRef }) {
  const reducedMotion = prefersReducedMotion();
  const heavy = allowHeavyFx(); // desktop + motion-on: enables bloom/particles/shadows

  // Gracefully skip WebGL entirely if the browser/device can't do it.
  const webglOK = useMemo(() => {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch {
      return false;
    }
  }, []);

  if (!webglOK) return null;

  return (
    <div id="bg-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 9.6], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[6, 9, 6]} intensity={2} />
          <pointLight position={[-7, 2, 3]} intensity={22} color={theme.accent} />
          <pointLight position={[6, -3, 4]} intensity={16} color={theme.accent2} />
          {/* back rim light for a crisp metallic edge */}
          <spotLight position={[0, 6, -8]} angle={0.6} penumbra={1} intensity={20} color="#ffffff" />

          <Dumbbell scrollRef={scrollRef} reducedMotion={reducedMotion} />

          {heavy && cfg.scene.particles && (
            <Sparkles count={50} scale={[16, 9, 6]} size={2.2} speed={0.25} opacity={0.4} color={theme.accent} />
          )}

          {/* Static (single-frame) contact shadow — cheap grounding, no per-frame cost */}
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.4}
            scale={16}
            blur={2.6}
            far={5}
            color="#000000"
            frames={1}
          />

          {/* Self-contained studio reflections (no network/HDRI needed) */}
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 4, -6]} scale={[12, 6, 1]} />
            <Lightformer intensity={1.8} color={theme.accent} position={[-6, 1, 2]} scale={[3, 8, 1]} />
            <Lightformer intensity={1.2} color={theme.accent2} position={[6, -2, 2]} scale={[3, 8, 1]} />
            <Lightformer intensity={1} position={[0, -4, 2]} scale={[10, 4, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
