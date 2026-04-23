import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/hero.mp4";

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

    // Tailwind utility classes for static styles
    el.className = "absolute bottom-0 rounded-full pointer-events-none will-change-transform";

    // Dynamic styles
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

    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(ellipse 40% 35% at ${cx}% ${cy}%, rgba(143,255,58,0.06) 0%, transparent 75%)`;
    }

    if (glowRef.current) {
      const dx = lerped.x - 0.5;
      const dy = lerped.y - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const intensity = dist * 0.8;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      glowRef.current.style.background = `linear-gradient(${angle}deg, rgba(143,255,58,${intensity * 0.15}) 0%, transparent 60%)`;
    }

    if (videoRef.current) {
      const tx = (lerped.x - 0.5) * 18;
      const ty = (lerped.y - 0.5) * 10;
      videoRef.current.style.transform = `scale(1.12) translate(${-tx * 0.4}px, ${-ty * 0.3}px)`;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const particles = createParticles(particleBox.current);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(videoRef.current, { scale: 1.12, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 1.2, ease: "power2.out" })
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 }, "-=1.0")
        .fromTo(badgeRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.8")
        .fromTo(h1Ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.5")
        .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.7")
        .fromTo(ctaRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.6")
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.3");

      gsap.to(videoRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
      });
    }, hero);

    rafRef.current = requestAnimationFrame(tick);
    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

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
      className="relative w-full h-[100svh] overflow-hidden bg-[#0a0b09] cursor-crosshair group"
    >
      {/* ── Video Background ────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0 will-change-transform pointer-events-none"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* ── Gradient Overlay ────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[5] bg-gradient-to-b from-[#0a0b09]/60 via-transparent to-[#0a0b09]"
      />

      {/* ── Spotlight & Glow (Controlled by RAF) ───────────── */}
      <div ref={spotRef} className="absolute inset-0 pointer-events-none z-[6]" />
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-[7]" />

      {/* ── Particles ───────────────────────────────────────── */}
      <div ref={particleBox} className="absolute inset-0 pointer-events-none z-[8]" />

      {/* ── Scanlines ───────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#8fff3a]/40 to-transparent z-10" />
      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#8fff3a]/20 to-transparent z-10 animate-[scanline_8s_linear_infinite] pointer-events-none" />

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="container relative z-20 h-full flex flex-col justify-center items-center text-center">

        <div ref={badgeRef} className="mb-8">
          <span className="tag">lorem ipsum dolor sit amet</span>
        </div>

        <h1 ref={h1Ref} className="heading-display mb-6 max-w-[15ch]">
          Lorem ipsum <span className="text-[#8fff3a] glow-text"> dolor sit </span> amet
        </h1>

        <p ref={subRef} className="body-copy max-w-[45ch] mb-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-5">
          <a href="#about" className="btn-green">
            Lorem ipsum <span className="ml-2 inline-block animate-bounce">↓</span>
          </a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="btn-outline">
            Lorem ipsum
          </a>
        </div>
      </div>

      {/* ── Scroll Indicator ────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 right-6 md:right-12 z-30 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-500 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#8fff3a] to-transparent animate-pulse" />
      </div>

      {/* ── Custom Scanline Keyframe ────────────────────────── */}
      <style>{`
        @keyframes scanline {
          0% { top: -5%; opacity: 0; }
          15% { opacity: 0.5; }
          85% { opacity: 0.5; }
          100% { top: 105%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}