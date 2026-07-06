'use client'

import { useEffect, useRef } from 'react'

const COLORS = ['#ff7ab8', '#ffb3d4', '#c22e72', '#f0b49b', '#bf3a2b', '#ffffff']

type Piece = {
  x: number
  y: number
  size: number
  vx: number
  vy: number
  rot: number
  vr: number
  color: string
  round: boolean
}

export default function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const pieces: Piece[] = Array.from({ length: 170 }, () => ({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height,
      size: 5 + Math.random() * 7,
      vx: -0.8 + Math.random() * 1.6,
      vy: 1.4 + Math.random() * 2.4,
      rot: Math.random() * Math.PI * 2,
      vr: -0.08 + Math.random() * 0.16,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      round: Math.random() < 0.3,
    }))

    let raf = 0
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pieces) {
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.6
        p.y += p.vy
        p.rot += p.vr
        if (p.y > canvas.height + 20) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        if (p.round) {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        }
        ctx.restore()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="confetti-canvas" aria-hidden />
}
