import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

/**
 * Opens a screen of the CURRENT app: the provided build in public/current-app/ (copied unchanged
 * from reference/current-hunt-demo). Only the main hunt screen is redesigned; everything a card
 * leads to is the existing app, so we reuse it as-is instead of rebuilding it.
 *
 * `screen` is the label of the provided demo's own toolbar button to press:
 *   'Check-in screen' → location screen with the Check In button
 *   'Location screen' → the location's challenge list
 */
export type CurrentAppScreen = 'Check-in screen' | 'Location screen'

export default function CurrentAppSheet({ screen, onClose }: { screen: CurrentAppScreen; onClose: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null)
  // The provided build isn't in the public repo (it's Let's Roam's app); check it has been added locally.
  const [available, setAvailable] = useState<boolean | null>(null)
  useEffect(() => {
    fetch('/current-app/hunt-data.js')
      .then((r) => r.text())
      .then((t) => setAvailable(t.includes('HUNT_DATA')))
      .catch(() => setAvailable(false))
  }, [])

  const onLoad = () => {
    const doc = frame.current?.contentDocument
    if (!doc) return
    // Hide the provided demo's own toolbar/notes so only the app screen shows.
    const style = doc.createElement('style')
    style.textContent =
      '.demo-toolbar,.demo-note{display:none!important}.app-frame{height:100dvh!important;margin:0!important;box-shadow:none!important}'
    doc.head.appendChild(style)
    // Its app renders after load; press the toolbar button for the requested screen once it exists.
    let tries = 0
    const press = () => {
      const btn = [...doc.querySelectorAll('button')].find((b) => b.textContent?.trim() === screen)
      if (btn) btn.click()
      else if (tries++ < 50) setTimeout(press, 100)
    }
    press()
  }

  return (
    <div className="sheet-layer">
      <div className="sheet-backdrop" onClick={onClose} />
      <section className="current-app" role="dialog" aria-modal="true" aria-label="Current app screen">
        <header className="current-app-bar">
          <span>Current app screen (not redesigned)</span>
          <button className="icon-btn" onClick={onClose} aria-label="Back to the hunt">
            <Icon name="close" />
          </button>
        </header>
        {available && <iframe ref={frame} src="/current-app/index.html" title="Current app screen" onLoad={onLoad} />}
        {available === false && (
          <div className="current-app-missing">
            <p>
              <b>This opens the current Let's Roam app screen here.</b>
            </p>
            <p>
              The provided app build isn't included in the public repo. Copy the <code>Lets-Roam-Hunt-Demo</code> folder
              you received to <code>redesign/public/current-app/</code> and reload.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
