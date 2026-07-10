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
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor-hover]')
      ring.style.width = interactive ? '56px' : '36px'
      ring.style.height = interactive ? '56px' : '36px'
      ring.style.borderColor = interactive ? 'rgba(168, 85, 247, 0.8)' : 'rgba(56, 189, 248, 0.55)'
    }

    let raf
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
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
