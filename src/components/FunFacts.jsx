import { motion } from 'framer-motion'
import { funFacts } from '../data/content'
import SectionHeading from './SectionHeading'

export default function FunFacts() {
  return (
    <section id="funfacts" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Quick Hits" title="Fun Facts" center />

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {funFacts.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6"
          >
            <p className="text-xs uppercase tracking-widest text-secondary">{fact.label}</p>
            <p className="font-display text-lg text-slate-100 mt-2">{fact.value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
