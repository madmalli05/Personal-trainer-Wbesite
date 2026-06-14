import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, Grid } from "@react-three/drei";
import * as THREE from "three";
import { theme } from "../content";
import { motion as cfg, allowHeavyFx, prefersReducedMotion } from "../motionConfig";

// ---- Shared materials (created once) --------------------------------------
const STEEL = new THREE.MeshStandardMaterial({ color: "#aeb6c6", metalness: 1, roughness: 0.26 });
const BODY = new THREE.MeshStandardMaterial({ color: "#232a38", metalness: 0.9, roughness: 0.44 });
const DARK = new THREE.MeshStandardMaterial({ color: "#2a3040", metalness: 0.95, roughness: 0.38 });
const PLATE = new THREE.MeshStandardMaterial({ color: "#10141d", metalness: 0.85, roughness: 0.34 });
const CONTOUR = new THREE.MeshBasicMaterial({
  color: theme.accent,
  wireframe: true,
  transparent: true,
  opacity: 0.06,
});

// ---- Central athletic body sculpture (abstract, V-taper) ------------------
function Body() {
  return (
    <group scale={0.82} position={[0, -0.2, 0]}>
      {/* head + neck */}
      <mesh position={[0, 2.2, 0]} material={BODY} scale={[0.36, 0.44, 0.36]}>
        <sphereGeometry args={[1, 24, 18]} />
      </mesh>
      <mesh position={[0, 1.85, 0]} material={DARK}>
        <cylinderGeometry args={[0.17, 0.22, 0.3, 16]} />
      </mesh>
      {/* chest (broad) → core (narrow) → pelvis : the V-taper */}
      <mesh position={[0, 1.32, 0]} material={BODY} scale={[0.98, 0.72, 0.52]}>
        <sphereGeometry args={[1, 28, 20]} />
      </mesh>
      <mesh position={[0, 0.55, 0]} material={BODY} scale={[0.62, 0.74, 0.45]}>
        <sphereGeometry args={[1, 24, 18]} />
      </mesh>
      <mesh position={[0, -0.12, 0]} material={BODY} scale={[0.62, 0.5, 0.46]}>
        <sphereGeometry args={[1, 22, 16]} />
      </mesh>
      {/* subtle anatomy contour over the chest */}
      <mesh position={[0, 1.32, 0]} scale={[1.0, 0.74, 0.54]} material={CONTOUR}>
        <sphereGeometry args={[1, 18, 12]} />
      </mesh>
      {/* shoulders / delts */}
      {[1, -1].map((s) => (
        <mesh key={s} position={[s * 0.92, 1.5, 0]} material={DARK} scale={0.42}>
          <sphereGeometry args={[1, 20, 16]} />
        </mesh>
      ))}
      {/* arms */}
      {[1, -1].map((s) => (
        <group key={s}>
          <mesh position={[s * 1.08, 0.9, 0]} rotation={[0, 0, s * 0.22]} material={BODY}>
            <capsuleGeometry args={[0.17, 0.85, 6, 14]} />
          </mesh>
          <mesh position={[s * 1.24, 0.05, 0.04]} rotation={[0, 0, s * 0.12]} material={DARK}>
            <capsuleGeometry args={[0.14, 0.78, 6, 14]} />
          </mesh>
        </group>
      ))}
      {/* legs */}
      {[1, -1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.32, -1.15, 0]} material={BODY}>
            <capsuleGeometry args={[0.24, 0.95, 6, 14]} />
          </mesh>
          <mesh position={[s * 0.34, -2.2, 0.02]} material={DARK}>
            <capsuleGeometry args={[0.18, 0.9, 6, 14]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ---- A glowing muscle-zone marker (gently pulses) -------------------------
function Marker({ position, phase, reducedMotion }) {
  const mat = useRef();
  useFrame((state) => {
    if (!mat.current) return;
    const pulse = reducedMotion ? 0.5 : 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 1.4 + phase);
    mat.current.emissiveIntensity = 0.7 + pulse * 1.1;
  });
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.075, 14, 14]} />
      <meshStandardMaterial
        ref={mat}
        color={theme.accent}
        emissive={theme.accent}
        emissiveIntensity={1}
        toneMapped={false}
      />
    </mesh>
  );
}

// muscle zones: chest, 2 shoulders, 2 arms, back, core, 2 quads
const ZONES = [
  [0, 0.9, 0.42],
  [0.75, 1.02, 0.26],
  [-0.75, 1.02, 0.26],
  [0.95, 0.3, 0.22],
  [-0.95, 0.3, 0.22],
  [0, 0.78, -0.42],
  [0, 0.32, 0.4],
  [0.27, -1.1, 0.3],
  [-0.27, -1.1, 0.3],
];

// ---- A weight plate (disc on the bar axis = X) with accent rim ------------
function Plate({ radius = 1, thickness = 0.24 }) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh material={PLATE}>
        <cylinderGeometry args={[radius, radius, thickness, 40]} />
      </mesh>
      <mesh>
        <torusGeometry args={[radius * 0.99, thickness * 0.24, 14, 56]} />
        <meshStandardMaterial color={theme.accent} emissive={theme.accent} emissiveIntensity={0.45} metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ---- The barbell that orbits the body -------------------------------------
function Barbell() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]} material={STEEL}>
        <cylinderGeometry args={[0.07, 0.07, 4.6, 18]} />
      </mesh>
      {[1, -1].map((s) => (
        <group key={s} position={[s * 1.9, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={DARK}>
            <cylinderGeometry args={[0.16, 0.16, 0.14, 16]} />
          </mesh>
          <group position={[s * 0.2, 0, 0]} scale={0.62}>
            <Plate radius={0.64} thickness={0.16} />
          </group>
          <group position={[s * 0.42, 0, 0]} scale={0.62}>
            <Plate radius={0.5} thickness={0.14} />
          </group>
        </group>
      ))}
    </group>
  );
}

// ---- The orbit rig: body + barbell + plates, scroll & mouse linked --------
function Rig({ scrollRef, pointerRef, reducedMotion }) {
  const root = useRef();
  const bodyG = useRef();
  const barbell = useRef();
  const plateA = useRef();
  const plateB = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollRef?.current ?? 0;
    const ptr = pointerRef.current;
    const cam = state.camera;
    const r = root.current;
    if (!r) return;

    if (reducedMotion) {
      // Static, composed hero pose.
      if (bodyG.current) bodyG.current.rotation.y = -0.4;
      if (barbell.current) {
        barbell.current.position.set(3.0, 0.6, 0);
        barbell.current.rotation.set(0, 0.4, 0.1);
      }
      return;
    }

    // Body slowly rotates, with extra turn driven by scroll.
    if (bodyG.current) bodyG.current.rotation.y = t * 0.18 + p * Math.PI * 1.4;

    // Barbell orbits the body on a scroll-linked elliptical path that weaves
    // in front of (z>0) and behind (z<0) the sculpture.
    const a = p * Math.PI * 3 + t * 0.25;
    if (barbell.current) {
      barbell.current.position.set(Math.cos(a) * 3.1, Math.sin(a * 0.8) * 1.3, Math.sin(a) * 2.3);
      barbell.current.rotation.set(Math.sin(a) * 0.3, a + Math.PI / 2, 0.12 + Math.cos(a) * 0.2);
    }
    // Supporting plates orbit at other phases/radii.
    if (plateA.current) {
      const b = -a * 0.7 + 1.6;
      plateA.current.position.set(Math.cos(b) * 3.9, Math.sin(b) * 1.6 + 0.4, Math.sin(b) * 1.8);
      plateA.current.rotation.y = t * 0.4;
    }
    if (plateB.current) {
      const c = a * 0.5 + 3.4;
      plateB.current.position.set(Math.cos(c) * 4.3, Math.sin(c) * 1.2 - 0.6, Math.sin(c) * 2.6);
      plateB.current.rotation.y = -t * 0.3;
    }

    // Whole rig + camera follow the mouse (premium parallax).
    r.rotation.y = THREE.MathUtils.lerp(r.rotation.y, ptr.x * 0.22, 0.05);
    r.rotation.x = THREE.MathUtils.lerp(r.rotation.x, -ptr.y * 0.12, 0.05);
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, ptr.x * 0.8, 0.04);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, 0.5 - ptr.y * 0.5, 0.04);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, THREE.MathUtils.lerp(11.5, 9.5, p), 0.04);
    cam.lookAt(0, 0.2, 0);
  });

  return (
    <group ref={root}>
      <group ref={bodyG}>
        <Body />
        {ZONES.map((pos, i) => (
          <Marker key={i} position={pos} phase={i * 0.7} reducedMotion={reducedMotion} />
        ))}
      </group>
      <group ref={barbell}>
        <Barbell />
      </group>
      <group ref={plateA}>
        <Plate radius={0.95} thickness={0.22} />
      </group>
      <group ref={plateB}>
        <Plate radius={0.7} thickness={0.2} />
      </group>
    </group>
  );
}

export default function DumbbellScene({ scrollRef }) {
  const reducedMotion = prefersReducedMotion();
  const heavy = allowHeavyFx();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

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
        camera={{ position: [0, 0.5, 11.5], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 6]} intensity={1.6} color="#ffffff" />
          {/* blue rim light behind the body reveals the silhouette */}
          <spotLight position={[-6, 4, -7]} angle={0.7} penumbra={1} intensity={45} color={theme.accent} />
          <pointLight position={[7, -2, 4]} intensity={16} color={theme.accent2} />

          <Rig scrollRef={scrollRef} pointerRef={pointer} reducedMotion={reducedMotion} />

          {heavy && (
            <Sparkles count={45} scale={[16, 10, 7]} size={2} speed={0.22} opacity={0.4} color={theme.accent} />
          )}
          {heavy && (
            <Grid
              position={[0, -3.4, 0]}
              args={[26, 26]}
              cellSize={0.7}
              cellThickness={0.6}
              cellColor="#1b2740"
              sectionSize={3}
              sectionThickness={1}
              sectionColor={theme.accent}
              fadeDistance={26}
              fadeStrength={2}
              infiniteGrid={false}
            />
          )}

          {/* Studio reflections (self-contained, no network/HDRI) */}
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 4, -6]} scale={[12, 6, 1]} />
            <Lightformer intensity={1.8} color={theme.accent} position={[-6, 1, 2]} scale={[3, 9, 1]} />
            <Lightformer intensity={1.1} color="#ffffff" position={[6, -1, 2]} scale={[3, 9, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
