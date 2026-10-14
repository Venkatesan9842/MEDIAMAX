const Icon = ({ children, label }) => <button className="icon-button" aria-label={label}>{children}</button>;

export function HeroReference() {
  return <section className="hero-section section" id="top">
    <header className="topbar motion-intro">
      <a className="wordmark" href="#top"><strong>MONTE</strong><span>REAL ESTATE</span></a>
      <div className="topbar-actions"><Icon label="Language"><i className="language-icon" /></Icon><Icon label="Menu"><i className="menu-icon" /></Icon></div>
    </header>
    <div className="hero-panel">
      <div className="hero-copy"><p className="kicker">Building Your Dreams</p><h1>Real Estate in Dubai:<br />Ideal for Living and<br />Investing</h1><div className="hero-footer"><button className="contact-button" aria-label="Contact us">Contact Us Now <span aria-hidden="true">☎</span></button><a href="#properties">Explore All<br />Our Properties <b className="arrow-up-right" /></a></div></div>
      <div className="hero-photo"><div className="hero-stats"><span>More than 1500 real<br />estate properties</span><span>From $145,000 with a<br />yield of 10% per annum</span></div><div className="hero-corners"><Icon label="Save property"><i className="heart-icon" /></Icon><Icon label="Share property"><i className="share-icon" /></Icon></div><button className="catalog-button">catalog<br />download <i className="download-icon" /></button></div>
    </div>
  </section>;
}
