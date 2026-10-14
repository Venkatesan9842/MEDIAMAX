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
      // Background images are isolated from their content, letting the image
      // parallax without moving labels, cards, or calls to action.
      gsap.fromTo('.performance-scene',
        { scale: 1.14, yPercent: -7 },
        {
          scale: 1,
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: '.performance-visual',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      );
      gsap.to('.hero-photo', {
        backgroundPosition: '50% 65%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      });
      gsap.to('.promo-marquee-track', { xPercent: -50, duration: 28, repeat: -1, ease: 'none' });
      gsap.fromTo('.footer-image', {
        autoAlpha: 0,
        clipPath: 'inset(18% 0 18% 0 round 18px)',
        scale: 1.14,
      }, {
        autoAlpha: 1,
        clipPath: 'inset(0% 0 0% 0 round 18px)',
        scale: 1,
        duration: 1.15,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.site-footer', start: 'top 82%', once: true },
      });
      gsap.to('.footer-image', {
        backgroundPosition: '50% 64%',
        ease: 'none',
        scrollTrigger: { trigger: '.site-footer', start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      // Tie the Performance section directly to the scroll position: its two
      // columns settle into place as the section enters the viewport.
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduceMotion) {
        gsap.timeline({
          scrollTrigger: {
            trigger: '.performance-section',
            start: 'top 88%',
            end: 'top 32%',
            scrub: 0.8,
          },
        })
          .fromTo('.performance-details',
            { autoAlpha: 0, x: -70 },
            { autoAlpha: 1, x: 0, ease: 'none', duration: 1 },
          )
          .fromTo('.performance-visual',
            { autoAlpha: 0, x: 70, scale: 0.94 },
            { autoAlpha: 1, x: 0, scale: 1, ease: 'none', duration: 1 },
            0.08,
          );
      }
      gsap.to('.smart-circle', { rotate: 360, duration: 24, repeat: -1, ease: 'none' });
      gsap.utils.toArray('.property-card').forEach((card) => {
        const enter = () => gsap.to(card, { scale: 0.975, duration: 0.35, ease: 'power2.out' });
        const leave = () => gsap.to(card, { scale: 1, duration: 0.55, ease: 'elastic.out(1, .6)' });
        card.addEventListener('pointerenter', enter);
        card.addEventListener('pointerleave', leave);
        listeners.push([card, 'pointerenter', enter], [card, 'pointerleave', leave]);
      });
      gsap.utils.toArray('.category-card').forEach((card) => {
        const enter = () => {
          gsap.killTweensOf(card);
          gsap.set(card, { zIndex: 3 });
          gsap.to(card, {
            scale: 1.25,
            borderColor: '#258cff',
            boxShadow: '0 16px 32px rgba(22, 93, 164, 0.28)',
            duration: 0.32,
            ease: 'power3.out',
          });
        };
        const leave = () => {
          gsap.killTweensOf(card);
          gsap.to(card, {
            scale: 1,
            borderColor: 'transparent',
            boxShadow: '0 0 0 rgba(22, 93, 164, 0)',
            duration: 0.42,
            ease: 'power3.out',
            onComplete: () => gsap.set(card, { zIndex: 0 }),
          });
        };
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
