import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, Grid } from "@react-three/drei";
import * as THREE from "three";
import { theme } from "../content";
import { modelAssets } from "../config/modelAssets";
import { allowHeavyFx, prefersReducedMotion } from "../motionConfig";
import BodyModel from "./three/BodyModel";
import HeroProp from "./three/HeroProp";
import MuscleScan from "./three/MuscleScan";

// --- Scroll timeline: interpolate camera framing + body rotation at progress p
const STOPS = modelAssets.camera.stops;
const ROTS = modelAssets.bodyRotation;
const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
let _rotY = 0;

function sampleTimeline(p) {
  let i = 0;
  while (i < STOPS.length - 2 && p > STOPS[i + 1].at) i++;
  const a = STOPS[i];
  const b = STOPS[i + 1] || a;
  const span = b.at - a.at || 1;
  const t = THREE.MathUtils.clamp((p - a.at) / span, 0, 1);
  _pos.set(
    THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
    THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
    THREE.MathUtils.lerp(a.pos[2], b.pos[2], t)
  );
  _look.set(
    THREE.MathUtils.lerp(a.look[0], b.look[0], t),
    THREE.MathUtils.lerp(a.look[1], b.look[1], t),
    THREE.MathUtils.lerp(a.look[2], b.look[2], t)
  );
  _rotY = THREE.MathUtils.lerp(ROTS[i] ?? 0, ROTS[i + 1] ?? ROTS[i] ?? 0, t);
}

// Rotating rig: the body (model or fallback) + the co-rotating muscle scan,
// plus the integrated hero prop. Camera + rotation are scroll-driven.
function Rig({ scrollRef, pointerRef, reducedMotion }) {
  const bodyG = useRef();
  const propG = useRef();

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(scrollRef?.current ?? 0, 0, 1);
    const ptr = pointerRef.current;
    const cam = state.camera;
    const k = Math.min(1, delta * 4); // frame-rate-independent damping
    const mx = reducedMotion ? 0 : ptr.x;
    const my = reducedMotion ? 0 : ptr.y;
    sampleTimeline(p);

    // Close, cropped camera framing + subtle mouse drift.
    cam.position.x += (_pos.x + mx * 0.6 - cam.position.x) * k;
    cam.position.y += (_pos.y - my * 0.5 - cam.position.y) * k;
    cam.position.z += (_pos.z - cam.position.z) * k;
    cam.lookAt(_look.x, _look.y, _look.z);

    // Body rotates in place: front → 3/4 → side → back → final.
    if (bodyG.current) {
      const targetY = _rotY + mx * 0.12;
      bodyG.current.rotation.y += (targetY - bodyG.current.rotation.y) * k;
      bodyG.current.rotation.x += (-my * 0.06 - bodyG.current.rotation.x) * k;
    }

    // Hero prop kept low/side & foreground so it supports (never covers) the CTA.
    if (propG.current) {
      const t = reducedMotion ? 0 : state.clock.elapsedTime;
      propG.current.position.set(-2.7 + Math.sin(p * Math.PI) * 1.1, -2.6 + p * 1.6, 2.4);
      propG.current.rotation.set(0.2, -0.6 + p * 2.4 + t * 0.05, 0.55 + p * 0.5);
    }
  });

  return (
    <>
      <group ref={bodyG} position={modelAssets.body.position} scale={modelAssets.body.scale}>
        <BodyModel />
        <MuscleScan scrollRef={scrollRef} reducedMotion={reducedMotion} />
      </group>
      <group ref={propG}>
        <HeroProp />
      </group>
    </>
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
        camera={{ position: [0.6, 0.3, 7], fov: modelAssets.camera.fov }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 8, 6]} intensity={1.5} color="#ffffff" />
          {/* strong blue rim light behind reveals the silhouette (Cosmos-style) */}
          <spotLight position={[-7, 5, -8]} angle={0.8} penumbra={1} intensity={70} color={theme.accent} />
          <spotLight position={[8, 2, 5]} angle={0.7} penumbra={1} intensity={26} color="#ffffff" />

          <Rig scrollRef={scrollRef} pointerRef={pointer} reducedMotion={reducedMotion} />

          {heavy && (
            <Sparkles count={40} scale={[18, 12, 8]} size={2} speed={0.2} opacity={0.35} color={theme.accent} />
          )}
          {heavy && (
            <Grid
              position={[0, -5.6, 0]}
              args={[40, 40]}
              cellSize={0.8}
              cellThickness={0.6}
              cellColor="#16203a"
              sectionSize={4}
              sectionThickness={1}
              sectionColor={theme.accent}
              fadeDistance={34}
              fadeStrength={2}
              infiniteGrid={false}
            />
          )}

          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 4, -6]} scale={[14, 7, 1]} />
            <Lightformer intensity={2} color={theme.accent} position={[-7, 1, 2]} scale={[3, 10, 1]} />
            <Lightformer intensity={1.1} color="#ffffff" position={[7, -1, 2]} scale={[3, 10, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
