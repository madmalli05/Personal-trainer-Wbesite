import { Component, Suspense, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { modelAssets } from "../../config/modelAssets";
import { theme } from "../../content";

/* ---------------------------------------------------------------------------
   REAL MODEL  — loads public/models/madtrains-body.glb via useGLTF and applies
   a dark "statue/anatomy" material override (keeps any normal/roughness maps).
   Only rendered when modelAssets.body.useModel === true.
--------------------------------------------------------------------------- */
function GLTFBody() {
  const cfg = modelAssets.body;
  const { scene } = useGLTF(cfg.path);

  const prepared = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = false;
      o.receiveShadow = false;
      const m = o.material;
      if (m) {
        // Mutate (don't replace) so existing normal/roughness maps survive.
        m.color = new THREE.Color(cfg.material.color);
        if ("metalness" in m) m.metalness = cfg.material.metalness;
        if ("roughness" in m) m.roughness = cfg.material.roughness;
        if ("envMapIntensity" in m) m.envMapIntensity = 1.1;
      }
    });
    return root;
  }, [scene, cfg]);

  // Centered/raw — the parent body group (in DumbbellScene) applies scale,
  // position and rotation so the muscle-scan overlays share the same space.
  return <primitive object={prepared} />;
}

/* ---------------------------------------------------------------------------
   PREMIUM FALLBACK  — a single sculpted V-taper silhouette (NOT ball-and-stick).
   Dark matte statue material + an additive blue rim halo. Temporary: a real
   GLB at public/models/madtrains-body.glb is required for Cosmos-level realism.
--------------------------------------------------------------------------- */
function FallbackBody() {
  const cfg = modelAssets.body;

  // Muscular V-taper torso/bust outline (right half, top→bottom). Mirrored.
  const geometry = useMemo(() => {
    const R = [
      [0, 5.0], [0.5, 4.7], [0.62, 4.2], [0.55, 3.78], [0.42, 3.5],
      [0.95, 3.32], [1.75, 3.02], [2.4, 2.68], [2.32, 2.2], [2.0, 1.82],
      [1.6, 1.32], [1.2, 0.66], [0.98, -0.02], [1.02, -0.62], [0.86, -1.0],
      [0, -1.28],
    ];
    const shape = new THREE.Shape();
    shape.moveTo(R[0][0], R[0][1]);
    for (let i = 1; i < R.length; i++) shape.lineTo(R[i][0], R[i][1]);
    for (let i = R.length - 2; i >= 1; i--) shape.lineTo(-R[i][0], R[i][1]);
    shape.lineTo(R[0][0], R[0][1]);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 1.15,
      bevelEnabled: true,
      bevelThickness: 0.35,
      bevelSize: 0.32,
      bevelSegments: 4,
      steps: 1,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Normalize the silhouette to ~1.74 units tall (same as the generated model)
  // so the parent body group's scale/position framing works for both.
  const s = 0.28 * cfg.fallbackScale;
  return (
    <group scale={[s, s, s * 0.8]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#131822" metalness={0.3} roughness={0.72} />
      </mesh>
      {/* additive rim halo — fakes a Fresnel edge glow on the silhouette */}
      <mesh geometry={geometry} scale={1.04}>
        <meshBasicMaterial
          color={theme.accent}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* Catches a missing/failed GLB and shows the fallback instead of crashing. */
class ModelErrorBoundary extends Component {
  constructor(p) {
    super(p);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    // eslint-disable-next-line no-console
    console.warn("[MadTrains] Body GLB failed to load — using fallback silhouette.");
  }
  render() {
    return this.state.failed ? <FallbackBody /> : this.props.children;
  }
}

export default function BodyModel() {
  // No model yet → render the fallback directly (no network 404 noise).
  if (!modelAssets.body.useModel || !modelAssets.body.path) return <FallbackBody />;

  return (
    <ModelErrorBoundary>
      <Suspense fallback={<FallbackBody />}>
        <GLTFBody />
      </Suspense>
    </ModelErrorBoundary>
  );
}

// Preload only when a real model is expected.
if (modelAssets.body.useModel && modelAssets.body.path) {
  try {
    useGLTF.preload(modelAssets.body.path);
  } catch {
    /* ignore */
  }
}
