import { useEffect, useMemo, useState, memo } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  ExternalLink,
  Eye,
  GitFork,
  Github,
  Star,
  Users,
  GitBranch,
  AlertCircle,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useGitHub } from '../hooks/useGitHub'

const GITHUB_USERNAME = 'keerthivasanB2007'

function usePortfolioTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'dark'
  )

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme || 'dark')
    })
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return theme
}

function getEmbedUrls(theme) {
  const readmeTheme = theme === 'light' ? 'default' : 'tokyonight'
  const graphTheme = theme === 'light' ? 'default' : 'tokyo-night'

  return {
    stats: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=${readmeTheme}&hide_border=true&rank_icon=github&include_all_commits=true&count_private=true`,
    topLangs: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=${readmeTheme}&hide_border=true`,
    streak: `https://streak-stats.demolab.com?user=${GITHUB_USERNAME}&theme=${readmeTheme}&hide_border=true`,
    activityGraph: `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=${graphTheme}&hide_border=true`,
  }
}

const LANGUAGE_COLORS = {
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  C: '#555555',
  'C++': '#f34b7d',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
  Vue: '#41b883',
  React: '#61dafb',
  'Node.js': '#339933',
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function formatJoinedDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function formatUpdatedDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'Updated today'
  if (diffDays === 1) return 'Updated yesterday'
  if (diffDays < 30) return `Updated ${diffDays} days ago`

  return `Updated ${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`
}

function getLanguageColor(language) {
  if (!language) return '#64748B'
  return LANGUAGE_COLORS[language] || '#38BDF8'
}

function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-700/30 ${className}`}
      aria-hidden="true"
    />
  )
}

function ProfileSkeleton() {
  return (
    <div className="glass rounded-3xl p-8 sm:p-10">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
        <Skeleton className="w-[120px] h-[120px] rounded-full shrink-0" />
        <div className="flex-1 w-full space-y-4">
          <Skeleton className="h-8 w-48 mx-auto sm:mx-0" />
          <Skeleton className="h-5 w-36 mx-auto sm:mx-0" />
          <Skeleton className="h-4 w-full max-w-lg mx-auto sm:mx-0" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-11 w-52 mx-auto sm:mx-0 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

function RepoSkeleton({ index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="github-gradient-border rounded-2xl"
    >
      <div className="glass rounded-2xl p-6 h-full space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-lg" />
          <Skeleton className="h-6 w-12 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </motion.div>
  )
}

function EmbedSkeleton({ height = 'h-40' }) {
  return (
    <div className="glass rounded-2xl p-6">
      <Skeleton className={`w-full ${height} rounded-2xl`} />
    </div>
  )
}

const GitHubImageCard = memo(function GitHubImageCard({
  title,
  src,
  alt,
  index = 0,
  minHeight = 140,
}) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    setStatus('loading')
  }, [src])

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="glass rounded-2xl p-5 sm:p-6 overflow-hidden"
    >
      {title && <p className="eyebrow mb-4">{title}</p>}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: status === 'error' ? minHeight : undefined }}
      >
        {status !== 'error' && (
          <>
            {status === 'loading' && (
              <Skeleton
                className="w-full rounded-2xl"
                style={{ minHeight, height: minHeight }}
              />
            )}
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              onLoad={() => setStatus('loaded')}
              onError={() => setStatus('error')}
              className={`github-readme-img ${status === 'loaded' ? 'is-visible' : 'is-loading'}`}
            />
          </>
        )}
        {status === 'error' && (
          <div
            className="flex items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-8 text-center"
            style={{ minHeight }}
            role="status"
          >
            <p className="text-sm text-slate-400">
              Unable to load {title ? title.toLowerCase() : 'GitHub image'}. Please try again
              later.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
})

function StatBadge({ icon: Icon, label, value }) {
  return (
    <div className="glass-strong rounded-2xl px-4 py-3 text-center min-w-0">
      <Icon className="mx-auto text-primary mb-1.5" size={18} aria-hidden="true" />
      <p className="font-display font-bold text-xl sm:text-2xl text-slate-50 truncate">
        {value}
      </p>
      <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-tight">{label}</p>
    </div>
  )
}

function LanguageBadge({ language }) {
  const label = language || 'Unknown'
  const color = getLanguageColor(language)

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
      style={{
        color,
        borderColor: `${color}55`,
        background: `${color}18`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}

function ProfileCard({ profile }) {
  const displayName = profile.name || profile.login

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass rounded-3xl p-8 sm:p-10 relative overflow-hidden"
    >
      <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8">
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-lg scale-110"
            aria-hidden="true"
          />
          <img
            src={profile.avatar_url}
            alt={`${displayName}'s GitHub profile picture`}
            width={120}
            height={120}
            loading="lazy"
            className="relative w-[120px] h-[120px] rounded-full object-cover border-2 border-primary/50 shadow-glow"
          />
        </div>

        <div className="flex-1 text-center sm:text-left min-w-0">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-50">
            {displayName}
          </h3>
          <p className="text-primary font-medium mt-1">@{profile.login}</p>

          {profile.bio ? (
            <p className="text-slate-400 mt-3 max-w-xl leading-relaxed">{profile.bio}</p>
          ) : (
            <p className="text-slate-500 mt-3 italic">No bio available.</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <StatBadge icon={GitBranch} label="Public Repositories" value={profile.public_repos} />
            <StatBadge icon={Users} label="Followers" value={profile.followers} />
            <StatBadge icon={Users} label="Following" value={profile.following} />
            <StatBadge
              icon={Calendar}
              label="Joined"
              value={formatJoinedDate(profile.created_at)}
            />
          </div>

          <motion.a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(56, 189, 248, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-slate-100 hover:border-primary/60 transition-colors"
          >
            <Github size={18} aria-hidden="true" />
            View GitHub Profile
            <ExternalLink size={14} aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

function RepoCard({ repo, index }) {
  const visibility = repo.visibility || (repo.private ? 'private' : 'public')

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="github-gradient-border rounded-2xl h-full group"
    >
      <div className="glass rounded-2xl p-6 h-full flex flex-col transition-shadow duration-300 group-hover:shadow-glow">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display font-semibold text-lg text-slate-100 group-hover:text-primary transition-colors truncate">
            {repo.name}
          </h4>
          <span
            className={`shrink-0 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
              visibility === 'public'
                ? 'border-secondary/30 bg-secondary/10 text-secondary'
                : 'border-accent/30 bg-accent/10 text-accent'
            }`}
          >
            <Eye size={10} aria-hidden="true" />
            {visibility}
          </span>
        </div>

        <p className="text-sm text-slate-400 mt-3 flex-1 leading-relaxed line-clamp-3">
          {repo.description || 'No description available.'}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <LanguageBadge language={repo.language} />
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Star size={13} aria-hidden="true" />
            {repo.stargazers_count}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <GitFork size={13} aria-hidden="true" />
            {repo.forks_count}
          </span>
        </div>

        <p className="text-xs text-slate-500 mt-3">{formatUpdatedDate(repo.updated_at)}</p>

        <motion.a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.03] hover:border-primary/40 hover:bg-primary/10 text-slate-200 transition-colors"
        >
          Open Repository
          <ExternalLink size={14} aria-hidden="true" />
        </motion.a>
      </div>
    </motion.article>
  )
}

function ErrorBanner({ message }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="glass rounded-2xl p-6 border border-red-500/30 flex items-start gap-3"
      role="alert"
    >
      <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} aria-hidden="true" />
      <div>
        <p className="font-semibold text-slate-100">Unable to load GitHub data</p>
        <p className="text-sm text-slate-400 mt-1">{message}</p>
      </div>
    </motion.div>
  )
}

export default function GithubStats() {
  const { profile, repos, loading, error } = useGitHub(GITHUB_USERNAME)
  const theme = usePortfolioTheme()
  const embedUrls = useMemo(() => getEmbedUrls(theme), [theme])

  return (
    <section id="github" className="relative py-28 px-6 max-w-6xl mx-auto">
      <style>{`
        .github-gradient-border {
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.35), rgba(168, 85, 247, 0.35));
          padding: 1px;
        }
        .github-embed-img {
          display: block;
        }
        [data-theme='light'] .github-embed-img {
          filter: none;
        }
        .github-readme-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 16px;
          transition: opacity 0.5s ease-in-out;
        }
        .github-readme-img.is-loading {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        .github-readme-img.is-visible {
          opacity: 1;
          position: relative;
        }
      `}</style>

      <SectionHeading eyebrow="Open Source" title="Building in public on GitHub" />

      <div className="mt-14 space-y-8">
        {error && <ErrorBanner message={error} />}

        {/* Profile Card */}
        {loading ? <ProfileSkeleton /> : profile && <ProfileCard profile={profile} />}

        {/* GitHub Stats + Streak */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            <>
              <EmbedSkeleton height="h-[195px]" />
              <EmbedSkeleton height="h-[195px]" />
            </>
          ) : (
            <>
              <GitHubImageCard
                title="GitHub Stats"
                src={embedUrls.stats}
                alt={`${GITHUB_USERNAME}'s GitHub statistics`}
                index={1}
                minHeight={195}
              />
              <GitHubImageCard
                title="Contribution Streak"
                src={embedUrls.streak}
                alt={`${GITHUB_USERNAME}'s GitHub contribution streak`}
                index={2}
                minHeight={195}
              />
            </>
          )}
        </div>

        {/* Contribution Graph */}
        {loading ? (
          <EmbedSkeleton height="h-[300px]" />
        ) : (
          <GitHubImageCard
            title="Contribution Activity"
            src={embedUrls.activityGraph}
            alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
            index={3}
            minHeight={300}
          />
        )}

        {/* Top Languages */}
        {loading ? (
          <EmbedSkeleton height="h-[165px]" />
        ) : (
          <GitHubImageCard
            title="Top Languages"
            src={embedUrls.topLangs}
            alt={`${GITHUB_USERNAME}'s most used programming languages on GitHub`}
            index={4}
            minHeight={165}
          />
        )}

        {/* Featured Projects */}
        <div>
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
            className="font-display font-bold text-xl sm:text-2xl text-slate-50 mb-6"
          >
            Featured Projects
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} index={i} />)
              : repos.map((repo, i) => <RepoCard key={repo.id} repo={repo} index={i} />)}
          </div>

          {!loading && !error && repos.length === 0 && (
            <p className="text-slate-400 text-center py-8">No public repositories found.</p>
          )}
        </div>
      </div>
    </section>
  )
}
