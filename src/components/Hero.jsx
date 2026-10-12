
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'DIGITAL MARKETING // CREATIVE CONTENT',
    'ARTIFICIAL INTELLIGENCE // AI TOOLS',
    'TRAVEL & TOURISM // DESTINATION STORIES',
    'DIGITAL CREATION // BRAND COMMUNICATION',
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;

    if (!section || !card || !content) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    const header = section.querySelector('header');

    if (header) {
      tl.fromTo(
        header,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
    }

    tl.fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.1,
        stagger: 0.12,
      },
      '-=0.7'
    ).fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 1.4,
        ease: 'back.out(1.2)',
      },
      '-=0.9'
    );

    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: '50% 50%',
    });

    const xToDot = gsap.quickTo(cursorDotRef.current, 'x', {
      duration: 0.05,
      ease: 'power2.out',
    });
    const yToDot = gsap.quickTo(cursorDotRef.current, 'y', {
      duration: 0.05,
      ease: 'power2.out',
    });

    const xToRing = gsap.quickTo(cursorRingRef.current, 'x', {
      duration: 0.15,
      ease: 'power3.out',
    });
    const yToRing = gsap.quickTo(cursorRingRef.current, 'y', {
      duration: 0.15,
      ease: 'power3.out',
    });

    const xTilt = gsap.quickTo(card, 'rotationY', {
      duration: 0.4,
      ease: 'power3.out',
    });
    const yTilt = gsap.quickTo(card, 'rotationX', {
      duration: 0.4,
      ease: 'power3.out',
    });

    const glareX = glareRef.current
      ? gsap.quickTo(glareRef.current, 'x', {
          duration: 0.3,
          ease: 'power2.out',
        })
      : () => {};

    const glareY = glareRef.current
      ? gsap.quickTo(glareRef.current, 'y', {
          duration: 0.3,
          ease: 'power2.out',
        })
      : () => {};

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform =
          `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      xToDot(x - 6);
      yToDot(y - 6);
      xToRing(x - 24);
      yToRing(y - 24);

      const cardRect = card.getBoundingClientRect();
      const cardCenterX =
        cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY =
        cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX =
        -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY =
        ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      glareX(
        x - (cardRect.left - rect.left) - cardRect.width / 2
      );
      glareY(
        y - (cardRect.top - rect.top) - cardRect.height / 2
      );
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.inOut',
      });

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
        });
      }

      xTilt(0);
      yTilt(0);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }

        @media (max-width: 767px) {
          .hero-mobile-content {
            padding-top: 110px;
            padding-bottom: 32px;
          }

          .hero-mobile-grid {
            gap: 32px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>

      {/* Cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span
                key={idx}
                className="text-[14vw] font-black text-red-600 mx-8 uppercase tracking-tighter"
              >
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Spotlight effect */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(229,9,20,0.35) 0%, rgba(229,9,20,0.1) 40%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="hero-mobile-content relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-12"
      >
        {/* Top badge */}
        <div className="hero-anim-item flex flex-wrap items-center justify-between gap-4 w-full">
          <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-red-500 font-bold tracking-wider">
              MY PERSONAL PORTFOLIO
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">SEASONS 2024 - 2026</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2 py-1 border border-white/20 rounded bg-black/40">
              DIGITAL CREATOR
            </span>
            <span className="px-2 py-1 border border-white/20 rounded bg-black/40">
              TOURISM MANAGEMENT
            </span>
          </div>
        </div>

        {/* Main three-column layout */}
        <div className="hero-mobile-grid grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto py-10">
          {/* Left: Introduction */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left min-w-0">
            <div className="hero-anim-item flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)]">
                MBA STUDENT
              </span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
                Digital Marketing &amp; Travel Professional
              </span>
            </div>

            <h1 className="hero-anim-item text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.98] break-words drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              PRAVEENKUMAR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
                Digital Marketing &amp; Tourism Enthusiast
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-3 text-xs font-mono text-red-400 font-bold">
              <span className="text-white/40">•</span>
              <span>Digital Marketing</span>
              <span className="text-white/40">•</span>
              <span>Artificial Intelligence</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Travel &amp; Tourism</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md">
              I am Praveenkumar, passionate about digital marketing, artificial
              intelligence, and the travel industry. I am pursuing an MBA in
              Tourism Management and building my skills to create meaningful
              digital experiences.
            </p>

            {/* Action buttons */}
            <div className="hero-anim-item flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 pt-2 w-full">
              <a
                href="#projects"
                className="px-6 md:px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>

              <a
                href="#contact"
                className="px-6 md:px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* Center: Portrait card */}
          <div className="lg:col-span-4 flex justify-center min-w-0 perspective-[1200px]">
            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform w-full max-w-[320px]"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000" />

              <div className="relative w-full p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                <div
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                />

                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  ABOUT ME
                </div>

                <img
                  src={pictureImg}
                  alt="Portrait of Praveenkumar"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Education */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right min-w-0">
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-2">
                Education &amp; Certifications
              </h3>

              <p className="text-xs text-white/80 leading-relaxed font-light">
                BA English Literature | MBA in Tourism Management (Current
                Student) | IATA Foundation Diploma in Travel and Tourism.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="hero-anim-item flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/50 tracking-widest uppercase">
          <span>CREATIVE IDEAS. DIGITAL FUTURE.</span>
          <span>[ PORTFOLIO RELEASE v2.6 ]</span>
        </div>
      </div>

      {/* Custom cursor elements: desktop only */}
      <div
        ref={cursorDotRef}
        className="hidden md:block absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914]"
      />

      <div
        ref={cursorRingRef}
        className="hidden md:flex absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-red-600/60 rounded-full items-center justify-center backdrop-blur-[1px]"
      />

      {/* Navigation bar */}
      <header className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <a
          href="#home"
          className="text-xl md:text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)]"
        >
          PRAVEENKUMAR
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
          <a href="#about" className="hover:text-red-500 transition-colors">About</a>
          <a href="#expertise" className="hover:text-red-500 transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
        </nav>

        <a
          href="#contact"
          className="px-3 md:px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)]"
        >
          Explore My World
        </a>
      </header>
    </section>
  );
};

export default Hero;