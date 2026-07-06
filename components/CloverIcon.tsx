import type { CSSProperties } from 'react'

/** Alhambra-style quatrefoil: four semicircle petals around a square. */
export default function CloverIcon({
  filled = true,
  className,
  style,
}: {
  filled?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path
        d="M7 7 A5 5 0 1 1 17 7 A5 5 0 1 1 17 17 A5 5 0 1 1 7 17 A5 5 0 1 1 7 7 Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.4}
      />
      {filled && <circle cx="12" cy="12" r="1.7" fill="rgba(255, 255, 255, 0.9)" />}
    </svg>
  )
}
