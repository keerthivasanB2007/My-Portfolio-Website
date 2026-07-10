import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 px-6 max-w-5xl mx-auto">
      <SectionHeading eyebrow="Kind Words" title="Testimonials" center />

      <div className="mt-14 grid sm:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-7"
          >
            <Quote className="text-accent mb-3" size={22} />
            <p className="text-slate-300 italic">{t.quote}</p>
            <p className="font-display text-sm text-slate-100 mt-5">{t.name}</p>
            <p className="text-xs text-slate-500">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
