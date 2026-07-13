import { memo } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeading from './SectionHeading'

const annaUniversityLogo = new URL('../../Anna_University.jpeg', import.meta.url).href
const mitLogo = new URL('../../Madras_Institute_Technology.jpeg', import.meta.url).href

const storyParagraphs = [
  'My interest in computers began with a simple question: what is happening beneath the screen when a program runs? That curiosity slowly turned into a habit of paying attention to how systems behave, how logic is organized, and why some software feels reliable while other software does not.',
  'As I kept learning, problem solving became the part I enjoyed most. Computer Science gave that interest a direction, and Java eventually became the language that helped me think more clearly about structure, responsibility, and backend development. Over time, I found myself drawn to the parts of software that quietly hold everything together.',
  'That curiosity naturally led me into networking and operating systems, where I could finally start understanding the layers behind applications instead of only the surface. AI has become another area I want to understand better, not as a trend to follow, but as a field that is already changing how software is built and used.',
  'Outside coding, I still like making things with my hands and mind. Drawing gives me a creative outlet, and Silambam gives me discipline and focus. Together, they shape the way I approach learning, practice, and the work of building real software rather than just writing code.',
  'My journey continues at Madras Institute of Technology, MIT Campus, Chennai, one of the constituent campuses of Anna University, where I am pursuing my Bachelor of Engineering in Computer Science and Engineering. Being in an environment with a strong engineering culture has helped me stay grounded while deepening my interest in backend systems, software design, and the fundamentals that make technology work well.',
]

function About() {
  return (
    <section id="about" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="The Story" title="How curiosity became a craft" />

      <div className="mt-16 grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
        <div className="flex flex-col items-center lg:items-start">
          {/* Hand-drawn-style illustration accent */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square w-full max-w-sm"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
            <svg viewBox="0 0 300 300" className="relative w-full h-full">
              <circle cx="150" cy="150" r="120" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.5" />
              <path
                d="M90 190 C 110 120, 140 100, 150 150 C 160 200, 190 180, 210 110"
                fill="none"
                stroke="#A855F7"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="font-artistic"
              />
              <text x="150" y="150" textAnchor="middle" className="font-artistic" fontSize="26" fill="#FACC15">
                code + canvas
              </text>
              <circle cx="90" cy="190" r="4" fill="#38BDF8" />
              <circle cx="210" cy="110" r="4" fill="#38BDF8" />
            </svg>
          </motion.div>

          <div className="mt-10 flex w-full max-w-sm flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
              className="font-display text-sm tracking-[0.28em] uppercase text-primary"
            >
              Academic Identity
            </motion.p>

            <div className="mt-6 flex flex-col items-center gap-7">
              {[
                { src: annaUniversityLogo, alt: 'Anna University logo', label: 'Anna University', delay: 0.28 },
                { src: mitLogo, alt: 'Madras Institute of Technology logo', label: 'Madras Institute of Technology', delay: 0.48 },
              ].map((logo) => (
                <motion.div
                  key={logo.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: logo.delay, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 24px 60px rgba(15, 23, 42, 0.24), 0 0 28px rgba(56, 189, 248, 0.24)' }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex h-[150px] w-[150px] items-center justify-center rounded-[22px] border border-[rgba(56,189,248,0.15)] bg-white p-[18px] shadow-[0_20px_50px_rgba(15,23,42,0.18)] sm:h-[160px] sm:w-[160px] md:h-[140px] md:w-[140px] lg:h-[160px] lg:w-[160px]"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-[118px] w-[118px] object-contain md:h-[106px] md:w-[106px] lg:h-[130px] lg:w-[130px]"
                    />
                  </motion.div>
                  <p className="text-center text-sm font-medium text-primary">{logo.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Story and education */}
        <div className="space-y-8">
          <div className="space-y-5">
            {storyParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="text-slate-400 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-3xl p-7 sm:p-8 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <GraduationCap size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-display text-sm tracking-[0.28em] uppercase text-primary mb-3">Education</p>

                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">Bachelor of Engineering (B.E.)</p>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-slate-50">Computer Science &amp; Engineering</p>
                </div>

                <div className="mt-5 space-y-1">
                  <p className="text-slate-400 text-sm">Anna University</p>
                  <p className="font-display text-lg sm:text-xl font-semibold text-slate-50">Madras Institute of Technology</p>
                  <p className="text-sm text-primary font-medium">MIT Campus, Chennai, Tamil Nadu</p>
                </div>

                <p className="mt-5 text-slate-400 leading-relaxed max-w-2xl">
                  Building a strong foundation in software engineering, algorithms, operating systems, networking,
                  databases, and backend technologies.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default memo(About)
