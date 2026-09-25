import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Challenge, Hunt, Task } from '../data/hunt'

export type ChallengeStatus = 'idle' | 'active' | 'done' | 'expired'
export type TaskOutcome = 'correct' | 'second-try' | 'revealed' | 'skipped' | 'photo'
export type TaskState = 'locked' | 'open' | 'done'

export interface TaskResult {
  points: number
  outcome: TaskOutcome
}

interface SavedState {
  huntStartedAt: number
  /** Demo "skip ahead" offset added to the real clock. */
  offsetMs: number
  started: Record<string, number>
  finished: Record<string, number>
  results: Record<string, TaskResult>
  speedBonus: Record<string, number>
  /** Points earned for checking in at a location (completion + distance accuracy). */
  checkIn: Record<string, number>
}

const STORAGE_KEY = 'lr-hunt-redesign-v2'
const MIN = 60_000

/** Check-in scoring as shown on the original "Awesome Job!" screen. GPS is simulated, so distance is fixed. */
export const CHECK_IN = { completion: 500, distance: 392, distanceMax: 400 }

/** Most points a challenge can give: tasks + speed bonus + a perfect check-in. */
export const maxPointsOf = (c: Challenge) =>
  c.tasks.reduce((s, t) => s + t.points, 0) + c.speedBonus + (c.anywhere ? 0 : CHECK_IN.completion + CHECK_IN.distanceMax)

function freshState(): SavedState {
  return { huntStartedAt: Date.now(), offsetMs: 0, started: {}, finished: {}, results: {}, speedBonus: {}, checkIn: {} }
}

function load(): SavedState {
  // Opening the app with ?reset starts a fresh hunt (handy for demos and recordings).
  const url = new URL(window.location.href)
  if (url.searchParams.has('reset')) {
    url.searchParams.delete('reset')
    window.history.replaceState(null, '', url)
    return freshState()
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...freshState(), ...JSON.parse(raw) }
  } catch {
    /* storage unavailable — start fresh */
  }
  return freshState()
}

export function useHunt(hunt: Hunt) {
  const [s, setS] = useState<SavedState>(load)
  const [clock, setClock] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setClock(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    } catch {
      /* ignore */
    }
  }, [s])

  const now = clock + s.offsetMs
  const huntEndsAt = s.huntStartedAt + hunt.durationMin * MIN
  const timeLeftMs = Math.max(0, huntEndsAt - now)
  const huntOver = timeLeftMs === 0

  const statusOf = useCallback(
    (c: Challenge): ChallengeStatus => {
      if (s.finished[c.id]) return 'done'
      const started = s.started[c.id]
      // Only a challenge the team actually started can run out of time; untouched ones stay neutral.
      if (!started) return 'idle'
      if (huntOver) return 'expired'
      if (!c.anywhere && now > started + c.windowMin * MIN) return 'expired'
      return 'active'
    },
    [s.finished, s.started, huntOver, now],
  )

  const taskStateOf = useCallback(
    (c: Challenge, index: number): TaskState => {
      // As in the original app: after check-in every task is available, in any order.
      if (s.results[c.tasks[index].id]) return 'done'
      if (huntOver || !s.started[c.id]) return 'locked'
      return 'open'
    },
    [s.results, s.started, huntOver],
  )

  /** Time left in a challenge's speed-bonus window (ms), or null if not applicable. */
  const windowLeftOf = useCallback(
    (c: Challenge) => {
      const started = s.started[c.id]
      if (!started || c.anywhere || s.finished[c.id]) return null
      return Math.max(0, started + c.windowMin * MIN - now)
    },
    [s.started, s.finished, now],
  )

  const pointsOf = useCallback(
    (c: Challenge) =>
      c.tasks.reduce((sum, t) => sum + (s.results[t.id]?.points ?? 0), 0) +
      (s.speedBonus[c.id] ?? 0) +
      (s.checkIn[c.id] ?? 0),
    [s.results, s.speedBonus, s.checkIn],
  )

  const totalPoints = useMemo(
    () => hunt.challenges.reduce((sum, c) => sum + pointsOf(c), 0),
    [hunt.challenges, pointsOf],
  )

  const allTasks = hunt.challenges.flatMap((c) => c.tasks)
  const tasksDone = allTasks.filter((t) => s.results[t.id]).length
  const progressPct = allTasks.length ? Math.round((tasksDone / allTasks.length) * 100) : 0

  const locations = hunt.challenges.filter((c) => !c.anywhere)
  const locationsDone = locations.filter((c) => s.finished[c.id]).length

  /** The challenge the header shows: the most recently started one that isn't finished (none until one is chosen). */
  const current = useMemo(
    () =>
      hunt.challenges
        .filter((c) => s.started[c.id] && !s.finished[c.id])
        .sort((a, b) => s.started[b.id] - s.started[a.id])[0] ?? null,
    [hunt.challenges, s.started, s.finished],
  )

  /** Check in at a location (or open the bonus challenge). Starts its speed-bonus window. */
  const start = (c: Challenge) => {
    if (huntOver || s.started[c.id]) return
    setS((p) => ({
      ...p,
      started: { ...p.started, [c.id]: now },
      checkIn: c.anywhere ? p.checkIn : { ...p.checkIn, [c.id]: CHECK_IN.completion + CHECK_IN.distance },
    }))
  }

  const completeTask = (c: Challenge, t: Task, result: TaskResult) => {
    setS((p) => {
      const results = { ...p.results, [t.id]: result }
      const allDone = c.tasks.every((x) => results[x.id])
      if (!allDone) return { ...p, results }
      const started = p.started[c.id] ?? now
      const inWindow = !c.anywhere && now <= started + c.windowMin * MIN
      return {
        ...p,
        results,
        finished: { ...p.finished, [c.id]: now },
        speedBonus: { ...p.speedBonus, [c.id]: inWindow ? c.speedBonus : 0 },
      }
    })
  }

  // Demo controls
  const skipAhead = (min: number) => setS((p) => ({ ...p, offsetMs: p.offsetMs + min * MIN }))
  const endHunt = () => setS((p) => ({ ...p, offsetMs: p.offsetMs + timeLeftMs }))
  const reset = () => setS(freshState())

  return {
    now,
    timeLeftMs,
    huntOver,
    totalPoints,
    locationsDone,
    locationsTotal: locations.length,
    progressPct,
    current,
    results: s.results,
    speedBonus: s.speedBonus,
    checkIn: s.checkIn,
    startedAt: s.started,
    statusOf,
    taskStateOf,
    windowLeftOf,
    pointsOf,
    start,
    completeTask,
    skipAhead,
    endHunt,
    reset,
  }
}

export type HuntApi = ReturnType<typeof useHunt>

export function formatClock(ms: number) {
  const total = Math.ceil(ms / 1000)
  const m = Math.floor(total / 60)
  const sec = total % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}
