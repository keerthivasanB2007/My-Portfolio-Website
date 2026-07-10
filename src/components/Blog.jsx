import { motion } from 'framer-motion'
import { blogPosts } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Blog() {
  return (
    <section id="blog" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Writing"
        title="Notes from the learning process"
        subtitle="Placeholder posts — swap these in once the writing is real."
      />

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow cursor-pointer"
            data-cursor-hover
          >
            <post.icon className="text-primary mb-4" size={22} />
            <span className="text-xs uppercase tracking-widest text-secondary">{post.tag}</span>
            <h3 className="font-display font-semibold text-lg text-slate-100 mt-2">{post.title}</h3>
            <p className="text-sm text-slate-400 mt-2">{post.excerpt}</p>
            <span className="inline-block mt-4 text-xs text-primary">Read more →</span>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
