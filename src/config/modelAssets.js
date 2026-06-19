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
    // A generated metaball sculpture ships at public/models/madtrains-body.glb
    // (see scripts/build-body.mjs). Replace it with a real anatomical scan for
    // photoreal quality, keep useModel:true.
    useModel: true,
    path: "/models/madtrains-body.glb",

    // The generated mesh is centered at origin, ~1.74 units tall. Big + cropped.
    // Keep X/Z at 0 so the figure rotates in place (camera handles asymmetry).
    scale: 4.2,
    position: [0, -1.5, 0],
    rotation: [0, -0.4, 0],
    fallbackScale: 1.0, // extra multiplier applied to the silhouette fallback

    // Dark deep-blue "statue / anatomy" material override (matches the brand).
    material: { color: "#1b2c4e", metalness: 0.32, roughness: 0.52, rim: true },

    // OPTIONAL: if your GLB has named muscle meshes, map them here to enable
    // true per-muscle highlighting later. Leave empty to use approximate anchors.
    muscleMeshNames: { chest: "", back: "", shoulders: "", arms: "", core: "", quads: "" },
  },

  // Approximate muscle-zone anchor positions (in body-local space) for the
  // glowing "training scan" overlays. Tune these to sit on your model's muscles.
  // [x, y, z] — front zones have +z, back zones have −z.
  // (model-local space — the generated mesh is ~1.74 tall, centered at origin)
  muscleZoneAnchors: {
    Chest: [0.0, 0.45, 0.34],
    Shoulders: [0.5, 0.5, 0.2],
    Arms: [0.62, 0.15, 0.2],
    Core: [0.0, 0.15, 0.36],
    Quads: [0.16, -0.45, 0.3],
    Back: [0.0, 0.42, -0.32],
  },

  // OPTIONAL separate hero prop model. Empty path => procedural barbell is used.
  prop: { path: "", scale: 1, position: [0, 0, 0], rotation: [0, 0, 0] },

  // Camera framing per scroll position (lerped between stops). Close + cropped.
  // `pos` = camera position, `look` = lookAt target. fov controls crop.
  camera: {
    fov: 40,
    stops: [
      { at: 0.0, pos: [0.5, 0.8, 6.8], look: [0.35, 0.7, 0] }, // hero — close 3/4 front (chest/shoulders)
      { at: 0.18, pos: [1.9, 1.3, 7.0], look: [0.2, 1.0, 0] }, // about — shoulder/head
      { at: 0.4, pos: [-0.7, 0.6, 7.6], look: [0.0, 0.5, 0] }, // programs — prop reveal
      { at: 0.6, pos: [0.5, 0.6, 6.6], look: [0.3, 0.6, 0] }, // method — anatomy scan
      { at: 0.8, pos: [-1.1, 0.9, 7.4], look: [0.0, 0.8, 0] }, // results — back/lats
      { at: 1.0, pos: [0.8, 0.6, 6.4], look: [0.4, 0.6, 0] }, // apply — final pose
    ],
  },

  // Body Y-rotation per scroll position (radians, monotonic = cinematic, not a
  // constant turntable): front → 3/4 → side → back → final 3/4.
  bodyRotation: [-0.35, -0.85, -1.6, -2.5, -3.7, -4.9],
};
