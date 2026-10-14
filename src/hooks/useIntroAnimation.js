import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

export function useIntroAnimation(scope) {
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.set('.intro-item', { autoAlpha: 0, y: 28 });
      gsap.set('.video-card', { scale: 0.9, rotate: 4 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to('.site-header', { autoAlpha: 1, y: 0, duration: 0.7 })
        .to('.hero-copy .intro-item', { autoAlpha: 1, y: 0, stagger: 0.11, duration: 0.8 }, '-=0.25')
        .to('.video-stage', { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.72')
        .to('.video-card', { scale: 1, rotate: -2, duration: 1.1, ease: 'back.out(1.25)' }, '-=0.85')
        .to('.scroll-cue', { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.25');
    }, scope);
    return () => context.revert();
  }, [scope]);
}
