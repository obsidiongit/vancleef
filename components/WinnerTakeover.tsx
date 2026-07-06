'use client'

import { useState } from 'react'
import type { Ranked } from '@/lib/standings'
import Confetti from './Confetti'

export default function WinnerTakeover({
  winner,
  runnersUp,
}: {
  winner: Ranked
  runnersUp: Ranked[]
}) {
  const [open, setOpen] = useState(true)

  if (!open) return null

  const [second, third] = runnersUp

  return (
    <div className="takeover" role="dialog" aria-modal="true">
      <Confetti />
      <div className="takeover-inner">
        <p className="takeover-kicker">✦ We have a champion ✦</p>
        <h2 className="takeover-name">{winner.name}</h2>
        <p className="takeover-sub">
          First to ten — the Van Cleef bracelet is yours.
        </p>

        <div className="takeover-podium">
          <div className="podium-card gold">
            <p className="podium-place">Champion</p>
            <p className="podium-name">{winner.name}</p>
            <p className="podium-prize">VCA Sweet Alhambra · Carnelian</p>
          </div>
          {second && (
            <div className="podium-card s">
              <p className="podium-place">Second Place</p>
              <p className="podium-name">{second.name}</p>
              <p className="podium-prize">Meta Starfire · Kylie Edition</p>
            </div>
          )}
          {third && (
            <div className="podium-card t">
              <p className="podium-place">Third Place</p>
              <p className="podium-name">{third.name}</p>
              <p className="podium-prize">Meta Starfire · Kylie Edition</p>
            </div>
          )}
        </div>

        <button className="takeover-dismiss" onClick={() => setOpen(false)}>
          View the final board
        </button>
      </div>
    </div>
  )
}
