import CloverIcon from './CloverIcon'

function StarfireArt() {
  return (
    <svg width="150" height="60" viewBox="0 0 120 48" fill="none" aria-hidden>
      <rect
        x="6"
        y="10"
        width="46"
        height="27"
        rx="13"
        stroke="#8f1f53"
        strokeWidth="2.4"
      />
      <rect
        x="68"
        y="10"
        width="46"
        height="27"
        rx="13"
        stroke="#8f1f53"
        strokeWidth="2.4"
      />
      <path d="M52 20 Q60 13 68 20" stroke="#8f1f53" strokeWidth="2.4" />
      <path d="M6 18 L1 14" stroke="#8f1f53" strokeWidth="2.4" />
      <path d="M114 18 L119 14" stroke="#8f1f53" strokeWidth="2.4" />
      {/* the Starfire gemstone on the right lens */}
      <circle cx="104" cy="16" r="3" fill="#ff7ab8" />
      <circle cx="104" cy="16" r="6" stroke="#ff7ab8" strokeWidth="0.8" opacity="0.6" />
    </svg>
  )
}

export default function PrizeShowcase() {
  return (
    <section id="prizes">
      <div className="section-head">
        <p className="section-kicker">What you&apos;re playing for</p>
        <h2 className="section-title">The Prizes</h2>
      </div>

      <div className="prizes">
        <article className="prize-card grand">
          <p className="prize-place">First Place · Champion</p>
          <div className="prize-art">
            <div className="prize-clovers" aria-hidden>
              <CloverIcon className="pip" />
              <CloverIcon className="pip" />
              <CloverIcon className="pip" />
            </div>
          </div>
          <h3 className="prize-name">Sweet Alhambra · Carnelian</h3>
          <p className="prize-desc">
            The one spinning above — Van Cleef &amp; Arpels, carnelian red
            clover in rose gold. First lady to close ten deals takes it
            straight off the leaderboard and onto her wrist.
          </p>
        </article>

        <article className="prize-card second">
          <p className="prize-place">Second Place</p>
          <div className="prize-art">
            <StarfireArt />
          </div>
          <h3 className="prize-name">Meta Starfire · Kylie Edition</h3>
          <p className="prize-desc">
            Kylie Jenner&apos;s co-designed AI glasses — gemstone on the lens,
            her voice on board. Locked in for whoever holds 2nd when the race
            ends.
          </p>
        </article>

        <article className="prize-card third">
          <p className="prize-place">Third Place</p>
          <div className="prize-art">
            <StarfireArt />
          </div>
          <h3 className="prize-name">Meta Starfire · Kylie Edition</h3>
          <p className="prize-desc">
            Same pair, same shine. Hold 3rd place at the finish and the
            Starfires are yours.
          </p>
        </article>
      </div>
    </section>
  )
}
