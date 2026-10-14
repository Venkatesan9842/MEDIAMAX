import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useAmbientMotion(scope) {
  useLayoutEffect(() => {
    const listeners = [];
    const context = gsap.context(() => {
      // Do not scale the hero panel itself. Its stats and action icons sit at
      // the panel edges, and scaling clips them when the user scrolls back up.
      gsap.from('.promo-section', {
        clipPath: 'inset(0 50% 0 50% round 22px)', duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: '.promo-section', start: 'top 78%' },
      });
      gsap.fromTo('.promo-image', { scale: 1 }, {
        scale: 1.13,
        ease: 'none',
        scrollTrigger: { trigger: '.promo-section', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
      gsap.to('.promo-marquee-track', { xPercent: -50, duration: 28, repeat: -1, ease: 'none' });
      gsap.from('.performance-image, .footer-image', {
        scale: 1.13, ease: 'none', scrollTrigger: { trigger: '.performance-section', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.smart-circle', { rotate: 360, duration: 24, repeat: -1, ease: 'none' });
      gsap.utils.toArray('.property-card, .category-card').forEach((card) => {
        const enter = () => gsap.to(card, { scale: 0.975, duration: 0.35, ease: 'power2.out' });
        const leave = () => gsap.to(card, { scale: 1, duration: 0.55, ease: 'elastic.out(1, .6)' });
        card.addEventListener('pointerenter', enter);
        card.addEventListener('pointerleave', leave);
        listeners.push([card, 'pointerenter', enter], [card, 'pointerleave', leave]);
      });
      gsap.utils.toArray('.service-list button').forEach((button) => {
        const enter = () => gsap.to(button, { x: 9, duration: .28, ease: 'power2.out' });
        const leave = () => gsap.to(button, { x: 0, duration: .4, ease: 'power2.out' });
        button.addEventListener('pointerenter', enter);
        button.addEventListener('pointerleave', leave);
        listeners.push([button, 'pointerenter', enter], [button, 'pointerleave', leave]);
      });
    }, scope);
    return () => {
      listeners.forEach(([element, event, handler]) => element.removeEventListener(event, handler));
      context.revert();
    };
  }, [scope]);
}
