import { useState, useEffect } from "react";
import placeholderWide from "../assets/placeholder-wide.svg";
import placeholderPortrait from "../assets/placeholder-portrait.svg";

// Shared <img> wrapper. If the real photo fails to load (bad URL, offline,
// etc.) it falls back to a bundled on-brand SVG placeholder so the layout
// never shows a broken-image icon. Pass `shape="portrait"` for people shots.
export default function Img({ src, alt = "", shape = "wide", className, style, ...rest }) {
  const fallback = shape === "portrait" ? placeholderPortrait : placeholderWide;
  const [current, setCurrent] = useState(src || fallback);

  // If the content.js src changes (e.g. owner edits it), re-try the real image.
  useEffect(() => {
    setCurrent(src || fallback);
  }, [src, fallback]);

  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
      {...rest}
    />
  );
}
