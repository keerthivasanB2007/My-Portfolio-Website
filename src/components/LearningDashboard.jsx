import { motion } from 'framer-motion'
import { learning } from '../data/content'
import SectionHeading from './SectionHeading'

export default function LearningDashboard() {
  return (
    <section id="learning" className="relative py-28 px-6 max-w-4xl mx-auto">
      <SectionHeading
        eyebrow="Right Now"
        title="What I'm learning"
        subtitle="Backend engineering is a moving target on purpose — here's the current focus."
      />

      <div className="mt-14 space-y-6">
        {learning.map((item, i) => (
          <motion.div
            key={item.skill}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-200 font-medium">{item.skill}</span>
              <span className="text-primary">{item.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-highlight"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.06, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
