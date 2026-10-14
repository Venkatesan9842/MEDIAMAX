const brands = [
  { name: 'DAMAC', className: 'brand-damac', subline: 'LIVE THE LUXURY' },
  { name: 'EMAAR', className: 'brand-emaar' },
  { name: 'NAKHEEL', className: 'brand-nakheel', subline: '⌂' },
  { name: 'SOBHA', className: 'brand-sobha' },
  { name: 'MERAAS', className: 'brand-meraas', subline: '▣' },
];

function BrandSet() {
  return brands.map((brand) => (
    <span className={`brand-logo ${brand.className}`} key={brand.name}>
      {brand.subline && <i aria-hidden="true">{brand.subline}</i>}
      <b>{brand.name}</b>
    </span>
  ));
}

export function BrandMarquee() {
  return <section className="brand-marquee" aria-label="Featured developers"><div className="brand-marquee__track"><div className="brand-marquee__set"><BrandSet /></div><div className="brand-marquee__set" aria-hidden="true"><BrandSet /></div></div></section>;
}
