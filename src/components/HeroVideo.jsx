import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Particle config ─────────────────────────────────────────── */
const PARTICLE_COUNT = 28;

function createParticles(container) {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const el = document.createElement("div");
    const size = Math.random() * 3 + 1;
    const delay = Math.random() * 8;
    const duration = Math.random() * 12 + 8;
    const x = Math.random() * 100;
    const startY = 100 + Math.random() * 20;

    // Static styles moved to Tailwind classes
    el.className = "absolute bottom-0 rounded-full pointer-events-none will-change-[transform,opacity]";

    // Dynamic styles kept as inline
    Object.assign(el.style, {
      width: `${size}px`,
      height: `${size}px`,
      background: `rgba(143,255,58,${Math.random() * 0.35 + 0.08})`,
      left: `${x}%`,
      filter: size > 2.5 ? "blur(0.5px)" : "none",
    });

    container.appendChild(el);

    gsap.fromTo(
      el,
      { y: 0, opacity: 0, x: 0 },
      {
        y: `-${startY}vh`,
        opacity: 0,
        x: (Math.random() - 0.5) * 80,
        duration,
        delay,
        ease: "power1.inOut",
        repeat: -1,
        repeatDelay: Math.random() * 4,
        onRepeat() {
          gsap.set(el, { opacity: 0 });
        },
        onStart() {
          gsap.to(el, {
            opacity: Math.random() * 0.55 + 0.08,
            duration: duration * 0.25,
            ease: "power1.out",
          });
          gsap.to(el, {
            opacity: 0,
            duration: duration * 0.25,
            delay: duration * 0.75,
            ease: "power1.in",
          });
        },
      }
    );

    particles.push(el);
  }
  return particles;
}

export default function HeroVideo() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const labelRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const badgeRef = useRef(null);

  /* cursor-driven refs */
  const spotRef = useRef(null);
  const glowRef = useRef(null);
  const particleBox = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);
  const lerpPos = useRef({ x: 0.5, y: 0.5 });

  /* ── Mouse tracking ───────────────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePos.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: 0.5, y: 0.5 };
  }, []);

  /* ── RAF loop for smooth lerp ─────────────────────────────── */
  const tick = useCallback(() => {
    const target = mousePos.current;
    const lerped = lerpPos.current;
    const speed = 0.05;

    lerped.x += (target.x - lerped.x) * speed;
    lerped.y += (target.y - lerped.y) * speed;

    const cx = lerped.x * 100;
    const cy = lerped.y * 100;

    /* spotlight */
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(ellipse 40% 35% at ${cx}% ${cy}%, rgba(143,255,58,0.055) 0%, transparent 75%)`;
    }

    /* edge glow intensity based on distance from center */
    if (glowRef.current) {
      const dx = lerped.x - 0.5;
      const dy = lerped.y - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const intensity = dist * 0.8;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      glowRef.current.style.background = `linear-gradient(${angle}deg, rgba(143,255,58,${intensity * 0.18}) 0%, transparent 60%)`;
    }

    /* subtle video tilt */
    if (videoRef.current) {
      const tx = (lerped.x - 0.5) * 18;
      const ty = (lerped.y - 0.5) * 10;
      videoRef.current.style.transform = `scale(1.12) translate(${-tx * 0.4}px, ${-ty * 0.3}px)`;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /* ── GSAP entrance + scroll ───────────────────────────────── */
  useEffect(() => {
    const hero = heroRef.current;
    const particles = createParticles(particleBox.current);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        videoRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1.12, opacity: 1, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=1.5"
        )
        .fromTo(
          badgeRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          h1Ref.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          subRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.2"
        );

      /* scroll parallax — video */
      gsap.to(videoRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* scroll parallax — content */
      gsap.to(
        [h1Ref.current, subRef.current, ctaRef.current, badgeRef.current],
        {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "50% top",
            scrub: 1,
          },
        }
      );
    }, heroRef);

    rafRef.current = requestAnimationFrame(tick);
    hero.addEventListener("mousemove", handleMouseMove, { passive: true });
    hero.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafRef.current);
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      particles.forEach((p) => p.remove());
    };
  }, [tick, handleMouseMove, handleMouseLeave]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-[100svh] overflow-hidden cursor-crosshair group"
    >
      {/* ── Video ─────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0 will-change-transform transition-transform duration-100 ease-linear"
      >
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Base overlay ──────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-0 bg-[linear-gradient(180deg,rgba(14,15,13,0.55)_0%,rgba(14,15,13,0.18)_40%,rgba(14,15,13,0.80)_100%)]"
      />

      {/* ── Cursor spotlight ──────────────────────────────────── */}
      <div
        ref={spotRef}
        className="absolute inset-0 pointer-events-none z-10 transition-colors duration-75"
      />

      {/* ── Edge directional glow ─────────────────────────────── */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-[11] transition-colors duration-150"
      />

      {/* ── Particles ─────────────────────────────────────────── */}
      <div
        ref={particleBox}
        className="absolute inset-0 pointer-events-none z-[12] overflow-hidden"
      />

      {/* ── Scan line top ─────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-[1px] opacity-50 z-[15] bg-[linear-gradient(90deg,transparent_0%,var(--green)_50%,transparent_100%)]" />

      {/* ── Animated horizontal scan line ─────────────────────── */}
      <div className="absolute inset-x-0 h-[1px] z-[15] pointer-events-none bg-[linear-gradient(90deg,transparent_0%,rgba(143,255,58,0.3)_50%,transparent_100%)] animate-[scanline_6s_ease-in-out_infinite]" />

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="container mx-auto relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        
        {/* Badge */}
        <div ref={badgeRef} className="mb-10">
          <span className="tag">Creative Agency — Est. 2020</span>
        </div>

        {/* H1 */}
        <h1
          ref={h1Ref}
          className="heading-display max-w-[14ch] mb-5"
        >
          We Capture <span className="text-[var(--green)]">Moments</span> That Matter
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="body-copy max-w-[42ch] mb-12 text-[#f0f0eb]/65"
        >
          Premium photography &amp; videography for brands, events, and
          campaigns — crafted with purpose.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="flex justify-center gap-4 flex-wrap"
        >
          <a href="#about" className="btn-green cursor-pointer" id="hero-cta-primary">
            Explore Work <span>↓</span>
          </a>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="btn-outline cursor-pointer"
            id="hero-cta-wa"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* ── Scroll hint ───────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-[var(--muted)] [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-[1px] h-[48px] bg-gradient-to-b from-[var(--green-dim)] to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
      </div>

      {/* ── Custom Keyframes ──────────────────────────────────── */}
      <style>{`
        @keyframes scanline {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%      { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}