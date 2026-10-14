const topics = ['Nourish', 'Move', 'Rest', 'Reset'];

export function HeroCopy() {
  return (
    <div className="hero-copy">
      <p className="eyebrow intro-item">Wellness, made human</p>
      <h1 className="display-title" aria-label="Make room for feeling good">
        <span className="intro-item">Make room</span>
        <span className="intro-item">for feeling <em>good.</em></span>
      </h1>
      <p className="intro-item description">Small rituals, realistic ideas, and a little more ease for every day.</p>
      <div className="topic-row intro-item" aria-label="Wellness topics">
        {topics.map((topic, index) => <span key={topic}><b>0{index + 1}</b>{topic}</span>)}
      </div>
    </div>
  );
}
