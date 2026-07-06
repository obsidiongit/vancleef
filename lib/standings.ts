import { COMPETITORS, GOAL, type Competitor } from '@/data/competition'

export type Ranked = Competitor & { rank: number }

/**
 * Sort: most deals first; ties broken by who got there first
 * (earlier lastDealAt wins), then alphabetically for stability.
 * Ties share the same rank (standard competition ranking).
 */
export function getStandings(): Ranked[] {
  const sorted = [...COMPETITORS].sort((a, b) => {
    if (b.deals !== a.deals) return b.deals - a.deals
    const aDate = a.lastDealAt ?? '9999-12-31'
    const bDate = b.lastDealAt ?? '9999-12-31'
    if (aDate !== bDate) return aDate < bDate ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  let rank = 0
  let prevDeals = -1
  return sorted.map((c, i) => {
    if (c.deals !== prevDeals) {
      rank = i + 1
      prevDeals = c.deals
    }
    return { ...c, rank }
  })
}

/** The champion, if anyone has reached the goal. */
export function getWinner(standings: Ranked[]): Ranked | null {
  return standings.find((c) => c.deals >= GOAL) ?? null
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/[^\p{L}]/gu, '').charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
