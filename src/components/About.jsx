
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Cinematic stagger entrance on scroll
    const cards = cardRefs.current.filter(Boolean);

    const animation = gsap.fromTo(
      cards,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Interactive mouse spotlight per bento card
    const handleMouseMove = (event, card) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    const cleanupListeners = cards.map((card) => {
      const listener = (event) => handleMouseMove(event, card);

      card.addEventListener('mousemove', listener);

      return () => {
        card.removeEventListener('mousemove', listener);
      };
    });

    return () => {
      cleanupListeners.forEach((cleanup) => cleanup());
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  const addToRefs = (element) => {
    if (element && !cardRefs.current.includes(element)) {
      cardRefs.current.push(element);
    }
  };

  const technologies = [
    'Artificial Intelligence',
    'Digital Marketing',
    'Travel & Tourism',
    'Content Strategy',
    'Social Media',
    'AI Tools',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen w-full select-none flex-col justify-center overflow-hidden bg-[#050505] px-6 py-32 text-white md:px-12"
    >
      {/* Background cinematic red ambient glows */}
      <div className="pointer-events-none absolute left-10 top-1/4 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[160px]" />

      <div className="pointer-events-none absolute bottom-10 right-10 h-[500px] w-[500px] rounded-full bg-red-900/10 blur-[160px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl space-y-16">

        {/* Section header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 rounded border border-red-600/40 bg-black/80 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white shadow-2xl backdrop-blur-2xl">
            <span className="h-2 w-2 animate-ping rounded-full bg-red-600" />
            <span className="font-bold text-red-500">
              EPISODE 01
            </span>
            <span className="text-white/40">|</span>
            <span>ABOUT ME</span>
          </div>

          <h2 className="text-4xl font-black tracking-tighter text-white md:text-6xl">
            MY JOURNEY
            <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-600 to-red-700 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              VISION & AMBITION.
            </span>
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
            Exploring the intersection of Artificial Intelligence,
            Digital Marketing, and the Travel & Tourism industry.
          </p>
        </div>

        {/* Responsive bento grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">

          {/* Card 1: Personal profile and education */}
          <div
            ref={addToRefs}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141414]/90 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-red-600/60 md:col-span-7 md:p-12"
          >
            {/* Mouse spotlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />

            <div className="pointer-events-none absolute right-8 top-0 p-8 font-mono text-7xl font-black text-white/5">
              01
            </div>

            <div className="relative z-10 space-y-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red-500">
                Profile & Background
              </h3>

              <p className="text-lg font-medium leading-relaxed text-white/90 md:text-xl">
                Hi, I am{' '}
                <span className="font-bold text-white drop-shadow">
                  Praveenkumar
                </span>
                , with an academic background in English Literature
                and a growing focus on Tourism Management,
                Artificial Intelligence, and Digital Marketing.
              </p>

              <p className="text-sm font-light leading-relaxed text-white/60 md:text-base">
                My interests bring together communication,
                creative content, AI-powered tools, and digital
                engagement to explore opportunities in the travel
                and tourism industry. I aim to build meaningful
                digital experiences and help travel brands connect
                with their audiences.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 pt-8">
              {[
                'BA English Literature',
                'MBA Tourism Management',
                'Digital Marketing',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Education and certifications */}
          <div
            ref={addToRefs}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141414]/90 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-red-600/60 md:col-span-5 md:p-12"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />

            <div className="pointer-events-none absolute right-8 top-0 p-8 font-mono text-7xl font-black text-white/5">
              02
            </div>

            <div className="relative z-10 space-y-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red-500">
                Education & Certifications
              </h3>

              <ul className="space-y-5 text-sm font-light text-white/80">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-500">
                    &#8250;
                  </span>
                  <span>
                    <strong className="text-white">
                      IATA Foundation Diploma in Travel and Tourism
                    </strong>
                    <span className="mt-1 block text-white/50">
                      Foundation in travel and tourism knowledge.
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-500">
                    &#8250;
                  </span>
                  <span>
                    <strong className="text-white">
                      MBA in Tourism Management
                    </strong>
                    <span className="mt-1 block text-white/50">
                      Current student.
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-500">
                    &#8250;
                  </span>
                  <span>
                    <strong className="text-white">
                      BA English Literature
                    </strong>
                    <span className="mt-1 block text-white/50">
                      Academic background in language and communication.
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-8 font-mono text-xs text-white/40">
              // LEARNING • GROWTH • OPPORTUNITY
            </div>
          </div>

          {/* Card 3: Career goals and technical interests */}
          <div
            ref={addToRefs}
            className="group relative flex flex-col gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141414]/90 p-8 shadow-2xl transition-all duration-500 hover:border-red-600/60 md:col-span-12 md:flex-row md:items-center md:justify-between md:p-12"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />

            <div className="relative z-10 max-w-xl space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red-500">
                Career Focus & Skill Set
              </h3>

              <p className="text-lg font-semibold text-white md:text-xl">
                Connecting technology, creativity, and travel.
              </p>

              <p className="text-sm font-light leading-relaxed text-white/60">
                Focused on developing knowledge in AI, digital
                marketing, online audience engagement, and travel
                industry services to support future career growth.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3 md:max-w-xl md:justify-end">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white shadow-inner transition-all hover:scale-105 hover:border-red-600/40 hover:bg-red-600/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: Contact */}
          <div
            ref={addToRefs}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#141414]/90 p-8 shadow-2xl transition-all duration-500 hover:border-red-600/60 md:col-span-12 md:p-10"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />

            <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red-500">
                  Let's Connect
                </h3>

                <p className="text-xl font-bold text-white md:text-2xl">
                  Passionate about the travel industry and new learning and networking opportunities. Let's connect!
                </p>

                <p className="text-sm text-white/50">
                  Interested in digital marketing and the travel industry.
                </p>
              </div>

              <a
                href="mailto:praveenkumar999653@gmail.com"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-600/50 bg-red-600/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-red-600/25"
              >
                Contact Me
                <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>PRAVEENKUMAR — PERSONAL PORTFOLIO</span>
          <span>LEARN. CREATE. EXPLORE.</span>
        </div>

      </div>
    </section>
  );
};

export default About;