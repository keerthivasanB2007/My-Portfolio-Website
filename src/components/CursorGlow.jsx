import { useEffect, useRef } from 'react'

// A lightweight custom cursor: a small dot with a trailing ring that
// eases toward the pointer and grows over interactive elements.
export default function CursorGlow() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor-hover]')
      ring.style.width = interactive ? '56px' : '36px'
      ring.style.height = interactive ? '56px' : '36px'
      ring.style.borderColor = interactive ? 'rgba(168, 85, 247, 0.8)' : 'rgba(56, 189, 248, 0.55)'
    }

    let raf
    const animate = () => {
      if (!document.hidden) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
        
        ringX += (mouseX - ringX) * 0.18
        ringY += (mouseY - ringY) * 0.18
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
