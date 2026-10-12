
import React from 'react';
import { motion } from 'framer-motion';

const skillGroups = [
  {
    title: 'DIGITAL MARKETING',
    number: '01',
    skills: [
      'Social Media Marketing',
      'Content Strategy',
      'Digital Branding',
      'Audience Engagement',
      'Creative Campaign Ideas',
    ],
  },
  {
    title: 'AI & DIGITAL TOOLS',
    number: '02',
    skills: [
      'Artificial Intelligence',
      'AI-Powered Content Creation',
      'Prompt Writing',
      'Digital Content Creation',
      'Emerging Technologies',
    ],
  },
  {
    title: 'TRAVEL & TOURISM',
    number: '03',
    skills: [
      'Travel and Tourism',
      'Tourism Management',
      'Travel Industry Knowledge',
      'Travel Documentation Basics',
      'Customer Service',
    ],
  },
  {
    title: 'EDUCATION & PROFESSIONAL DEVELOPMENT',
    number: '04',
    skills: [
      'MBA in Tourism Management — Pursuing',
      'BA English Literature',
      'IATA Foundation Diploma in Travel and Tourism',
      'Communication',
      'Creative Thinking',
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 rounded-full bg-red-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-800/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
            What I Bring
          </p>

          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
            My <span className="text-red-600">Skills</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            I am developing my skills across digital marketing, artificial
            intelligence, and travel and tourism, combining creativity,
            communication, and industry knowledge.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.number}
              variants={itemVariants}
              className="group rounded-2xl border border-white/10 bg-zinc-950/80 p-6 transition-all duration-300 hover:border-red-600/60 hover:bg-zinc-900/90 md:p-8"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold tracking-wide text-white md:text-xl">
                  {group.title}
                </h3>

                <span className="text-3xl font-black text-red-600/70">
                  {group.number}
                </span>
              </div>

              <div className="mb-6 h-px w-full bg-white/10">
                <div className="h-px w-1/4 bg-red-600 transition-all duration-500 group-hover:w-full" />
              </div>

              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition-colors duration-300 hover:border-red-600/60 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 border-l-2 border-red-600 py-2 pl-5"
        >
          <p className="text-sm leading-7 text-gray-400 md:text-base">
            Always learning. Always exploring. Focused on connecting technology,
            creativity, and the travel industry.
          </p>
        </motion.div>
      </div>
    </section>
  );
}