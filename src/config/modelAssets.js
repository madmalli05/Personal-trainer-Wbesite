// ============================================================================
//  🧍 3D BODY / HERO MODEL CONFIG  —  the one place to control the hero figure
// ----------------------------------------------------------------------------
//  ⚠️ FINAL COSMOS-LEVEL REALISM REQUIRES A REAL MODEL.
//  Drop a realistic muscular/anatomical bodybuilder model here:
//        public/models/madtrains-body.glb
//  then set  body.useModel = true  below. The scene will use it automatically.
//
//  Until then the scene renders a PREMIUM DARK SILHOUETTE FALLBACK (a single
//  sculpted form, not the old ball-and-stick mannequin). The fallback is
//  intentionally temporary — it cannot match a real anatomical GLB.
//
//  Where to get a model: Sketchfab / Quaternius / a Blender export / a paid
//  anatomy model. Keep it web-optimized (Draco/Meshopt compressed, < ~8 MB).
// ============================================================================

export const modelAssets = {
  body: {
    // Set true AFTER you add public/models/madtrains-body.glb
    useModel: false,
    path: "/models/madtrains-body.glb",

    // Big, cropped — like the Cosmos humanoid. Tune to your model.
    // Keep X at 0 so the figure rotates in place (camera handles asymmetry/crop).
    scale: 9,
    position: [0, -7.2, 0], // low so torso/shoulders/head fill & crop the frame
    rotation: [0, -0.4, 0],
    fallbackScale: 1.0, // extra multiplier applied to the silhouette fallback

    // Dark "statue / anatomy" material override applied to every mesh in the GLB
    // (so it never looks like shiny toy plastic). Tune to taste.
    material: { color: "#161b26", metalness: 0.28, roughness: 0.66, rim: true },

    // OPTIONAL: if your GLB has named muscle meshes, map them here to enable
    // true per-muscle highlighting later. Leave empty to use approximate anchors.
    muscleMeshNames: { chest: "", back: "", shoulders: "", arms: "", core: "", quads: "" },
  },

  // Approximate muscle-zone anchor positions (in body-local space) for the
  // glowing "training scan" overlays. Tune these to sit on your model's muscles.
  // [x, y, z] — front zones have +z, back zones have −z.
  muscleZoneAnchors: {
    Chest: [0.0, 0.95, 0.55],
    Shoulders: [0.95, 1.15, 0.35],
    Arms: [1.25, 0.35, 0.3],
    Core: [0.0, 0.3, 0.55],
    Quads: [0.4, -1.0, 0.4],
    Back: [0.0, 0.9, -0.55],
  },

  // OPTIONAL separate hero prop model. Empty path => procedural barbell is used.
  prop: { path: "", scale: 1, position: [0, 0, 0], rotation: [0, 0, 0] },

  // Camera framing per scroll position (lerped between stops). Close + cropped.
  // `pos` = camera position, `look` = lookAt target. fov controls crop.
  camera: {
    fov: 38,
    stops: [
      { at: 0.0, pos: [0.6, 0.3, 7.0], look: [0.5, 0.2, 0] }, // hero — close 3/4 front
      { at: 0.18, pos: [1.7, 1.0, 7.4], look: [0.2, 0.6, 0] }, // about — shoulder/side
      { at: 0.4, pos: [-0.4, 0.3, 8.0], look: [0.0, 0.2, 0] }, // programs — prop reveal
      { at: 0.6, pos: [0.5, 0.3, 6.8], look: [0.3, 0.2, 0] }, // method — anatomy scan
      { at: 0.8, pos: [-0.8, 0.7, 7.6], look: [0.0, 0.4, 0] }, // results — back/lats
      { at: 1.0, pos: [0.8, 0.3, 6.6], look: [0.5, 0.2, 0] }, // apply — final pose
    ],
  },

  // Body Y-rotation per scroll position (radians, monotonic = cinematic, not a
  // constant turntable): front → 3/4 → side → back → final 3/4.
  bodyRotation: [-0.35, -0.85, -1.6, -2.5, -3.7, -4.9],
};
