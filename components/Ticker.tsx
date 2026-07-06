export default function Ticker({ items }: { items: string[] }) {
  if (items.length === 0) return null

  return (
    <section className="ticker" aria-label="Recent deals">
      <div className="ticker-track">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            style={{ display: 'inline-flex' }}
          >
            <span className="ticker-item">
              <span className="ticker-label">Live from the floor</span>
            </span>
            {items.map((item, i) => (
              <span key={i} className="ticker-item">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
