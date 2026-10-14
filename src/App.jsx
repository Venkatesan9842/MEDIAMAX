import { useRef } from 'react';
import { HeroReference } from './components/HeroReference';
import { PropertyGrid } from './components/PropertyGrid';
import { Ownership } from './components/Ownership';
import { CategoryGrid } from './components/CategoryGrid';
import { PromoBanner } from './components/PromoBanner';
import { Services } from './components/Services';
import { Performance } from './components/Performance';
import { Advantages } from './components/Advantages';
import { Faq } from './components/Faq';
import { SiteFooter } from './components/SiteFooter';
import { BrandMarquee } from './components/BrandMarquee';
import { usePageMotion } from './hooks/usePageMotion';
import { useAmbientMotion } from './hooks/useAmbientMotion';

export default function App() {
  const page = useRef(null);
  usePageMotion(page);
  useAmbientMotion(page);

  return (
    <main className="site-shell" ref={page}><HeroReference /><PromoBanner /><PropertyGrid /><Services /><Performance /><Ownership /><Advantages /><CategoryGrid /><Faq /><BrandMarquee /><SiteFooter /></main>
  );
}
