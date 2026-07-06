// ============================================================
//  RACE TO TEN — competition data
//  This is the ONLY file you need to edit to update the board.
//
//  When someone closes a deal:
//    1. Bump their `deals` number below.
//    2. Set their `lastDealAt` to today's date (used to break
//       ties — earlier date wins the tie, i.e. "first to get
//       there" ranks higher).
//    3. (Optional) Add a line to RECENT_DEALS so it shows in
//       the ticker. Newest entries go FIRST.
//    4. Commit + push. Vercel redeploys automatically.
//
//  When someone reaches GOAL (10), the site automatically
//  switches into winner-celebration mode and locks in 2nd and
//  3rd place from the standings at that moment.
// ============================================================

export const GOAL = 10

export const COMPETITION = {
  title: 'Race to Ten',
  subtitle: 'First to ten deals takes the bracelet',
  startedOn: 'July 1, 2026',
}

export type Competitor = {
  name: string
  deals: number
  /** ISO date of most recent deal, e.g. '2026-07-03' — breaks ties (earlier = ranked higher) */
  lastDealAt?: string
}

export const COMPETITORS: Competitor[] = [
  { name: 'Sophia R.', deals: 5, lastDealAt: '2026-07-04' },
  { name: 'Maria G.', deals: 4, lastDealAt: '2026-07-03' },
  { name: 'Jasmine T.', deals: 4, lastDealAt: '2026-07-04' },
  { name: 'Priya K.', deals: 3, lastDealAt: '2026-07-02' },
  { name: 'Alexis M.', deals: 3, lastDealAt: '2026-07-03' },
  { name: 'Brianna L.', deals: 3, lastDealAt: '2026-07-04' },
  { name: 'Camila V.', deals: 2, lastDealAt: '2026-07-02' },
  { name: 'Destiny W.', deals: 2, lastDealAt: '2026-07-03' },
  { name: 'Emily C.', deals: 2, lastDealAt: '2026-07-03' },
  { name: 'Fatima A.', deals: 2, lastDealAt: '2026-07-04' },
  { name: 'Gabriella P.', deals: 1, lastDealAt: '2026-07-01' },
  { name: 'Hannah S.', deals: 1, lastDealAt: '2026-07-02' },
  { name: 'Isabella D.', deals: 1, lastDealAt: '2026-07-02' },
  { name: 'Jade N.', deals: 1, lastDealAt: '2026-07-03' },
  { name: 'Kayla B.', deals: 1, lastDealAt: '2026-07-03' },
  { name: 'Leilani F.', deals: 1, lastDealAt: '2026-07-04' },
  { name: 'Monica H.', deals: 1, lastDealAt: '2026-07-04' },
  { name: 'Natalie J.', deals: 0 },
  { name: 'Olivia Q.', deals: 0 },
  { name: 'Rachel E.', deals: 0 },
  { name: 'Samantha O.', deals: 0 },
  { name: 'Tiffany U.', deals: 0 },
  { name: 'Vanessa I.', deals: 0 },
  { name: 'Zoe X.', deals: 0 },
]

/** Ticker feed — newest first. Keep each line short and fun. */
export const RECENT_DEALS: string[] = [
  'Sophia R. closed deal #5 — extends her lead!',
  'Jasmine T. lands deal #4 and ties Maria for 2nd',
  'Fatima A. is on the board with deal #2',
  'Brianna L. closes #3 before lunch',
  'Monica H. gets her first — welcome to the race!',
]
