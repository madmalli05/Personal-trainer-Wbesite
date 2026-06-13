// Central GSAP setup — importing from here guarantees plugins are registered
// (at module-load, before any component effect runs) so ScrollTrigger/SplitText
// are always available wherever they're used.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText, useGSAP };
