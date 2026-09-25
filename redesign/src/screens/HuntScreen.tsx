import { useState } from 'react'
import ChallengeRow from '../components/ChallengeRow'
import CurrentAppSheet, { type CurrentAppScreen } from '../components/CurrentAppSheet'
import Header from '../components/Header'
import Icon from '../components/Icon'
import { MapSheet, ScoringSheet } from '../components/InfoSheets'
import { hunt, type Challenge } from '../data/hunt'
import { useHunt, type ChallengeStatus } from '../state/useHunt'
import { asset } from '../asset'

/**
 * The redesigned main hunt screen. What a card opens (location, check-in, challenges) is the
 * current app, shown from the provided build (see CurrentAppSheet), not rebuilt.
 */
type Overlay = { kind: 'current'; screen: CurrentAppScreen } | { kind: 'map' } | { kind: 'scoring' } | null

/** List order: in progress first (fast access), then not started, then done. */
const RANK: Record<ChallengeStatus, number> = { active: 0, expired: 0, idle: 1, done: 2 }

export default function HuntScreen() {
  const api = useHunt(hunt)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const close = () => setOverlay(null)

  /** Card tap → the current app's location screen; once started, its challenge list. */
  const openChallenge = (c: Challenge) => {
    const started = !!api.startedAt[c.id]
    // The demo can't see check-ins made inside the provided build, so opening a challenge starts it here.
    api.start(c)
    setOverlay({ kind: 'current', screen: started || c.anywhere ? 'Location screen' : 'Check-in screen' })
  }

  /** Demo control: stands in for solving a task in the current app's screens. */
  const solveNextTask = () => {
    const c = api.current
    if (!c) return
    const i = c.tasks.findIndex((_, k) => api.taskStateOf(c, k) === 'open')
    if (i >= 0) api.completeTask(c, c.tasks[i], { points: c.tasks[i].points, outcome: 'correct' })
  }

  const sorted = [...hunt.challenges].sort((a, b) => RANK[api.statusOf(a)] - RANK[api.statusOf(b)])

  return (
    <div className="app">
      <Header hunt={hunt} api={api} onMap={() => setOverlay({ kind: 'map' })} />

      <main className="content">
        {api.huntOver ? (
          <div className="banner banner--over" role="status">
            <img src={asset('/assets/mascots/star.png')} alt="" />
            <div>
              <b>Time's up! Final score {api.totalPoints.toLocaleString()} pts</b>
              <span>
                You finished {api.locationsDone} of {api.locationsTotal} locations. Great hunting!
              </span>
            </div>
          </div>
        ) : (
          <div className="howto">
            <div className="howto-head">
              <h2 className="howto-title">How to play</h2>
              <button className="howto-info" onClick={() => setOverlay({ kind: 'scoring' })} aria-label="How scoring works">
                <Icon name="info" size={18} />
                Scoring
              </button>
            </div>
            <p>Tap a challenge, check in when you arrive, then solve its tasks. Bonus tasks work anywhere.</p>
          </div>
        )}

        <div className="section-head">
          <h2 className="section-title">Challenges</h2>
          {/* Header hides its Map button until a challenge is chosen, so keep the map reachable here. */}
          {!api.current && (
            <button className="map-btn map-btn--light" onClick={() => setOverlay({ kind: 'map' })}>
              <Icon name="map" size={18} />
              Map
            </button>
          )}
        </div>
        <div className="ch-list">
          {sorted.map((c) => (
            <ChallengeRow
              key={c.id}
              challenge={c}
              api={api}
              onOpen={openChallenge}
              onOpenTask={() => setOverlay({ kind: 'current', screen: 'Location screen' })}
            />
          ))}
        </div>

        <section className="demo" aria-label="Demo controls">
          <p className="demo-label">Demo controls (for reviewers, not part of the design)</p>
          <div className="demo-btns">
            <button onClick={solveNextTask} disabled={!api.current}>
              Solve task
            </button>
            <button onClick={() => api.skipAhead(15)}>+15 min</button>
            <button onClick={api.endHunt}>End hunt</button>
            <button onClick={api.reset}>Reset</button>
          </div>
        </section>
      </main>

      {overlay?.kind === 'current' && <CurrentAppSheet screen={overlay.screen} onClose={close} />}
      {overlay?.kind === 'map' && <MapSheet hunt={hunt} api={api} onClose={close} />}
      {overlay?.kind === 'scoring' && <ScoringSheet onClose={close} />}
    </div>
  )
}
