import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { experience } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 max-w-4xl mx-auto">
      <SectionHeading eyebrow="Experience" title="Internships, freelancing & competitions" center />

      <div className="mt-14">
        {experience.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <Compass className="mx-auto text-primary mb-4 animate-float" size={30} />
            <p className="font-artistic text-2xl text-highlight">The next adventure begins here.</p>
            <p className="text-sm text-slate-500 mt-3">
              This space is reserved for internships, freelance work, open source contributions, hackathons, and competitions as they happen.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">{/* map real experience entries here */}</div>
        )}
      </div>
    </section>
  )
}
