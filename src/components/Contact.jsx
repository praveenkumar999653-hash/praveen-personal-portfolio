
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '20%']);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.permission) {
      alert('Please accept the contact permission checkbox.');
      return;
    }

    alert(
      `Thank you ${formData.firstName}! Your message has been noted.`
    );

    console.log('Portfolio contact form:', formData);

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      permission: false,
    });
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex min-h-screen w-full select-none items-end overflow-hidden border-t border-white/10 bg-[#0b0b0b] pt-32 pb-0"
    >
      {/* Cinematic red background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[160px]" />

      {/* Background text */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute top-0 left-0 z-0 flex h-full w-full flex-col items-center justify-start overflow-hidden pt-16 opacity-10 md:pt-12"
      >
        <h1
          className="origin-top scale-y-[1.6] select-none text-[25vw] leading-[0.75] font-black tracking-tighter text-red-600 uppercase"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      {/* Contact card */}
      <div className="relative z-10 flex w-full items-end justify-end">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex w-full flex-col justify-between overflow-hidden rounded-tl-[3rem] border-t border-l border-white/15 bg-[#141414]/95 p-8 text-white shadow-[0_-25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl md:w-[90%] md:p-16 lg:w-[82%]"
        >
          <div className="absolute top-0 left-1/2 h-1 w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90" />

          <div className="mb-12 flex items-center justify-between md:mb-16">
            <div className="inline-flex items-center gap-2 rounded border border-red-600/30 bg-red-600/10 px-3.5 py-1.5 font-mono text-xs tracking-widest text-red-500 uppercase">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-red-600" />
              <span>PRAVEENKUMAR // GET IN TOUCH</span>
            </div>

            <span className="hidden text-xs tracking-wider text-white/40 font-mono md:block">
              // DIGITAL MARKETING • TRAVEL • AI
            </span>
          </div>

          <div className="mb-10">
            <h2 className="mb-3 text-3xl font-black tracking-tight md:text-5xl">
              LET'S CONNECT
              <span className="text-red-600">.</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
              Thank you for visiting my personal portfolio. I welcome
              meaningful professional connections and new opportunities
              in digital marketing and the travel industry.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-12 md:gap-16"
          >
            <div className="flex w-full flex-col gap-12 md:flex-row md:gap-20">
              <div className="flex flex-1 flex-col gap-10">
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  aria-label="First Name"
                  required
                  className="w-full rounded-none border-b border-white/20 bg-transparent pb-3 text-lg font-medium text-white transition-colors placeholder-white/40 focus:border-red-600 focus:outline-none"
                />

                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  aria-label="Last Name"
                  required
                  className="w-full rounded-none border-b border-white/20 bg-transparent pb-3 text-lg font-medium text-white transition-colors placeholder-white/40 focus:border-red-600 focus:outline-none"
                />

                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  required
                  className="w-full rounded-none border-b border-white/20 bg-transparent pb-3 text-lg font-medium text-white transition-colors placeholder-white/40 focus:border-red-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  aria-label="Your Message"
                  required
                  className="h-full min-h-[140px] w-full resize-none rounded-none border-b border-white/20 bg-transparent pb-3 text-lg font-medium text-white transition-colors placeholder-white/40 focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-12 border-t border-white/10 pt-6 md:flex-row">
              <div className="flex flex-1 items-start gap-4 text-sm font-light text-white/70">
                <input
                  type="checkbox"
                  id="permission"
                  checked={formData.permission}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 cursor-pointer rounded-sm border-white/30 bg-transparent"
                  style={{ accentColor: '#E50914' }}
                />
                <label
                  htmlFor="permission"
                  className="max-w-[280px] cursor-pointer leading-snug"
                >
                  I give permission to contact me at the email address
                  provided above.
                </label>
              </div>

              <div className="flex flex-1 flex-col gap-8 text-xs font-light text-white/50">
                <p className="max-w-[400px] leading-relaxed">
                  Your details are used to respond to your message and
                  discuss relevant professional opportunities.
                </p>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-[250px] leading-relaxed">
                    Have a question or an opportunity? I would be happy
                    to hear from you.
                  </p>

                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-3 rounded bg-red-600 px-8 py-3.5 text-xs font-bold tracking-widest text-white uppercase whitespace-nowrap shadow-[0_0_20px_rgba(229,9,20,0.6)] transition-all duration-300 hover:scale-105 hover:bg-red-700"
                  >
                    Send Message
                    <svg
                      className="h-4 w-4 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="mt-12 border-t border-white/10 pt-5 text-xs text-white/40">
            <a
              href="mailto:praveenkumar999653@gmail.com"
              className="transition-colors hover:text-red-500"
            >
              praveenkumar999653@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;