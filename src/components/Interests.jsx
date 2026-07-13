import { memo } from 'react'
import { motion } from 'framer-motion'
import { interests } from '../data/content'
import SectionHeading from './SectionHeading'

function Interests() {
  return (
    <section id="interests" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Outside the IDE" title="Interests" center />

      <div className="mt-14 flex flex-wrap justify-center gap-4">
        {interests.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -4, borderColor: 'rgba(56,189,248,0.4)' }}
            className="glass rounded-2xl px-6 py-5 w-56 text-center"
          >
            <p className="font-display text-slate-100 font-medium">{item.title}</p>
            <p className="text-xs text-slate-400 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default memo(Interests)
