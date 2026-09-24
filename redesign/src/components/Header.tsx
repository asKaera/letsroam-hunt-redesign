import type { Hunt } from '../data/hunt'
import { formatClock, type HuntApi } from '../state/useHunt'
import Icon from './Icon'

interface Props {
  hunt: Hunt
  api: HuntApi
  onMap: () => void
}

const TEN_MIN = 10 * 60_000

/**
 * Compact header:
 *   1. two columns: avatar with progress ring + % (top-aligned) | team name / points / timer, right-aligned
 *   2. current challenge · Map (only once a challenge has been started)
 */
export default function Header({ hunt, api, onMap }: Props) {
  const { timeLeftMs, huntOver, totalPoints, progressPct, current } = api
  const timerState = huntOver ? 'over' : timeLeftMs <= TEN_MIN ? 'low' : 'ok'

  // Progress ring geometry: sized to the height of the 3 rows beside it.
  const size = 104
  const r = (size - 5) / 2
  const circ = 2 * Math.PI * r

  return (
    <header className="hdr">
      <div className="hdr-top">
        {/* Column 1: avatar with progress ring, aligned to the top */}
        <div className="hdr-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPct} aria-label="Hunt progress">
          <div className="avatar-ring">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
              <circle cx={size / 2} cy={size / 2} r={r} className="avatar-ring-track" />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                className="avatar-ring-fill"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - progressPct / 100)}
              />
            </svg>
            <img className="hdr-avatar" src={hunt.teamPhoto} alt="" />
          </div>
          <span className="hdr-pct">{progressPct}%</span>
        </div>

        {/* Column 2 (right-aligned): team name / points / timer */}
        <div className="hdr-info">
          <h1 className="hdr-title">{hunt.teamName}</h1>
          <div className="points" aria-label={`${totalPoints} points`}>
            <Icon name="bolt" size={20} />
            <b>{totalPoints.toLocaleString()}</b>
            <span>pts</span>
          </div>
          <div className={`timer timer--${timerState}`} role="timer" aria-label="Hunt time left">
            <Icon name="clock" size={16} />
            {huntOver ? "Time's up" : <span><b>{formatClock(timeLeftMs)}</b> left</span>}
          </div>
        </div>
      </div>

      {current && !huntOver && (
        <div className="hdr-row hdr-row--current">
          <div className="hdr-current">
            <span className="hdr-current-label">Current challenge</span>
            <span className="hdr-current-name">{current.name}</span>
          </div>
          <button className="map-btn" onClick={onMap}>
            <Icon name="map" size={18} />
            Map
          </button>
        </div>
      )}
    </header>
  )
}
