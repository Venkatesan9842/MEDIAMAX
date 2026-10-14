import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function LifestyleVideo() {
  const card = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    const target = card.current;
    const onMove = (event) => {
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(target, { rotateY: x * 5, rotateX: y * -5, duration: 0.6, ease: 'power2.out', transformPerspective: 900 });
    };
    const reset = () => gsap.to(target, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, 0.55)' });
    target.addEventListener('pointermove', onMove);
    target.addEventListener('pointerleave', reset);
    return () => { target.removeEventListener('pointermove', onMove); target.removeEventListener('pointerleave', reset); };
  }, []);

  return (
    <div className="video-stage intro-item">
      <div className="sticker sticker--top">slow<br />down</div>
      <div className="video-shadow" />
      <figure className="video-card" ref={card}>
        <video ref={video} autoPlay loop muted playsInline>
          <source src="/healthy-lifestyle-tips.mp4" type="video/mp4" />
        </video>
        <figcaption><span>Daily inspiration</span><b>01 — 38</b></figcaption>
      </figure>
      <div className="sticker sticker--bottom">feel<br /><em>alive</em></div>
    </div>
  );
}
