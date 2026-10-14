import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 82, suffix: '+', label: <>Successful<br />Transactions Monthly</> },
  { value: 80, suffix: '', label: <>Customer<br />Satisfaction Rate</> },
  { value: 412, suffix: '', label: <>Exquisite Properties<br />Ready for Your Selection</> },
];

function CountUp({ value, suffix }) {
  const [count, setCount] = useState(0);
  const number = useRef(null);

  useEffect(() => {
    const element = number.current;
    let frame;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      const startedAt = performance.now();
      const duration = 1500;
      const update = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        setCount(Math.floor(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <b className="performance-number" ref={number}>{count}{suffix}</b>;
}

export function Performance() {
  return <section className="section performance-section">
    <div className="performance-details">
      <p>At Golden Gate Properties, we offer more than<br />just real estate services; we provide an unparalleled<br />experience tailored to meet your needs and exceed<br />your expectations.</p>
      <div className="team-link" aria-label="Meet our professional team">
        <div className="team-avatars"><span /><span /><span /><span /></div>
        <span>Meet Our<br />Professional Team</span>
      </div>
      <div className="performance-stats">
        {stats.map((stat) => <div className="performance-stat" key={stat.value}>
          <CountUp value={stat.value} suffix={stat.suffix} />
          <span>{stat.label}</span>
        </div>)}
      </div>
    </div>
    <div className="performance-visual">
      <button className="performance-contact"><span>☎</span> Contact Us Now</button>
      <div className="performance-scene" />
      <p>Building Your Dreams</p>
      <button className="performance-offer"><span>✦</span><small>Special Offer</small>Get The Consultation<br />With Our Expert</button>
    </div>
  </section>;
}
