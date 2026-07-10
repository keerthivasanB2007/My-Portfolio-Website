import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

// Placeholder gallery items — replace the gradient tiles with real
// sketches / digital art once available (e.g. import images and swap
// the `accent` div for an <img>).
const GALLERY = [
  { label: 'Sketches', accent: 'from-primary/30 to-transparent' },
  { label: 'Digital Art', accent: 'from-accent/30 to-transparent' },
  { label: 'UI Concepts', accent: 'from-secondary/30 to-transparent' },
  { label: 'Creative Experiments', accent: 'from-highlight/30 to-transparent' },
  { label: 'Sketches', accent: 'from-accent/20 to-transparent' },
  { label: 'Digital Art', accent: 'from-primary/20 to-transparent' },
]

export default function CreativeCorner() {
  return (
    <section id="creative" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Beyond the Code"
        title="Creative Corner"
        subtitle="Sketching and digital art keep the same instincts sharp that backend design calls on — composition, patience, iteration."
      />

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GALLERY.map((item, i) => (
          <motion.div
            key={item.label + i}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`aspect-square rounded-2xl glass bg-gradient-to-br ${item.accent} flex items-end p-5 relative overflow-hidden`}
            data-cursor-hover
          >
            <span className="font-artistic text-2xl text-slate-100">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
