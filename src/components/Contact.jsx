import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Download, Send, Check, Phone, ArrowRight, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import SectionHeading from './SectionHeading'

export default function Contact() {
  const [theme, setTheme] = useState(
    () => typeof document !== 'undefined' ? (document.documentElement.dataset.theme || 'dark') : 'dark'
  )
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success' | 'error', message: string }

  useEffect(() => {
    // Verify environment variables are loaded
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS Configuration Error: One or more environment variables are missing!', {
        VITE_EMAILJS_SERVICE_ID: serviceId ? 'LOADED' : 'UNDEFINED',
        VITE_EMAILJS_TEMPLATE_ID: templateId ? 'LOADED' : 'UNDEFINED',
        VITE_EMAILJS_PUBLIC_KEY: publicKey ? 'LOADED' : 'UNDEFINED',
      })
    }

    if (typeof document === 'undefined') return
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme || 'dark')
    })
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const isLight = theme === 'light'

  // Input validator
  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error inline when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setSending(true)
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are not configured.')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      )

      setToast({ type: 'success', message: 'Message Sent Successfully' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error("EmailJS Error:", err)
      setToast({ type: 'error', message: 'Unable to send message. Please check the console.' })
    } finally {
      setSending(false)
      // Auto-hide toast after 4 seconds
      setTimeout(() => setToast(null), 4000)
    }
  }

  return (
    <section id="contact" className="relative py-28 px-6 max-w-5xl mx-auto overflow-hidden">
      
      {/* Background glow ambient layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div 
          className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px]"
          style={{ opacity: isLight ? 0.25 : 0.5 }}
        />
        <div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full filter blur-[120px]"
          style={{ opacity: isLight ? 0.25 : 0.5 }}
        />
      </div>

      <div className="relative z-10 w-full">
        <SectionHeading
          eyebrow="Let's Build Something"
          title="Get in Touch"
          subtitle="I'm currently open to internships, software engineering opportunities, backend development roles, and exciting collaborations."
          center
        />

        {/* 2-Column Responsive Layout: Left 35%, Right 65% on Desktop */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] gap-8 items-stretch w-full">
          
          {/* Left Column: Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-[24px] border p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 shadow-xl ${
              isLight 
                ? 'bg-white/45 border-slate-200/80 shadow-slate-200/20' 
                : 'bg-[#0f172a]/40 border-white/5 shadow-black/50'
            }`}
          >
            <div className="space-y-4">
              <ContactRow 
                icon={Mail} 
                label="Email" 
                value="keerthivasanbn@gmail.com" 
                href="mailto:keerthivasanbn@gmail.com" 
                theme={theme}
              />
              <ContactRow 
                icon={Phone} 
                label="Phone" 
                value="9345000599" 
                href="tel:+919345000599" 
                theme={theme}
              />
              <ContactRow 
                icon={Linkedin} 
                label="LinkedIn" 
                value="Keerthivasan B" 
                href="https://www.linkedin.com/in/keerthivasan-b-1a0b67324/?skipRedirect=true" 
                target="_blank"
                rel="noopener noreferrer"
                theme={theme}
              />
              <ContactRow 
                icon={Github} 
                label="GitHub" 
                value="@keerthivasanB2007" 
                href="https://github.com/keerthivasanB2007" 
                target="_blank"
                rel="noopener noreferrer"
                theme={theme}
              />
              <ContactRow 
                icon={MapPin} 
                label="Location" 
                value={[
                  'Anna University',
                  'Madras Institute of Technology',
                  'Chromepet',
                  'Chennai',
                  'Tamil Nadu',
                  'India'
                ]} 
                theme={theme}
              />
            </div>

            {/* Bottom Premium Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 mt-4 w-full">
              
              {/* Primary: Download Resume */}
              <motion.a
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                href="/Keerthivasan_B_Resume.pdf"
                download="Keerthivasan_B_Resume.pdf"
                aria-label="Download Resume"
                className="relative inline-flex items-center justify-center p-[1px] rounded-full bg-gradient-to-r from-primary via-accent to-highlight overflow-hidden flex-1 shadow-sm"
              >
                <span className={`w-full h-full rounded-full px-5 py-3 flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 ${
                  isLight 
                    ? 'bg-slate-50 text-slate-800 hover:bg-transparent hover:text-white' 
                    : 'bg-[#0b0f19] text-slate-200 hover:bg-transparent hover:text-slate-950'
                }`}>
                  <Download size={15} />
                  Download Resume
                </span>
              </motion.a>

              {/* Secondary: Open GitHub */}
              <motion.a
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                href="https://github.com/keerthivasanB2007"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center p-[1px] rounded-full bg-gradient-to-r from-primary via-accent to-highlight overflow-hidden flex-1 shadow-sm"
              >
                <span className={`w-full h-full rounded-full px-5 py-3 flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 ${
                  isLight 
                    ? 'bg-slate-50 text-slate-800 hover:bg-transparent hover:text-white' 
                    : 'bg-[#0b0f19] text-slate-200 hover:bg-transparent hover:text-slate-950'
                }`}>
                  <Github size={15} />
                  Open GitHub
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-[24px] border p-6 sm:p-8 space-y-5 transition-all duration-300 shadow-xl ${
              isLight 
                ? 'bg-white/45 border-slate-200/80 shadow-slate-200/20' 
                : 'bg-[#0f172a]/40 border-white/5 shadow-black/50'
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <Field 
                label="Name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Your name" 
                theme={theme}
                disabled={sending}
              />
              <Field 
                label="Email" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com" 
                theme={theme}
                disabled={sending}
              />
            </div>
            
            <Field 
              label="Subject" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              placeholder="What's this about?" 
              theme={theme}
              disabled={sending}
            />
            
            <Field 
              label="Message" 
              name="message" 
              as="textarea" 
              rows={5} 
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Tell me a bit about the opportunity or idea..." 
              theme={theme}
              disabled={sending}
            />

            {/* Send Button */}
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={sending ? {} : { scale: 1.015 }}
              whileTap={sending ? {} : { scale: 0.985 }}
              className={`w-full h-[48px] inline-flex items-center justify-center gap-2 rounded-[16px] text-sm font-bold shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
                sending ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
              } ${
                isLight 
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white hover:brightness-110 shadow-blue-500/15' 
                  : 'bg-gradient-to-r from-primary via-accent to-highlight text-slate-950 hover:shadow-glow'
              }`}
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Floating Success/Error Toasts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-[20px] flex items-center gap-3 border shadow-2xl backdrop-blur-md transition-all duration-300 ${
              toast.type === 'success'
                ? (isLight 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-200/10' 
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-black/50')
                : (isLight 
                    ? 'bg-red-50 border-red-200 text-red-800 shadow-red-200/10' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400 shadow-black/50')
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-550'
            }`}>
              {toast.type === 'success' ? '✓' : '✗'}
            </div>
            <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

function ContactRow({ icon: Icon, label, value, href, theme, target, rel }) {
  const isLight = theme === 'light'
  const isArrayVal = Array.isArray(value)

  const content = (
    <motion.div 
      whileHover={{ y: -3 }}
      className={`flex items-center gap-4 group p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
        isLight
          ? 'bg-slate-100/40 border-slate-200/60 hover:bg-slate-100/70 hover:border-slate-300 hover:shadow-md'
          : 'bg-[#0f172a]/20 border-white/5 hover:bg-[#0f172a]/40 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]'
      }`}
    >
      {/* Icon Circle */}
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
        isLight
          ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
          : 'bg-slate-800/80 text-primary group-hover:bg-primary group-hover:text-slate-950 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.6)]'
      }`}>
        <Icon size={19} />
      </div>

      {/* Row Labels */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase font-extrabold tracking-widest text-slate-500">
          {label}
        </p>
        
        {isArrayVal ? (
          <div className={`text-sm mt-0.5 font-bold transition-colors duration-300 leading-normal ${
            isLight ? 'text-slate-700 group-hover:text-blue-600' : 'text-slate-200 group-hover:text-primary'
          }`}>
            {value.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        ) : (
          <p className={`text-sm mt-0.5 font-bold truncate transition-colors duration-300 ${
            isLight
              ? 'text-slate-700 group-hover:text-blue-600'
              : 'text-slate-200 group-hover:text-primary'
          }`}>
            {value}
          </p>
        )}
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel} 
        className="block cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/45 rounded-2xl"
        aria-label={`${label}: ${isArrayVal ? value.join(', ') : value}`}
      >
        {content}
      </a>
    )
  }
  return content
}

function Field({ label, name, value, onChange, error, placeholder, type = 'text', as = 'input', rows, theme, disabled }) {
  const Component = as
  const isLight = theme === 'light'
  
  return (
    <label className="block w-full text-left">
      <span className={`text-[10px] uppercase font-extrabold tracking-widest ${
        isLight ? 'text-slate-600' : 'text-slate-400'
      }`}>
        {label}
      </span>
      <Component
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={as === 'input' ? type : undefined}
        rows={rows}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-[16px] px-4 py-3 text-sm placeholder:text-slate-500/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 resize-none shadow-sm border ${
          error 
            ? 'border-red-500/50 focus:ring-red-500/30' 
            : (isLight 
                ? 'border-slate-200 bg-white/60 text-slate-800 focus:border-blue-600' 
                : 'border-white/5 bg-slate-900/60 text-slate-100 focus:border-primary')
        }`}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-500 font-bold mt-1 block"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}
