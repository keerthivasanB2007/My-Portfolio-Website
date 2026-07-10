import { useEffect, useState } from 'react'

// Tracks which section id is currently most visible in the viewport.
export function useScrollSpy(ids, offset = 200) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const handler = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top - offset <= 0) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [ids, offset])

  return active
}
