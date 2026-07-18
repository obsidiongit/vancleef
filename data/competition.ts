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
  { name: 'Aaron Sandefur', deals: 0 },
  { name: 'Abbie H.', deals: 0 },
  { name: 'Abdess Zarouali', deals: 0 },
  { name: 'Alexis Bizon', deals: 1, lastDealAt: '2026-07-17' },
  { name: 'Andy N.', deals: 0 },
  { name: 'Bella L.', deals: 0 },
  { name: 'Carolina Dominguez', deals: 0 },
  { name: 'Chaley Selsor', deals: 2, lastDealAt: '2026-07-17' },
  { name: 'Chrisantha Hudson', deals: 0 },
  { name: 'Elizabeth Ortega Cruz', deals: 1, lastDealAt: '2026-07-05' },
  { name: 'Emily Martinsen', deals: 0 },
  { name: 'Emily Tate', deals: 0 },
  { name: 'Griffith Hill', deals: 0 },
  { name: 'Janneke Macdonald', deals: 0 },
  { name: 'Johanna Rubin', deals: 0 },
  { name: 'Julia Golub', deals: 0 },
  { name: 'Kristen Barnes', deals: 0 },
  { name: 'Lexi Aguilar', deals: 2, lastDealAt: '2026-07-17' },
  { name: 'Loveda Muniz', deals: 0 },
  { name: 'Mackenzie Dragon', deals: 0 },
  { name: 'Maged Tamer', deals: 0 },
  { name: 'Marcie Mateo', deals: 0 },
  { name: 'Mary Wildman', deals: 0 },
  { name: 'Matthew Dean', deals: 0 },
  { name: 'Megan Newman', deals: 0 },
  { name: 'Mersida Vasija', deals: 0 },
  { name: 'Rahma Naveed', deals: 0 },
  { name: 'Rhiannon Oconnor', deals: 0 },
  { name: 'Russel Spence', deals: 1, lastDealAt: '2026-07-05' },
  { name: 'Sadie Pursell', deals: 0 },
  { name: 'Shelly Russo', deals: 0 },
  { name: 'Sierra Villareal', deals: 0 },
  { name: 'Spencer Stephens', deals: 0 },
  { name: 'Tiffany Klein', deals: 0 },
  { name: 'Tiffany Robydek', deals: 0 },
  { name: 'Zac Marshall', deals: 0 },
  { name: 'Zhedrick Johnson', deals: 0 },
]

/** Ticker feed — newest first. Keep each line short and fun. */
export const RECENT_DEALS: string[] = [
  'Chaley Selsor closes deal #2 — tied for the lead at two!',
  'Lexi Aguilar jumps to two deals — neck and neck at the top!',
  'Alexis Bizon gets on the board with deal #1!',
  'Elizabeth Ortega Cruz gets on the board — three-way tie at the top!',
  'Russel Spence joins the race with deal #1',
  'Chaley Selsor draws first blood — deal #1 and the early lead!',
]
