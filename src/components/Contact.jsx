import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Download, Send, Check } from 'lucide-react'
import SectionHeading from './SectionHeading'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire this up to a real form handler (Formspree, EmailJS, or a backend endpoint).
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section id="contact" className="relative py-28 px-6 max-w-5xl mx-auto">
      <SectionHeading
        eyebrow="Let's Build Something"
        title="Get in touch"
        subtitle="Open to internships, backend engineering roles, and interesting collaborations."
        center
      />

      <div className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-7 space-y-5"
        >
          <ContactRow icon={Mail} label="Email" value="keerthivasan@example.com" href="mailto:keerthivasan@example.com" />
          <ContactRow icon={Linkedin} label="LinkedIn" value="/in/keerthivasan" href="#" />
          <ContactRow icon={Github} label="GitHub" value="@keerthivasan" href="#" />
          <ContactRow icon={MapPin} label="Location" value="Tamil Nadu, India" />
          <a
            href="/resume.pdf"
            download
            data-cursor-hover
            className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-slate-950 text-sm font-medium"
          >
            <Download size={16} /> Download Resume
          </a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-7 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          </div>
          <Field label="Subject" name="subject" placeholder="What's this about?" />
          <Field label="Message" name="message" as="textarea" rows={5} placeholder="Tell me a bit about the opportunity or idea..." />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary via-accent to-highlight text-slate-950 font-medium text-sm"
          >
            {sent ? (<><Check size={16} /> Message sent</>) : (<><Send size={16} /> Send message</>)}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-slate-800/70 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm text-slate-200">{value}</p>
      </div>
    </div>
  )
  return href ? <a href={href} data-cursor-hover>{content}</a> : content
}

function Field({ label, name, type = 'text', as = 'input', rows, placeholder }) {
  const Component = as
  return (
    <label className="block">
      <span className="text-xs text-slate-500">{label}</span>
      <Component
        name={name}
        type={as === 'input' ? type : undefined}
        rows={rows}
        required
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:border-primary focus:outline-none transition-colors resize-none"
      />
    </label>
  )
}
