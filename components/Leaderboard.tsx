'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import type { Ranked } from '@/lib/standings'
import CloverIcon from './CloverIcon'
import Monogram from './Monogram'

const FEATURED = 8

function useCountUp(target: number, duration = 1100, delay = 500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (target <= 0) {
      setValue(0)
      return
    }
    let raf = 0
    const start = performance.now() + delay
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration))
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, delay])

  return value
}

function rankClass(rank: number): string {
  if (rank === 1) return 'is-first'
  if (rank === 2) return 'is-second'
  if (rank === 3) return 'is-third'
  return ''
}

function prizeTag(rank: number): string | null {
  if (rank === 1) return '✦ Van Cleef position'
  if (rank <= 3) return '✦ Starfire position'
  return null
}

function Lane({ c, i, goal }: { c: Ranked; i: number; goal: number }) {
  const count = useCountUp(c.deals)
  const tag = prizeTag(c.rank)

  return (
    <article
      className={`lane ${rankClass(c.rank)}`}
      style={{ '--i': i } as CSSProperties}
    >
      <div className="lane-rank">
        {c.rank === 1 && (
          <span className="lane-crown" aria-hidden>
            ✦
          </span>
        )}
        {c.rank}
      </div>

      <Monogram name={c.name} />

      <div className="lane-name">
        <h3>{c.name}</h3>
        {tag && <p className="lane-prize-tag">{tag}</p>}
      </div>

      <div className="lane-progress">
        <div
          className="pips"
          role="img"
          aria-label={`${c.deals} of ${goal} deals`}
        >
          {Array.from({ length: goal }, (_, p) => (
            <CloverIcon
              key={p}
              filled={p < c.deals}
              className={`pip${p < c.deals ? ' is-filled' : ''}`}
              style={{ '--p': p, '--i': i } as CSSProperties}
            />
          ))}
        </div>
        <div className="lane-count">
          {count}
          <small>of {goal}</small>
        </div>
      </div>
    </article>
  )
}

function PackCard({ c, i, goal }: { c: Ranked; i: number; goal: number }) {
  return (
    <article className="pack-card" style={{ '--i': i } as CSSProperties}>
      <span className="pack-rank">{c.rank}</span>
      <Monogram name={c.name} small />
      <div className="pack-info">
        <p className="pack-name">{c.name}</p>
        <div className="pack-bar" aria-hidden>
          <div
            className="pack-bar-fill"
            style={{ width: `${(c.deals / goal) * 100}%` }}
          />
        </div>
      </div>
      <span className="pack-deals" aria-label={`${c.deals} of ${goal} deals`}>
        {c.deals}
      </span>
    </article>
  )
}

export default function Leaderboard({
  standings,
  goal,
}: {
  standings: Ranked[]
  goal: number
}) {
  const featured = standings.slice(0, FEATURED)
  const pack = standings.slice(FEATURED)

  return (
    <section id="leaderboard">
      <div className="section-head">
        <p className="section-kicker">The standings</p>
        <h2 className="section-title">Leaderboard</h2>
        <p className="section-note">
          First to {goal} takes the bracelet — 2nd &amp; 3rd at that moment win
          the Starfires
        </p>
      </div>

      <div className="lanes">
        {featured.map((c, i) => (
          <Lane key={c.name} c={c} i={i} goal={goal} />
        ))}
      </div>

      {pack.length > 0 && (
        <>
          <p className="pack-label">The chasing pack</p>
          <div className="pack">
            {pack.map((c, i) => (
              <PackCard key={c.name} c={c} i={i} goal={goal} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
