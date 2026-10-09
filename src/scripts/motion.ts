import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;


/* ---------- helpers ---------- */
function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  const nodes = Array.from(el.childNodes);
  el.innerHTML = '';
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = (node.textContent ?? '').split(/(\s+)/);
      for (const w of words) {
        if (!w) continue;
        if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(' ')); continue; }
        const outer = document.createElement('span');
        outer.className = 'word';
        const inner = document.createElement('span');
        inner.textContent = w;
        outer.appendChild(inner);
        el.appendChild(outer);
      }
    } else if (node instanceof HTMLElement) {
      // keep inline elements like <em> together as one word group
      const outer = document.createElement('span');
      outer.className = 'word';
      const inner = document.createElement('span');
      inner.appendChild(node);
      outer.appendChild(inner);
      el.appendChild(outer);
    }
  }
  el.dataset.splitDone = '1';
}

/* ---------- global, bound once ---------- */
function bindOnce() {
  if ((window as any).__motionBound) return;
  (window as any).__motionBound = true;

  // spotlight on cards
  document.addEventListener('pointermove', (e) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });

  // magnetic buttons
  document.addEventListener('pointermove', (e) => {
    if (reduced()) return;
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-magnetic]');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.25, y: y * 0.3, duration: 0.5, ease: 'power3.out' });
  });
  document.addEventListener('pointerout', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-magnetic]');
    if (!el || el.contains(e.relatedTarget as Node)) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
  });

  // 3D tilt on [data-tilt]
  document.addEventListener('pointermove', (e) => {
    if (reduced()) return;
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-tilt]');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: px * 10, rotateX: -py * 10, transformPerspective: 800, duration: 0.5, ease: 'power2.out' });
  });
  document.addEventListener('pointerout', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-tilt]');
    if (!el || el.contains(e.relatedTarget as Node)) return;
    gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' });
  });
}

/* ---------- per-page ---------- */
function initPage() {
  document.documentElement.classList.add('js');
  document.documentElement.classList.toggle('motion-off', reduced());

  // smooth scroll
  if (!reduced() && !lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => { lenis?.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  lenis?.scrollTo(0, { immediate: true });

  ctx = gsap.context(() => {
    // nav show/hide
    const nav = document.querySelector<HTMLElement>('.nav');
    if (nav) {
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
          nav.classList.toggle('nav--scrolled', self.scroll() > 80);
          nav.classList.toggle('nav--hidden', self.direction === 1 && self.scroll() > 240);
        },
      });
    }

    if (reduced()) return;

    // split headlines
    const splits = gsap.utils.toArray<HTMLElement>('[data-split]');
    splits.forEach((el) => splitWords(el));
    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    splits.forEach((el, i) => {
      intro.from(el.querySelectorAll('.word > span'), {
        yPercent: 110, rotate: 2, duration: 1.1, stagger: 0.045,
      }, i === 0 ? 0.1 : '-=0.8');
    });
    intro.from('[data-hero-fade]', { opacity: 0, y: 20, duration: 0.9, stagger: 0.1 }, '-=0.7');

    // scroll reveals
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
      gsap.fromTo(group.children, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      });
    });

    // timeline track draw
    gsap.utils.toArray<HTMLElement>('.timeline').forEach((tl) => {
      const bar = tl.querySelector('.timeline-track span');
      if (!bar) return;
      gsap.to(bar, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      });
      gsap.utils.toArray<HTMLElement>('.tl-dot', tl).forEach((dot) => {
        gsap.fromTo(dot, { scale: 0 }, {
          scale: 1, duration: 0.5, ease: 'back.out(3)',
          scrollTrigger: { trigger: dot, start: 'top 75%', once: true },
        });
      });
    });

    // counters
    gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
      const target = Number(el.dataset.counter ?? '0');
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
      });
    });

    // parallax blobs
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      const speed = Number(el.dataset.parallax ?? '0.2');
      gsap.to(el, {
        yPercent: speed * 100, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    // horizontal scrub on [data-hscrub] (text drift)
    gsap.utils.toArray<HTMLElement>('[data-hscrub]').forEach((el) => {
      gsap.to(el, {
        xPercent: Number(el.dataset.hscrub ?? '-20'), ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function destroyPage() {
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

bindOnce();
document.addEventListener('astro:page-load', initPage);
document.addEventListener('astro:before-swap', destroyPage);
