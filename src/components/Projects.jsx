
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Praveenkumar's portfolio project concepts
const projectsData = [
  {
    title: 'Social Media Campaign',
    category: 'Digital Marketing',
    description:
      'A campaign concept focused on engaging social media content, consistent brand messaging, and audience awareness.',
    tags: ['Social Media', 'Content Strategy', 'Branding'],
    match: '99%',
    episode: 'S01 E01',
  },
  {
    title: 'AI Content Studio',
    category: 'Artificial Intelligence',
    description:
      'Exploring AI tools and prompt writing to support content creation, creative brainstorming, and digital productivity.',
    tags: ['AI Tools', 'Prompt Writing', 'Content Creation'],
    match: '98%',
    episode: 'S01 E02',
  },
  {
    title: 'Travel Destination Guide',
    category: 'Travel & Tourism',
    description:
      'A tourism content concept presenting destination highlights and useful travel information in an engaging format.',
    tags: ['Tourism', 'Destinations', 'Travel Content'],
    match: '97%',
    episode: 'S01 E03',
  },
  {
    title: 'Digital Brand Identity',
    category: 'Creative Communication',
    description:
      'A concept for building a consistent digital identity through visual communication, brand messaging, and creative content.',
    tags: ['Digital Branding', 'Visual Content', 'Communication'],
    match: '99%',
    episode: 'S01 E04',
  },
  {
    title: 'Tourism Promotion Campaign',
    category: 'Tourism Marketing',
    description:
      'A promotional campaign concept designed to highlight travel experiences and communicate the appeal of destinations.',
    tags: ['Tourism Marketing', 'Campaign Ideas', 'Storytelling'],
    match: '96%',
    episode: 'S01 E05',
  },
  {
    title: 'AI-Powered Digital Ideas',
    category: 'AI & Innovation',
    description:
      'Exploring how artificial intelligence can support creative planning, idea development, and everyday digital workflows.',
    tags: ['Artificial Intelligence', 'Innovation', 'Digital Tools'],
    match: '98%',
    episode: 'S01 E06',
  },
  {
    title: 'Personal Portfolio',
    category: 'Personal Branding',
    description:
      'A cinematic personal portfolio showcasing my interests in digital marketing, artificial intelligence, and travel and tourism.',
    tags: ['React', 'Portfolio Design', 'Animation'],
    match: '100%',
    episode: 'S01 E07',
  },
  {
    title: 'Travel Content Series',
    category: 'Digital Storytelling',
    description:
      'A content series concept combining destination information, storytelling, and digital media to inspire travel interest.',
    tags: ['Travel Content', 'Storytelling', 'Digital Media'],
    match: '98%',
    episode: 'S01 E08',
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(folderFrontRef.current, {
        transformOrigin: 'bottom center',
      });

      const getGridPos = (index) => {
        let row;
        let col;

        if (index < 3) {
          row = 0;
          col = index;
        } else if (index === 3) {
          row = 1;
          col = 0;
        } else if (index === 4) {
          row = 1;
          col = 2;
        } else {
          row = 2;
          col = index - 5;
        }

        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions;

          if (isDesktop) {
            let floatTween;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 50%',
                end: 'bottom 50%',
                toggleActions: 'play reverse play reverse',
                onEnter: () => {
                  if (floatTween) floatTween.kill();
                },
                onEnterBack: () => {
                  if (floatTween) floatTween.kill();
                },
                onLeave: () => {
                  if (floatTween) floatTween.kill();
                },
                onLeaveBack: () => {
                  if (floatTween) floatTween.kill();
                },
              },
              onComplete: () => {
                floatTween = gsap.to(cardsRef.current.filter(Boolean), {
                  y: '+=12',
                  rotation: '+=1',
                  duration: 3.5,
                  yoyo: true,
                  repeat: -1,
                  ease: 'sine.inOut',
                  stagger: { amount: 1.5, from: 'random' },
                });
              },
            });

            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 1.2,
              ease: 'power3.inOut',
            });

            tl.to(
              cardsRef.current.filter(Boolean),
              {
                y: -140,
                scale: 0.9,
                zIndex: 70,
                duration: 0.6,
                stagger: 0.04,
                ease: 'back.out(1.2)',
              },
              '-=0.6'
            );

            tl.to(
              cardsRef.current.filter(Boolean),
              {
                x: (i) => {
                  const cards = cardsRef.current.filter(Boolean);
                  const w =
                    Math.max(...cards.map((card) => card.offsetWidth || 0)) ||
                    360;
                  const gap = 40;
                  const { col } = getGridPos(i);

                  return (col - 1) * (w + gap);
                },
                y: (i) => {
                  const cards = cardsRef.current.filter(Boolean);
                  const h =
                    Math.max(...cards.map((card) => card.offsetHeight || 0)) ||
                    240;
                  const gap = 40;
                  const { row } = getGridPos(i);

                  return (row - 1) * (h + gap);
                },
                rotation: () => gsap.utils.random(-3, 3),
                scale: 1,
                duration: 1.4,
                stagger: { amount: 0.4, from: 'center' },
                ease: 'expo.out',
              },
              '-=0.2'
            );
          }

          if (isMobile) {
            const cardW = window.innerWidth * 0.78;
            const gap = 24;

            mobileCardsRef.current.forEach((card, i) => {
              if (!card) return;

              gsap.set(card, {
                x: -(i * (cardW + gap)),
                y: 0,
                scale: 0.4,
                opacity: 0,
                rotation: gsap.utils.random(-15, 15),
              });
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 60%',
              },
            });

            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 0.8,
              ease: 'power3.inOut',
            });

            tl.to(
              mobileCardsRef.current.filter(Boolean),
              {
                y: -100,
                opacity: 1,
                scale: 0.85,
                duration: 0.6,
                stagger: 0.05,
                ease: 'back.out(1.2)',
              },
              '-=0.4'
            );

            tl.to(
              mobileCardsRef.current.filter(Boolean),
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: 'expo.out',
                onComplete: () => {
                  if (mobileCarouselRef.current) {
                    mobileCarouselRef.current.style.overflowX = 'auto';
                    mobileCarouselRef.current.style.pointerEvents = 'auto';
                  }
                },
              },
              '-=0.2'
            );
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full select-none items-center justify-center overflow-x-clip bg-[#0b0b0b] py-24 font-sans text-white md:min-h-[170vh] md:py-40"
    >
      <div className="pointer-events-none absolute left-0 top-10 z-0 flex w-full items-start justify-center">
        <h1 className="whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tighter text-white/[0.03] sm:text-[17vw] md:text-[20vw]">
          ORIGINALS
        </h1>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[160px]" />

      <div className="perspective-[2000px] relative z-10 mt-12 flex h-full w-full max-w-7xl items-center justify-center">
        <div className="transform-style-3d relative h-0 w-0">
          <div
            ref={folderBackRef}
            className="absolute flex aspect-video w-[85vw] max-w-[380px] items-center justify-center rounded-[24px] border border-red-600/40 bg-[#141414] shadow-[0_20px_50px_rgba(229,9,20,0.25)] md:w-[32vw]"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 h-8 w-32 rounded-t-xl border-t border-red-600/30 bg-[#1f1f1f]" />

            <div className="relative z-10 font-mono text-2xl font-black uppercase tracking-widest text-red-600 opacity-60">
              MY_PORTFOLIO
            </div>
          </div>

          {projectsData.map((project, i) => (
            <div
              key={project.episode}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute hidden aspect-[16/10] w-[80vw] max-w-[380px] will-change-transform md:block md:w-[33vw]"
              style={{ zIndex: 10 + i }}
            >
              <div className="group relative z-10 flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-[24px] border border-white/15 bg-[#141414]/95 p-7 shadow-[0_25px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="rounded border border-red-600/20 bg-red-600/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-red-500">
                    {project.episode}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-400">
                      {project.match} Match
                    </span>
                    <span className="border border-white/30 px-1 font-mono text-[10px] text-white/70">
                      HD
                    </span>
                  </div>
                </div>

                <div className="my-auto space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-red-500">
                    {project.title}
                  </h3>

                  <p className="line-clamp-2 text-xs font-light leading-relaxed text-white/70">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/70 transition-colors group-hover:border-red-600/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-red-600 transition-all group-hover:shadow-[0_0_15px_#E50914]" />
              </div>
            </div>
          ))}

          <div
            ref={folderFrontRef}
            className="pointer-events-none absolute aspect-video w-[85vw] max-w-[380px] will-change-transform md:w-[32vw]"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 flex h-[85%] w-full flex-col justify-end rounded-t-md rounded-b-[24px] border-t border-red-600/40 bg-[#1c1c1c] p-6 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
              <div className="mx-auto mb-2 h-1.5 w-20 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={mobileCarouselRef}
        className="hide-scrollbar pointer-events-none absolute left-1/2 top-1/2 z-[100] flex h-auto w-screen -translate-x-1/2 -translate-y-1/2 snap-x snap-mandatory items-center gap-6 overflow-x-hidden px-[11vw] py-12 md:hidden"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {projectsData.map((project, i) => (
          <div
            key={`mobile-${project.episode}`}
            ref={(el) => {
              mobileCardsRef.current[i] = el;
            }}
            className="relative z-10 aspect-[16/11] w-[78vw] shrink-0 snap-center will-change-transform"
          >
            <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[24px] border border-white/15 bg-[#141414] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between">
                <span className="rounded bg-red-600/10 px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-red-500">
                  {project.episode}
                </span>

                <span className="font-mono text-xs font-bold text-red-400">
                  {project.match} Match
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">
                  {project.title}
                </h3>

                <p className="line-clamp-2 text-xs font-light text-white/70">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 border-t border-white/10 pt-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;