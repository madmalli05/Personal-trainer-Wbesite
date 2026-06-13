import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { theme } from "../content";

/* A single weight plate (a disc on the bar) with a glowing accent rim. */
function Plate({ x, radius, thickness, accent }) {
  return (
    <group position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      {/* the plate body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, thickness, 64]} />
        <meshStandardMaterial color="#15151a" metalness={0.85} roughness={0.32} />
      </mesh>
      {/* recessed inner ring for detail */}
      <mesh position={[0, thickness / 2 + 0.001, 0]}>
        <ringGeometry args={[radius * 0.4, radius * 0.62, 48]} />
        <meshStandardMaterial color="#0c0c10" metalness={0.6} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* glowing accent rim around the outer edge */}
      <mesh>
        <torusGeometry args={[radius * 0.99, thickness * 0.28, 20, 80]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.9}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/* The full dumbbell, animated by scroll progress + time. */
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

  // Plate layout for one side (mirrored for the other).
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
    const t = state.clock.elapsedTime;
    const p = scrollRef?.current ?? 0;
    const spin = reducedMotion ? 0 : 1;

    // Continuous gentle spin + extra rotation driven by scrolling.
    g.rotation.y += ((t * 0.2 * spin + p * Math.PI * 3) - g.rotation.y) * 0.08;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -0.45 + Math.sin(p * Math.PI) * 0.7, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.22 + p * 0.5, 0.06);

    // Drift across the screen + float as you scroll.
    const targetX = THREE.MathUtils.lerp(2.2, -2.6, p);
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.05);
    g.position.y = (reducedMotion ? 0 : Math.sin(t * 0.8) * 0.18) - p * 0.4;

    // Scale down a touch as it travels.
    const s = THREE.MathUtils.lerp(1.18, 0.92, p);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.05));
  });

  return (
    <group ref={group} rotation={[0.22, 0, -0.45]} position={[2.2, 0, 0]}>
      {/* Handle / bar */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow material={steel}>
        <cylinderGeometry args={[0.17, 0.17, 2.1, 32]} />
      </mesh>
      {/* knurled grip sleeve */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow material={darkSteel}>
        <cylinderGeometry args={[0.185, 0.185, 1.1, 24]} />
      </mesh>

      {/* Both ends */}
      {[1, -1].map((side) => (
        <group key={side}>
          {/* collar */}
          <mesh
            position={[side * 0.95, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
            material={darkSteel}
          >
            <cylinderGeometry args={[0.3, 0.3, 0.22, 32]} />
          </mesh>
          {/* plates */}
          {plates.map((pl, i) => (
            <Plate
              key={i}
              x={side * pl.d}
              radius={pl.radius}
              thickness={pl.thickness}
              accent={theme.accent}
            />
          ))}
          {/* end cap */}
          <mesh
            position={[side * 1.82, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
            material={steel}
          >
            <cylinderGeometry args={[0.5, 0.5, 0.14, 48]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function DumbbellScene({ scrollRef }) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 9], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[6, 9, 6]}
            intensity={2.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-7, 2, 3]} intensity={40} color={theme.accent} />
          <pointLight position={[6, -3, 4]} intensity={26} color={theme.accent2} />

          <Dumbbell scrollRef={scrollRef} reducedMotion={reducedMotion} />

          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.45}
            scale={16}
            blur={2.6}
            far={5}
            color="#000000"
          />

          {/* Self-contained studio reflections (no network/HDRI needed) */}
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 4, -6]} scale={[12, 6, 1]} />
            <Lightformer intensity={1.6} color={theme.accent} position={[-6, 1, 2]} scale={[3, 8, 1]} />
            <Lightformer intensity={1.2} color={theme.accent2} position={[6, -2, 2]} scale={[3, 8, 1]} />
            <Lightformer intensity={1} position={[0, -4, 2]} scale={[10, 4, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
