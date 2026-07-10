import { motion } from 'framer-motion'
import { achievements } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Milestones" title="Achievements" />

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow"
          >
            <item.icon className="text-secondary mb-3" size={22} />
            <p className="font-display font-medium text-slate-100">{item.title}</p>
            <p className="text-sm text-slate-400 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
