import type { Challenge, Hunt } from '../data/hunt'
import type { ChallengeStatus, HuntApi } from '../state/useHunt'
import Sheet from './Sheet'

export function ScoringSheet({ onClose }: { onClose: () => void }) {
  return (
    <Sheet title="How scoring works" onClose={onClose}>
      <ol className="rules">
        <li>
          <span className="rule-num">1</span>
          <div>
            <b>Check in at each location.</b> Tap a challenge, walk there, then tap <i>Check In</i>. Up to <b>900 pts</b> for
            checking in close to the spot.
          </div>
        </li>
        <li>
          <span className="rule-num">2</span>
          <div>
            <b>Solve its tasks.</b> Trivia, riddles and photos, in any order.
          </div>
        </li>
        <li>
          <span className="rule-num">3</span>
          <div>
            <b>Finish within 15 minutes for a speed bonus.</b> Every location is worth <b>+500 pts</b> if all its tasks
            are done in time. After that the card turns orange, but you can still finish it.
          </div>
        </li>
        <li>
          <span className="rule-num">4</span>
          <div>
            <b>Bonus tasks work anywhere.</b> Answer them while you walk between locations.
          </div>
        </li>
      </ol>
      <table className="score-table">
        <tbody>
          <tr>
            <td>Correct answer</td>
            <td>Full points</td>
          </tr>
          <tr>
            <td>Photo submitted</td>
            <td>Full points</td>
          </tr>
          <tr>
            <td>Wrong answer</td>
            <td>0 pts</td>
          </tr>
        </tbody>
      </table>
      <div className="legend">
        <p className="legend-title">Card colors</p>
        {(
          [
            ['idle', 'Not started'],
            ['active', 'In progress'],
            ['done', 'Done'],
            ['expired', "Time's up, not finished"],
          ] as [ChallengeStatus, string][]
        ).map(([k, label]) => (
          <span key={k} className={`legend-item legend-item--${k}`}>
            {label}
          </span>
        ))}
      </div>
    </Sheet>
  )
}

/* ---------- Map ---------- */

/** The team's position on the illustrative map (no live GPS in the demo). */
const YOU = { x: 300, y: 180 }

const STATUS_COLOR: Record<ChallengeStatus, string> = {
  idle: '#8D8D94',
  active: '#3F8DAA',
  done: '#5E8F2A',
  expired: '#E87722',
}

export function MapSheet({ hunt, api, onClose }: { hunt: Hunt; api: HuntApi; onClose: () => void }) {
  const locs = hunt.challenges.filter((c) => !c.anywhere)
  const lats = locs.map((c) => c.lat)
  const lngs = locs.map((c) => c.lng)
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)]
  const pos = (c: Challenge) => ({
    x: 60 + ((c.lng - minLng) / (maxLng - minLng || 1)) * 220,
    y: 40 + ((maxLat - c.lat) / (maxLat - minLat || 1)) * 120,
  })

  return (
    <Sheet title="Map" onClose={onClose}>
      <svg className="map" viewBox="0 0 340 200" role="img" aria-label="Route map of the hunt locations">
        <rect width="340" height="200" fill="#EEF1EA" />
        <path d="M0 0 H70 L20 200 H0 Z" fill="#CFE3EE" />
        <text x="10" y="120" className="map-water" transform="rotate(-72 10 120)">
          Elliott Bay
        </text>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`a${i}`} x1={40 + i * 50} y1="0" x2={-10 + i * 50} y2="200" stroke="#fff" strokeWidth="6" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`b${i}`} x1="0" y1={10 + i * 45} x2="340" y2={30 + i * 45} stroke="#fff" strokeWidth="4" />
        ))}
        <polyline
          points={locs.map((c) => `${pos(c).x},${pos(c).y}`).join(' ')}
          fill="none"
          stroke="#E87722"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <g>
          <circle cx={YOU.x} cy={YOU.y} r="10" fill="#53A6C4" opacity=".25" />
          <circle cx={YOU.x} cy={YOU.y} r="5" fill="#53A6C4" stroke="#fff" strokeWidth="2" />
          <text x={YOU.x - 14} y={YOU.y - 12} className="map-you">
            You
          </text>
        </g>
        {locs.map((c, i) => {
          const p = pos(c)
          return (
            <g key={c.id}>
              <circle cx={p.x} cy={p.y} r="13" fill={STATUS_COLOR[api.statusOf(c)]} stroke="#fff" strokeWidth="3" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" className="map-num">
                {i + 1}
              </text>
            </g>
          )
        })}
      </svg>
      <ul className="map-list">
        {locs.map((c, i) => (
          <li key={c.id}>
            <span className="map-list-num" style={{ background: STATUS_COLOR[api.statusOf(c)] }}>
              {i + 1}
            </span>
            <span className="map-list-body">
              <b>{c.name}</b>
              <span>
                {c.distance} · {c.walk}
              </span>
            </span>
            <a
              className="btn btn--ghost btn--sm"
              href={`https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}&travelmode=walking`}
              target="_blank"
              rel="noreferrer"
            >
              Directions
            </a>
          </li>
        ))}
      </ul>
    </Sheet>
  )
}
