import { useState } from "react";
import Img from "./Img";

// Accessible before/after comparison slider.
// The divider is driven by a real <input type="range">, which gives us
// keyboard (arrow keys), screen-reader and touch/drag support for free.
export default function BeforeAfter({ before, after, beforeAlt, afterAlt, name }) {
  const [pos, setPos] = useState(50);

  return (
    <figure className="ba">
      <div className="ba-stage" style={{ "--pos": `${pos}%` }}>
        {/* AFTER is the base layer (full width) */}
        <Img className="ba-img" src={after} alt={afterAlt || `${name} after`} shape="portrait" />
        {/* BEFORE is layered on top and clipped to the divider position */}
        <Img className="ba-img ba-before" src={before} alt={beforeAlt || `${name} before`} shape="portrait" />

        <span className="ba-label ba-label-before">Before</span>
        <span className="ba-label ba-label-after">After</span>

        {/* Range is the interactive layer (kept above visuals via z-index).
            It sits before the divider in the DOM so :focus-visible can ring the handle. */}
        <input
          className="ba-range"
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal ${name} after photo`}
          aria-valuetext={`${pos}% revealed`}
        />

        <div className="ba-divider" aria-hidden="true">
          <span className="ba-handle">‹ ›</span>
        </div>
      </div>
      <figcaption className="ba-caption">{name}</figcaption>
    </figure>
  );
}
