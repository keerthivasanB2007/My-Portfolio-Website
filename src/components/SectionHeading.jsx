import { memo } from 'react'
import { motion } from 'framer-motion'

function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className={center ? 'text-center' : ''}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-50">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-slate-400 max-w-2xl">{subtitle}</p>}
    </motion.div>
  )
}

export default memo(SectionHeading)
