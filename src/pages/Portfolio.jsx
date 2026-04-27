import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioSection from "../components/PortfolioSection";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-24 md:pt-32 bg-[var(--bg)] min-h-screen">
      {/* Page hero */}
      <section
        ref={heroRef}
        className="container mx-auto px-4 sm:px-8 py-16 md:py-24 flex flex-col items-center text-center relative"
      >
        {/* Subtle blue glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-blue-200 opacity-[0.03] blur-[160px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-black md:text-sm font-bold tracking-[0.25em] uppercase mb-6">
            lorem ipsum dolor sit amet
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.03em] text-shadow-2xs max-w-5xl leading-[1.05] mb-8">
            Lorem ipsum dolor sit amet <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">
              lorem ipsum dolor sit amet.
            </span>
          </h1>

          <p className="text-base md:text-lg max-w-2xl leading-relaxed font-medium text-blue-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
          </p>
        </div>
      </section>

      {/* Portfolio Component */}
      <PortfolioSection />

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[var(--bg)] text-center relative overflow-hidden border-t border-[var(--dimmer)]">
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[var(--accent)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
            Lorem ipsum dolor sit amet
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] text-black mb-10 max-w-3xl mx-auto leading-tight">
            Lorem ipsum dolor sit amet{" "}
            <span className="text-[var(--accent)]">
              Lorem ipsum dolor sit amet.
            </span>
          </h2>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-black text-white font-bold text-xs md:text-sm tracking-[0.05em] uppercase hover:bg-[var(--accent)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            Lorem ipsum <span className="text-base leading-none">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
