import { useId, useState } from 'react'
import type { Challenge, TaskType } from '../data/hunt'
import { formatClock, maxPointsOf, type ChallengeStatus, type HuntApi } from '../state/useHunt'
import Icon, { type IconName } from './Icon'

interface Props {
  challenge: Challenge
  api: HuntApi
  /** Opens the location screen (or its challenge list once checked in). */
  onOpen: (c: Challenge) => void
  onOpenTask: (c: Challenge, index: number) => void
}

const TYPE_ICON: Record<TaskType, IconName> = { trivia: 'question', text: 'pencil', photo: 'camera' }

const TAG: Partial<Record<ChallengeStatus, { icon: IconName; label: string }>> = {
  active: { icon: 'clock', label: 'In progress' },
  done: { icon: 'check', label: 'Done' },
  expired: { icon: 'alert', label: "Time's up" },
}

/**
 * Compact challenge card for the main screen. The whole card opens the location screen;
 * the task dots show how much is left, and a started challenge shows its next task as a shortcut.
 */
export default function ChallengeRow({ challenge: c, api, onOpen, onOpenTask }: Props) {
  const status = api.statusOf(c)
  const tag = TAG[status]
  const doneCount = c.tasks.filter((t) => api.results[t.id]).length
  const maxPoints = maxPointsOf(c)
  const windowLeft = api.windowLeftOf(c)
  const nextIndex = c.tasks.findIndex((_, i) => api.taskStateOf(c, i) === 'open')
  const inProgress = !api.huntOver && (status === 'active' || status === 'expired')
  const [showTasks, setShowTasks] = useState(false)
  const listId = useId()

  return (
    <article className={`row ch--${status}${c.anywhere ? ' ch--anywhere' : ''}`}>
      {/* Stretched button: the whole card is the tap target; inner buttons sit above it. */}
      <button className="row-hit" onClick={() => onOpen(c)} aria-label={`Open ${c.name}`} />

      <div className="row-main">
        {c.photo ? (
          <img className="row-photo" src={c.photo} alt="" />
        ) : (
          <div className="row-photo ch-photo--bonus">
            <Icon name="sparkle" size={26} />
          </div>
        )}
        <div className="row-body">
          <h3 className="row-name">{c.name}</h3>
          <p className="ch-meta">
            {c.anywhere ? (
              'Do these on the way'
            ) : (
              <>
                <Icon name="walk" size={14} /> {c.distance} · {c.walk}
              </>
            )}
          </p>
          <p className="row-points">
            {status === 'done' ? (
              <>
                <b>{api.pointsOf(c).toLocaleString()}</b> pts earned
              </>
            ) : (
              <>
                <b>{maxPoints.toLocaleString()}</b> pts
              </>
            )}
          </p>
          {/* Task count + one dot per task: tap to see each task and its status. */}
          <button
            className="dots-btn row-over"
            aria-expanded={showTasks}
            aria-controls={listId}
            aria-label={`${doneCount} of ${c.tasks.length} tasks done. ${showTasks ? 'Hide' : 'Show'} tasks`}
            onClick={() => setShowTasks((v) => !v)}
          >
            <span className="row-count">{c.tasks.length} tasks</span>
            <span className="dots">
              {c.tasks.map((t) => (
                <span key={t.id} className={`dot${api.results[t.id] ? ' dot--done' : ''}`} />
              ))}
            </span>
            <Icon name="chevronDown" size={14} className={showTasks ? 'rot' : undefined} />
          </button>
        </div>
        <Icon name="chevronRight" size={22} className="row-chevron" />
      </div>

      {showTasks && (
        <ul className="row-tasks" id={listId}>
          {c.tasks.map((t, i) => {
            const state = api.taskStateOf(c, i)
            const res = api.results[t.id]
            return (
              <li key={t.id} className={`row-task row-task--${state}`}>
                <Icon name={TYPE_ICON[t.type]} size={16} />
                <span className="row-task-title">{t.title}</span>
                <span className="row-task-status">
                  {state === 'done' ? (
                    <>
                      <Icon name="check" size={14} /> +{res.points}
                    </>
                  ) : state === 'locked' ? (
                    <>
                      <Icon name="lock" size={13} /> {t.points} pts
                    </>
                  ) : (
                    `${t.points} pts`
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )}

      {tag && (
        <span className={`tag tag--${status} row-tag`}>
          <Icon name={tag.icon} size={13} />
          {tag.label}
          {status !== 'done' && ` ${doneCount}/${c.tasks.length}`}
        </span>
      )}

      {inProgress && (
        <div className="row-next">
          {windowLeft !== null && (
            <p className={`speed ${windowLeft > 0 ? 'speed--on' : 'speed--missed'}`}>
              <Icon name="bolt" size={14} />
              {windowLeft > 0 ? (
                <span>
                  Speed bonus <b>+{c.speedBonus}</b> · <b>{formatClock(windowLeft)}</b> left
                </span>
              ) : (
                <span>Speed bonus missed. Still finishable.</span>
              )}
            </p>
          )}
          {nextIndex >= 0 && (
            <button className="next-task row-over" onClick={() => onOpenTask(c, nextIndex)}>
              <span className="next-task-text">
                <span className="next-task-label">Next task</span>
                <span className="next-task-title">{c.tasks[nextIndex].title}</span>
              </span>
              <span className="next-task-pts">{c.tasks[nextIndex].points} pts</span>
              <Icon name="chevronRight" size={18} />
            </button>
          )}
        </div>
      )}
    </article>
  )
}
