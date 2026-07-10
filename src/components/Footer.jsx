export default function Footer() {
  return (
    <footer className="relative py-10 px-6 border-t border-slate-800/60 text-center">
      <p className="text-sm text-slate-500">
        Designed and Developed with <span className="text-accent">❤</span>
      </p>
      <p className="text-xs text-slate-600 mt-1">
        Made by <span className="font-display text-slate-400">Keerthivasan</span> · {new Date().getFullYear()}
      </p>
    </footer>
  )
}
