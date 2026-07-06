'use client'

import dynamic from 'next/dynamic'
import type { Ranked } from '@/lib/standings'

const Bracelet3D = dynamic(() => import('./Bracelet3D'), {
  ssr: false,
  loading: () => (
    <div className="stage-fallback">
      <span aria-hidden>✦</span>
    </div>
  ),
})

type Props = {
  title: string
  subtitle: string
  startedOn: string
  leader: Ranked
  totalDeals: number
  competitorCount: number
  goal: number
}

export default function Hero({
  title,
  subtitle,
  startedOn,
  leader,
  totalDeals,
  competitorCount,
  goal,
}: Props) {
  return (
    <header className="hero">
      <p className="hero-eyebrow">Sales Championship · Started {startedOn}</p>
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>

      <div className="hero-stage">
        <div className="stage-glow" aria-hidden />
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="twinkle" aria-hidden>
            ✦
          </span>
        ))}
        <Bracelet3D />
        <p className="stage-hint">Drag to admire the prize</p>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <div className="stat-value">
            {leader.deals}
            <span style={{ opacity: 0.5 }}>/{goal}</span>
          </div>
          <div className="stat-label">Leader · {leader.name}</div>
        </div>
        <div className="stat">
          <div className="stat-value">{totalDeals}</div>
          <div className="stat-label">Deals closed</div>
        </div>
        <div className="stat">
          <div className="stat-value">{competitorCount}</div>
          <div className="stat-label">In the race</div>
        </div>
      </div>
    </header>
  )
}
