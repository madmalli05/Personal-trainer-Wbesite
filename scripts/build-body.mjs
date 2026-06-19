// ============================================================================
//  MadTrains body sculptor — generates a smooth, organic muscular figure with
//  metaballs (marching cubes) and writes a real binary .glb. Runs headless in
//  Node (no GPU). It is a STYLIZED sculpture, not a photoreal scan — but it is
//  fully 3D (rotates properly) and far smoother than primitive capsules.
//
//  Run:  node scripts/build-body.mjs
//  Out:  public/models/madtrains-body.glb  (+ prints bbox/triangle stats)
// ============================================================================
import * as THREE from "three";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { writeFileSync } from "node:fs";

// --- Muscle "metaballs": [x, y, z, strength] in 0..1 space (center 0.5,0.5) ---
// Tuned for a V-taper bodybuilder: wide delts/chest, narrow waist, big legs.
const SUB = 12;
const BALLS = [
  // head + neck
  [0.5, 0.86, 0.5, 0.62], [0.5, 0.79, 0.5, 0.5],
  // traps
  [0.455, 0.765, 0.49, 0.55], [0.545, 0.765, 0.49, 0.55],
  // delts (wide shoulders)
  [0.36, 0.745, 0.5, 0.85], [0.64, 0.745, 0.5, 0.85],
  // pecs (forward)
  [0.43, 0.715, 0.56, 0.8], [0.57, 0.715, 0.56, 0.8],
  // upper back / lats
  [0.5, 0.7, 0.45, 0.6], [0.405, 0.665, 0.47, 0.7], [0.595, 0.665, 0.47, 0.7],
  // ribcage / serratus
  [0.45, 0.64, 0.54, 0.5], [0.55, 0.64, 0.54, 0.5],
  // abs / core
  [0.5, 0.62, 0.55, 0.55], [0.5, 0.58, 0.54, 0.55],
  // obliques
  [0.45, 0.6, 0.5, 0.45], [0.55, 0.6, 0.5, 0.45],
  // waist (taper)
  [0.5, 0.55, 0.5, 0.5],
  // pelvis / hips
  [0.46, 0.51, 0.5, 0.62], [0.54, 0.51, 0.5, 0.62],
  // biceps
  [0.31, 0.685, 0.5, 0.62], [0.69, 0.685, 0.5, 0.62],
  // elbows
  [0.29, 0.62, 0.5, 0.5], [0.71, 0.62, 0.5, 0.5],
  // forearms
  [0.275, 0.56, 0.5, 0.55], [0.725, 0.56, 0.5, 0.55],
  // fists
  [0.27, 0.505, 0.5, 0.45], [0.73, 0.505, 0.5, 0.45],
  // thighs (big)
  [0.44, 0.43, 0.5, 0.9], [0.56, 0.43, 0.5, 0.9],
  // knees
  [0.44, 0.34, 0.5, 0.55], [0.56, 0.34, 0.5, 0.55],
  // calves
  [0.45, 0.27, 0.5, 0.65], [0.55, 0.27, 0.5, 0.65],
  // feet
  [0.45, 0.18, 0.53, 0.45], [0.55, 0.18, 0.53, 0.45],
];

function sculpt(resolution) {
  const mc = new MarchingCubes(resolution, new THREE.MeshStandardMaterial(), false, false, 600000);
  mc.isolation = 70;
  mc.reset();
  for (const [x, y, z, s] of BALLS) mc.addBall(x, y, z, s, SUB);
  mc.update();
  const count = mc.count;
  const positions = mc.positionArray.slice(0, count * 3);
  const normals = mc.normalArray.slice(0, count * 3);
  return { positions, normals, count };
}

function bbox(positions) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3)
    for (let j = 0; j < 3; j++) {
      const v = positions[i + j];
      if (v < min[j]) min[j] = v;
      if (v > max[j]) max[j] = v;
    }
  return { min, max, size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]] };
}

function writeGLB(positions, normals) {
  const vertCount = positions.length / 3;
  const b = bbox(positions);
  const posBytes = positions.byteLength;
  const normBytes = normals.byteLength;
  let bin = Buffer.concat([
    Buffer.from(positions.buffer, positions.byteOffset, posBytes),
    Buffer.from(normals.buffer, normals.byteOffset, normBytes),
  ]);
  const binPad = (4 - (bin.length % 4)) % 4;
  if (binPad) bin = Buffer.concat([bin, Buffer.alloc(binPad)]);

  const json = {
    asset: { version: "2.0", generator: "MadTrains metaball sculptor" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: "MadTrainsBody" }],
    meshes: [{ name: "Body", primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, mode: 4 }] }],
    buffers: [{ byteLength: bin.length }],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: posBytes, target: 34962 },
      { buffer: 0, byteOffset: posBytes, byteLength: normBytes, target: 34962 },
    ],
    accessors: [
      { bufferView: 0, componentType: 5126, count: vertCount, type: "VEC3", min: b.min, max: b.max },
      { bufferView: 1, componentType: 5126, count: vertCount, type: "VEC3" },
    ],
  };
  let jsonStr = JSON.stringify(json);
  while (jsonStr.length % 4 !== 0) jsonStr += " ";
  const jsonBuf = Buffer.from(jsonStr, "utf8");

  const total = 12 + 8 + jsonBuf.length + 8 + bin.length;
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(total, 8);
  const jsonHdr = Buffer.alloc(8);
  jsonHdr.writeUInt32LE(jsonBuf.length, 0);
  jsonHdr.writeUInt32LE(0x4e4f534a, 4); // "JSON"
  const binHdr = Buffer.alloc(8);
  binHdr.writeUInt32LE(bin.length, 0);
  binHdr.writeUInt32LE(0x004e4942, 4); // "BIN\0"
  return Buffer.concat([header, jsonHdr, jsonBuf, binHdr, bin]);
}

// --- generate ---
const { positions, normals, count } = sculpt(72);
const b = bbox(positions);
const glb = writeGLB(positions, normals);
writeFileSync(new URL("../public/models/madtrains-body.glb", import.meta.url), glb);

console.log("vertices:", count, "triangles:", count / 3);
console.log("bbox size [x,y,z]:", b.size.map((n) => n.toFixed(3)).join(", "));
console.log("bbox min:", b.min.map((n) => n.toFixed(3)).join(", "));
console.log("bbox max:", b.max.map((n) => n.toFixed(3)).join(", "));
console.log("glb bytes:", glb.length, "(", (glb.length / 1024 / 1024).toFixed(2), "MB )");
