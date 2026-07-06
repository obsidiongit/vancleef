import { COMPETITION, GOAL, RECENT_DEALS } from '@/data/competition'
import { getStandings, getWinner } from '@/lib/standings'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Leaderboard from '@/components/Leaderboard'
import PrizeShowcase from '@/components/PrizeShowcase'
import WinnerTakeover from '@/components/WinnerTakeover'

export default function Page() {
  const standings = getStandings()
  const winner = getWinner(standings)
  const runnersUp = winner
    ? standings.filter((c) => c.name !== winner.name).slice(0, 2)
    : []
  const totalDeals = standings.reduce((sum, c) => sum + c.deals, 0)

  return (
    <main>
      {winner && <WinnerTakeover winner={winner} runnersUp={runnersUp} />}

      <Hero
        title={COMPETITION.title}
        subtitle={COMPETITION.subtitle}
        startedOn={COMPETITION.startedOn}
        leader={standings[0]}
        totalDeals={totalDeals}
        competitorCount={standings.length}
        goal={GOAL}
      />

      <Ticker items={RECENT_DEALS} />

      <Leaderboard standings={standings} goal={GOAL} />

      <PrizeShowcase />

      <footer className="footer">
        <span className="footer-clover" aria-hidden>
          ✦
        </span>
        <p>
          {COMPETITION.title} · started {COMPETITION.startedOn} · first to{' '}
          {GOAL} closed deals wins
        </p>
      </footer>
    </main>
  )
}
