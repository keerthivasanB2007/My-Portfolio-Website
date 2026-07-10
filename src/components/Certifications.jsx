import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, X } from 'lucide-react'
import { certifications } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Certifications() {
  const [preview, setPreview] = useState(null)

  return (
    <section id="certifications" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Proof of Work" title="Certifications" />

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.button
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setPreview(cert)}
            className="glass rounded-2xl p-6 text-left hover:shadow-glow-gold transition-shadow"
            data-cursor-hover
          >
            <Award className="text-highlight mb-3" size={24} />
            <p className="font-display font-medium text-slate-100">{cert.title}</p>
            <p className="text-sm text-slate-400 mt-1">{cert.issuer}</p>
            <p className="text-xs text-slate-500 mt-3">{cert.year}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-void/90 backdrop-blur-sm" onClick={() => setPreview(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative glass-strong rounded-3xl p-8 max-w-md w-full text-center"
            >
              <button onClick={() => setPreview(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-100">
                <X size={20} />
              </button>
              <Award className="mx-auto text-highlight mb-4" size={36} />
              <h3 className="font-display font-semibold text-xl text-slate-100">{preview.title}</h3>
              <p className="text-slate-400 mt-2">{preview.issuer}</p>
              <p className="text-slate-500 text-sm mt-1">{preview.year}</p>
              <p className="text-xs text-slate-600 mt-6">Replace with an actual certificate image when available.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
