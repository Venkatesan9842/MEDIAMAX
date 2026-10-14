import { Fragment, useEffect, useRef } from "react";

const points = [
  "10% Initial\nPayment",
  "5 years installment,\n0% overpayment",
  "Rental income ~ 15%",
];

/* Circle positions in % of one circle's own size (100 = one diameter) */
const ROW = [
  { x: -88, y: 0 },
  { x: 0, y: 0 },
  { x: 88, y: 0 },
];
const TRIANGLE = [
  { x: -44, y: 22 },
  { x: 0, y: -44 },
  { x: 44, y: 22 },
];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

const css = `
.ownership-section{position:relative;height:190vh;background:#232323;color:#f2f2f2;padding:0}
.ownership-sticky{position:relative;top:0;height:100vh;will-change:transform;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:clamp(48px,9vh,96px);overflow:hidden}
.ownership-head{text-align:center;will-change:opacity}
.ownership-head .kicker{margin:0 0 12px;font-size:.85rem;color:rgba(255,255,255,.55)}
.ownership-head h2{margin:0;font-family:"Helvetica Neue","Inter",Arial,sans-serif;font-weight:400;font-size:clamp(1.6rem,2.6vw,2.4rem);letter-spacing:-.01em;color:#fff}
.ownership-diagram{--d:min(27vw,42vh,340px);position:absolute;left:50%;top:54%;width:var(--d);height:var(--d);transform:translate(-50%,-50%)}
.ownership-circle{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(255,255,255,.6);display:flex;align-items:center;justify-content:center;text-align:center;will-change:transform}
.ownership-circle span{font-size:clamp(.62rem,.95vw,.85rem);line-height:1.35;color:rgba(255,255,255,.75);padding:0 14%;will-change:opacity}
.ownership-core{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;font-size:clamp(.62rem,.95vw,.85rem);line-height:1.3;color:#fff;opacity:0;pointer-events:none;will-change:opacity}
@media (max-width:640px){
  .ownership-diagram{--d:min(31vw,38vh)}
  .ownership-circle span,.ownership-core{font-size:.56rem}
}
@media (prefers-reduced-motion:reduce){
  .ownership-section{height:auto}
  .ownership-sticky{height:80vh;transform:none!important}
}
`;

export function Ownership() {
  const wrapRef = useRef(null);
  const circleRefs = useRef([]);
  const labelRefs = useRef([]);
  const coreRef = useRef(null);
  const headRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const render = () => {
      raf = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;

      let p = 0;
      if (!reduce) {
        const rect = wrap.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        p = total > 0 ? clamp(-rect.top / total) : 0;
        // manual pin (works even if a parent has overflow set)
        if (stageRef.current) {
          const y = total > 0 ? clamp(-rect.top, 0, total) : 0;
          stageRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
      }

      const gather = ease(seg(p, 0, 0.4)); // row -> triangle
      const merge = ease(seg(p, 0.45, 0.85)); // triangle -> one circle
      const labelsOut = seg(p, 0, 0.2);
      const coreIn = seg(p, 0.3, 0.45);
      const headOut = seg(p, 0.88, 0.97);

      circleRefs.current.forEach((el, i) => {
        if (!el) return;
        const x = lerp(ROW[i].x, TRIANGLE[i].x, gather) * (1 - merge);
        const y = lerp(ROW[i].y, TRIANGLE[i].y, gather) * (1 - merge);
        el.style.transform = `translate3d(${x}%, ${y}%, 0)`;
        el.style.borderColor = `rgba(255,255,255,${lerp(0.6, 0.95, merge)})`;
      });
      labelRefs.current.forEach((el) => {
        if (el) el.style.opacity = String(1 - labelsOut);
      });
      if (coreRef.current) coreRef.current.style.opacity = String(coreIn);
      if (headRef.current) headRef.current.style.opacity = String(1 - headOut);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="section ownership-section" ref={wrapRef}>
      <style>{css}</style>
      <div className="ownership-sticky" ref={stageRef}>
        <div className="ownership-head" ref={headRef}>
          <p className="kicker">An accessible way to invest</p>
          <h2>Path to Smart Ownership</h2>
        </div>

        <div className="ownership-diagram">
          {points.map((p, i) => (
            <div
              className="ownership-circle"
              key={p}
              ref={(el) => (circleRefs.current[i] = el)}
            >
              <span ref={(el) => (labelRefs.current[i] = el)}>
                {p.split("\n").map((line, j) => (
                  <Fragment key={j}>
                    {j > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </span>
            </div>
          ))}
          <span className="ownership-core" ref={coreRef}>
            Smart
            <br />
            Ownership
          </span>
        </div>
      </div>
    </section>
  );
}

export default Ownership;