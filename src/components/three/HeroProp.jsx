import * as THREE from "three";
import { theme } from "../../content";

// Shared materials
const STEEL = new THREE.MeshStandardMaterial({ color: "#aeb6c6", metalness: 1, roughness: 0.26 });
const DARK = new THREE.MeshStandardMaterial({ color: "#222837", metalness: 0.9, roughness: 0.4 });
const PLATE = new THREE.MeshStandardMaterial({ color: "#10141d", metalness: 0.85, roughness: 0.34 });
const RIM = new THREE.MeshStandardMaterial({
  color: theme.accent,
  emissive: theme.accent,
  emissiveIntensity: 0.4,
  metalness: 0.5,
  roughness: 0.3,
});

function PlatePair({ x }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={DARK}>
        <cylinderGeometry args={[0.18, 0.18, 0.16, 18]} />
      </mesh>
      <group position={[Math.sign(x) * 0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={PLATE}>
          <cylinderGeometry args={[0.7, 0.7, 0.18, 40]} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.69, 0.05, 14, 56]} />
        </mesh>
        <mesh material={RIM}>
          <torusGeometry args={[0.69, 0.045, 14, 56]} />
        </mesh>
      </group>
    </group>
  );
}

// The single hero prop: a heavy cinematic barbell. Its transform is driven by
// the scene's scroll timeline (see DumbbellScene) so it stays integrated with
// the composition rather than floating randomly.
export default function HeroProp() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]} material={STEEL}>
        <cylinderGeometry args={[0.08, 0.08, 5, 20]} />
      </mesh>
      <PlatePair x={2.0} />
      <PlatePair x={-2.0} />
    </group>
  );
}
