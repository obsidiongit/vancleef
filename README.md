# Race to Ten ✦

A one-page, video-game-style sales leaderboard. First lady to close **10
deals** wins the Van Cleef bracelet; whoever holds 2nd and 3rd at that moment
wins Meta Starfire (Kylie Edition) glasses.

Built with Next.js + react-three-fiber (the spinning 3D bracelet), designed
for Vercel.

## Updating the board (the only thing you'll ever do)

Everything lives in **`data/competition.ts`**. When someone closes a deal:

1. Bump her `deals` number.
2. Set her `lastDealAt` to today (`'2026-07-12'` style). Ties are broken by
   who got to that count first — earlier date ranks higher.
3. (Optional) Add a fun one-liner to the top of `RECENT_DEALS` so it scrolls
   across the ticker.
4. Commit and push. Vercel redeploys automatically (~30 seconds).

When you set someone to `10`, the site flips into full winner-celebration
mode on its own — confetti, champion banner, and a podium that locks in 2nd
and 3rd from the standings at that moment.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying to Vercel

1. Push this folder to a GitHub repo (`git init`, commit, push).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and hit
   Deploy — it auto-detects Next.js, no configuration needed.
3. Every future `git push` redeploys the board automatically.

## Where things live

| File | What it is |
| --- | --- |
| `data/competition.ts` | **Scores, names, ticker — the file you edit** |
| `lib/standings.ts` | Sorting, ranking, tie-breaks, winner detection |
| `components/Bracelet3D.tsx` | The procedural 3D bracelet (Three.js) |
| `components/Leaderboard.tsx` | Lanes, clover progress pips, chasing pack |
| `components/WinnerTakeover.tsx` | Full-screen celebration when someone hits 10 |
| `app/globals.css` | The whole jewel-box look — colors, animations |
