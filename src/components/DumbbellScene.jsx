import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { theme } from "../content";
import { prefersReducedMotion } from "../motionConfig";

// Shared materials (created once) — keeps the scene light.
const STEEL = new THREE.MeshStandardMaterial({ color: "#c7ccd6", metalness: 1, roughness: 0.24 });
const DARK = new THREE.MeshStandardMaterial({ color: "#2a2d34", metalness: 0.95, roughness: 0.36 });
const PLATE = new THREE.MeshStandardMaterial({ color: "#141418", metalness: 0.85, roughness: 0.34 });
const ACCENT = new THREE.MeshStandardMaterial({
  color: theme.accent,
  emissive: theme.accent,
  emissiveIntensity: 0.35,
  metalness: 0.5,
  roughness: 0.3,
});

/* A weight plate (disc on the bar axis = X) with an accent rim. */
function Plate({ radius = 1, thickness = 0.26 }) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh material={PLATE}>
        <cylinderGeometry args={[radius, radius, thickness, 48]} />
      </mesh>
      <mesh material={ACCENT}>
        <torusGeometry args={[radius * 0.99, thickness * 0.26, 16, 64]} />
      </mesh>
    </group>
  );
}

/* The dumbbell (compact). */
function Dumbbell() {
  return (
    <group scale={0.62}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={STEEL}>
        <cylinderGeometry args={[0.17, 0.17, 2.1, 24]} />
      </mesh>
      {[1, -1].map((side) => (
        <group key={side} position={[side * 1.05, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={DARK}>
            <cylinderGeometry args={[0.3, 0.3, 0.22, 24]} />
          </mesh>
          <group position={[side * 0.3, 0, 0]}>
            <Plate radius={0.95} thickness={0.26} />
          </group>
          <group position={[side * 0.62, 0, 0]}>
            <Plate radius={0.72} thickness={0.24} />
          </group>
          <mesh position={[side * 0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={STEEL}>
            <cylinderGeometry args={[0.42, 0.42, 0.12, 32]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* A leaning stack of plates. */
function PlateStack() {
  return (
    <group scale={0.95}>
      {[-0.33, -0.11, 0.11, 0.33].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <Plate radius={1.05} thickness={0.16} />
        </group>
      ))}
    </group>
  );
}

/* A kettlebell — bell + arched handle. */
function Kettlebell() {
  return (
    <group scale={0.95}>
      <mesh material={DARK}>
        <sphereGeometry args={[0.85, 32, 24]} />
      </mesh>
      <mesh position={[0, 0.6, 0]} material={DARK}>
        <cylinderGeometry args={[0.34, 0.42, 0.22, 24]} />
      </mesh>
      <mesh position={[0, 1.05, 0]} material={STEEL}>
        <torusGeometry args={[0.34, 0.1, 16, 32, Math.PI]} />
      </mesh>
      <mesh material={ACCENT}>
        <torusGeometry args={[0.86, 0.04, 12, 48]} />
      </mesh>
    </group>
  );
}

/* An olympic barbell with plates on the ends. */
function Barbell() {
  return (
    <group scale={0.62} rotation={[0, 0, 0.15]}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={STEEL}>
        <cylinderGeometry args={[0.075, 0.075, 4.2, 20]} />
      </mesh>
      {[1, -1].map((side) => (
        <group key={side} position={[side * 1.7, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={DARK}>
            <cylinderGeometry args={[0.18, 0.18, 0.16, 20]} />
          </mesh>
          <group position={[side * 0.22, 0, 0]}>
            <Plate radius={0.62} thickness={0.16} />
          </group>
          <group position={[side * 0.46, 0, 0]}>
            <Plate radius={0.5} thickness={0.14} />
          </group>
        </group>
      ))}
    </group>
  );
}

/* Wraps an object and gives it a gentle, individual spin. */
function Floating({ children, position, speed = 0.2, tilt = 0, reducedMotion }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
  });
  return (
    <group ref={ref} position={position} rotation={[tilt, 0, 0]}>
      {children}
    </group>
  );
}

/* The rig that flows objects through center on scroll + follows the mouse. */
function Rig({ scrollRef, pointerRef, reducedMotion }) {
  const rig = useRef();

  useFrame((state) => {
    const g = rig.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = scrollRef?.current ?? 0;
    const ptr = pointerRef.current;
    const cam = state.camera;

    if (reducedMotion) {
      g.position.x = -6; // show the first object (dumbbell), static
      return;
    }

    // Scroll: slide the whole rig so each object flows through center in turn,
    // "introducing" the site section by section.
    g.position.x = THREE.MathUtils.lerp(g.position.x, THREE.MathUtils.lerp(-6, 6, p), 0.06);
    g.position.y = Math.sin(t * 0.5) * 0.12;

    // Mouse: the scene tilts toward the cursor (parallax / "follows the user").
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, ptr.x * 0.32, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -ptr.y * 0.2, 0.05);

    // Camera drifts subtly with the mouse + dollies in a touch on scroll.
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, ptr.x * 0.7, 0.04);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, 0.3 - ptr.y * 0.5, 0.04);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, THREE.MathUtils.lerp(10, 8.8, p), 0.04);
    cam.lookAt(0, 0, 0);
  });

  // Objects spaced along X; the rig slides them through the viewport on scroll.
  return (
    <group ref={rig} position={[-6, 0, 0]}>
      <Floating position={[6, 0.3, 0]} speed={0.22} reducedMotion={reducedMotion}>
        <Dumbbell />
      </Floating>
      <Floating position={[3, -0.5, -1]} speed={-0.16} tilt={0.4} reducedMotion={reducedMotion}>
        <PlateStack />
      </Floating>
      <Floating position={[0, 0.5, 0.4]} speed={0.18} reducedMotion={reducedMotion}>
        <Kettlebell />
      </Floating>
      <Floating position={[-3, -0.3, -1]} speed={-0.2} reducedMotion={reducedMotion}>
        <Barbell />
      </Floating>
      <Floating position={[-6, 0.4, 0.2]} speed={0.24} tilt={0.5} reducedMotion={reducedMotion}>
        <Plate radius={1.25} thickness={0.3} />
      </Floating>
    </group>
  );
}

export default function DumbbellScene({ scrollRef }) {
  const reducedMotion = prefersReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });

  // Track the mouse globally (the canvas itself is pointer-events:none).
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  // Gracefully skip WebGL entirely if unsupported.
  const webglOK = useRef(null);
  if (webglOK.current === null) {
    try {
      const c = document.createElement("canvas");
      webglOK.current = !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch {
      webglOK.current = false;
    }
  }
  if (!webglOK.current) return null;

  return (
    <div id="bg-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.3, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[6, 9, 6]} intensity={1.8} />
          <pointLight position={[-7, 2, 3]} intensity={20} color={theme.accent} />
          <pointLight position={[6, -3, 4]} intensity={14} color={theme.accent2} />

          <Rig scrollRef={scrollRef} pointerRef={pointer} reducedMotion={reducedMotion} />

          {/* Self-contained studio reflections (no network/HDRI needed) */}
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 4, -6]} scale={[12, 6, 1]} />
            <Lightformer intensity={1.6} color={theme.accent} position={[-6, 1, 2]} scale={[3, 8, 1]} />
            <Lightformer intensity={1.2} color={theme.accent2} position={[6, -2, 2]} scale={[3, 8, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
