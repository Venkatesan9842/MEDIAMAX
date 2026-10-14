import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePageMotion(scope) {
  useLayoutEffect(() => {
    const restoredText = [];
    const ctx = gsap.context(() => {
      // Split only the visible hero headline into characters so GSAP can give
      // the text a precise, staggered entrance without changing its wording.
      const title = document.querySelector('.hero-copy h1');
      if (title) {
        const originalMarkup = title.innerHTML;
        const accessibleLabel = title.textContent;
        const fragment = document.createDocumentFragment();

        title.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            [...node.textContent].forEach((character) => {
              const letter = document.createElement('span');
              letter.className = 'hero-title-character';
              letter.textContent = character === ' ' ? '\u00a0' : character;
              letter.setAttribute('aria-hidden', 'true');
              fragment.appendChild(letter);
            });
          } else {
            fragment.appendChild(node.cloneNode(true));
          }
        });

        title.replaceChildren(fragment);
        title.setAttribute('aria-label', accessibleLabel);
        restoredText.push(() => {
          title.innerHTML = originalMarkup;
          title.removeAttribute('aria-label');
        });
      }

      const reveal = (target, trigger, vars = {}) => gsap.from(target, {
        autoAlpha: 0,
        y: 42,
        duration: 0.82,
        ease: 'power3.out',
        scrollTrigger: { trigger, start: 'top 82%', once: true },
        ...vars,
      });

      // Opening frame: the two halves arrive at slightly different speeds,
      // matching the composed card feel of the supplied reference.
      gsap.set('.motion-intro', { autoAlpha: 0 });
      const intro = gsap.timeline({
        defaults: { ease: 'power4.out' },
        // Keep the first screen in its normal, visible layout after its
        // entrance animation has finished. This prevents the copy from
        // retaining a hidden GSAP state when the user scrolls back to it.
        onComplete: () => gsap.set('.topbar, .hero-copy', {
          autoAlpha: 1,
          clearProps: 'transform',
        }),
      });
      intro
        .fromTo('.topbar', { y: -22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7 })
        .fromTo('.hero-copy', { x: -42, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .85 }, '-=.32')
        .fromTo('.hero-photo', { scale: 1.12, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.15 }, '-=.72')
        .from('.hero-title-character', { yPercent: 115, autoAlpha: 0, stagger: .018, duration: .5 }, '-=.72');

      reveal('.promo-marquee', '.promo-section', { x: 130, y: 0, duration: 1.05 });
      reveal('.promo-icons', '.promo-section', { y: -30, duration: .65 });

      reveal('.section-label', '.property-grid', { x: -28, y: 0, duration: .6 });
      reveal('.property-card', '.property-grid', { y: 65, scale: .94, stagger: .12, duration: .8 });

      reveal('.service-summary', '.services-section', { y: 52, duration: .85 });
      reveal('.service-content h2', '.services-section', { y: 46, duration: .85 });
      reveal('.service-list button', '.service-list', { x: 95, y: 0, stagger: .11, duration: .7 });

      reveal('.ownership-section .kicker, .ownership-section h2', '.ownership-section', { y: 36, stagger: .12, duration: .7 });
      reveal('.ownership-circle', '.ownership-diagram', { y: 55, scale: .72, stagger: .14, duration: .85, ease: 'back.out(1.45)' });

      reveal('.advantages-grid article', '.advantages-grid', { y: 32, stagger: .09, duration: .55 });
      reveal('.category-card', '.category-grid', { y: 45, scale: .9, stagger: .055, duration: .55 });
      reveal('.category-cta', '.category-grid', { y: 28, scale: .94, duration: .7 });
      reveal('.faq-intro', '.faq-section', { x: -42, y: 0, duration: .7 });
      reveal('.faq-list details', '.faq-list', { x: 42, y: 0, stagger: .08, duration: .5 });
      reveal('.footer-grid > *', '.site-footer', { y: 32, stagger: .1, duration: .65 });
    }, scope);

    return () => {
      ctx.revert();
      restoredText.forEach((restore) => restore());
    };
  }, [scope]);
}
