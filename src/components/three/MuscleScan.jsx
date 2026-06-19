import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { theme } from "../../content";
import { method } from "../../content";
import { modelAssets } from "../../config/modelAssets";

// A single glowing anatomical "scan" ring sitting over a muscle zone. Pulses,
// and ramps up during the anatomy/method scroll range (≈0.5–0.7) like a
// futuristic training scan — not a flat sticker dot.
function ZoneRing({ position, back, phase, scrollRef, reducedMotion }) {
  const mat = useRef();
  useFrame((state) => {
    if (!mat.current) return;
    const p = scrollRef?.current ?? 0;
    const scan = Math.max(0, 1 - Math.abs(p - 0.6) / 0.18); // peak around the method section
    const pulse = reducedMotion ? 0.6 : 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 1.6 + phase);
    mat.current.opacity = 0.18 + scan * 0.5 + pulse * 0.12;
  });
  return (
    <group position={position} rotation={[0, back ? Math.PI : 0, 0]}>
      <mesh>
        <torusGeometry args={[0.15, 0.012, 10, 36]} />
        <meshBasicMaterial
          ref={mat}
          color={theme.accent}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// Renders a scan ring for each muscle zone (from content.method.muscleZones)
// at its approximate anchor (from modelAssets.muscleZoneAnchors). Lives inside
// the rotating body group so rings appear/disappear naturally as it turns.
export default function MuscleScan({ scrollRef, reducedMotion }) {
  const zones = useMemo(() => {
    const a = modelAssets.muscleZoneAnchors;
    return method.muscleZones
      .map((z, i) => ({ name: z, pos: a[z], back: z === "Back", phase: i * 0.8 }))
      .filter((z) => Array.isArray(z.pos));
  }, []);

  return (
    <group>
      {zones.map((z) => (
        <ZoneRing
          key={z.name}
          position={z.pos}
          back={z.back}
          phase={z.phase}
          scrollRef={scrollRef}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}
