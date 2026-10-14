const message = 'Investments with an initial payment from $25,000  •  interest-free  •  reliable income  •';

export function PromoBanner() {
  return <section className="section promo-section">
    <div className="promo-image" aria-hidden="true" />
    <div className="promo-icons">⌂　⌕</div>
    <div className="promo-marquee" aria-label={message}>
      <div className="promo-marquee-track">
        <span>{message}&nbsp;&nbsp;&nbsp;</span>
        <span aria-hidden="true">{message}&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  </section>;
}
