# 3D body model goes here

Drop a realistic muscular / anatomical **bodybuilder** model in this folder named:

```
public/models/madtrains-body.glb
```

Then open **`src/config/modelAssets.js`** and set:

```js
body: {
  useModel: true,   // ← flip this on
  ...
}
```

The hero scene will load it automatically (via `useGLTF`) and apply the dark
"statue/anatomy" material override. If the file is missing or fails to load, the
scene falls back to a premium dark silhouette (a temporary placeholder — it
cannot match a real anatomical model).

## Tips for the model
- **Format:** `.glb` (preferred) or `.gltf`. Keep it web-optimized — ideally
  Draco or Meshopt compressed, and under ~8 MB.
- **Pose:** a strong standing / 3-4 bodybuilder pose works best for the rotation.
- **Scale / position / rotation / camera framing** are all tuned in
  `src/config/modelAssets.js` (`body.scale`, `body.position`, `camera.stops`,
  `bodyRotation`).
- **Material** look is set by `body.material` (color / metalness / roughness).
- **Muscle highlights:** if your model exposes named muscle meshes, list them in
  `body.muscleMeshNames`; otherwise the approximate `muscleZoneAnchors` are used.

## Where to find a model
Sketchfab (filter for downloadable), Quaternius, a Blender export, or a paid
anatomy/écorché model. Search terms: "bodybuilder", "muscular male anatomy",
"male body base mesh".
