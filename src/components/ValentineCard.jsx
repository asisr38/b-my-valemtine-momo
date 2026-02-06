import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PHOTO_ASSETS } from '../assets/media'
import NoButton from './NoButton'
import PhotoCollage from './PhotoCollage'
import {
  createDodgeFrameLock,
  getInitialNoButtonPosition,
  getRandomNoButtonPosition,
} from './noButtonLogic'
import YesButton from './YesButton'

const NO_LABELS = [
  'No 🙃',
  'Are you sure? 😳',
  'Try again 😌',
  'That is not an option 😘',
  'Nice try, Momo 💗',
]
const CARD_PHOTOS = PHOTO_ASSETS.slice(0, 4)

export default function ValentineCard({ name, onAccept }) {
  const [noIndex, setNoIndex] = useState(0)
  const [dodges, setDodges] = useState(0)
  const [noPos, setNoPos] = useState(null)
  const fieldRef = useRef(null)
  const noRef = useRef(null)
  const runDodgeRef = useRef(null)

  if (!runDodgeRef.current) {
    runDodgeRef.current = createDodgeFrameLock(window.requestAnimationFrame)
  }

  // Keep the "No" button in bounds while making it feel playful.
  const placeNoButton = useCallback((mode = 'random') => {
    if (!fieldRef.current || !noRef.current) return

    const fieldRect = fieldRef.current.getBoundingClientRect()
    const buttonRect = noRef.current.getBoundingClientRect()

    if (mode === 'initial') {
      setNoPos(getInitialNoButtonPosition(fieldRect, buttonRect))
      return
    }

    setNoPos(getRandomNoButtonPosition(fieldRect, buttonRect))
  }, [])

  const dodge = () => {
    runDodgeRef.current(
      () => {
        setDodges((value) => value + 1)
        setNoIndex((value) => (value + 1) % NO_LABELS.length)
      },
      () => {
        // Wait for the label update to render, then measure and place the button.
        placeNoButton('random')
      }
    )
  }

  useLayoutEffect(() => {
    placeNoButton('initial')
  }, [placeNoButton])

  useEffect(() => {
    const handleResize = () => placeNoButton('initial')
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [placeNoButton])

  const noStyle = noPos
    ? { left: `${noPos.x}px`, top: `${noPos.y}px` }
    : { left: '50%', top: '50%', opacity: 0, transform: 'translate(-50%, -50%)' }

  return (
    <section className="card float-slow w-full text-center shadow-2xl">
      <p className="pill reveal" style={{ animationDelay: '0.05s' }}>
        To my favorite person
      </p>
      <h1
        className="reveal mt-5 text-2xl font-bold text-berry sm:mt-6 sm:text-4xl lg:text-5xl"
        style={{ animationDelay: '0.12s' }}
      >
        <span className="block font-script text-3xl text-rose sm:text-5xl">
          {name},
        </span>
        Will you be my Valentine? <span aria-hidden="true">💖</span>
      </h1>
      <p
        className="reveal mx-auto mt-4 max-w-sm text-sm text-berry/80 sm:max-w-md sm:text-base"
        style={{ animationDelay: '0.2s' }}
      >
        I promise soft smiles, cozy hugs, and an unlimited supply of sweet treats.
      </p>
      {CARD_PHOTOS.length > 0 && (
        <div className="reveal mt-6 sm:mt-7" style={{ animationDelay: '0.28s' }}>
          <PhotoCollage photos={CARD_PHOTOS} variant="teaser" />
        </div>
      )}

      <div
        ref={fieldRef}
        className="relative mt-4 flex h-28 w-full items-center justify-center sm:mt-6 sm:h-32"
      >
        <div className="relative z-10">
          <YesButton onClick={onAccept} />
        </div>
        <NoButton
          ref={noRef}
          label={NO_LABELS[noIndex]}
          onDodge={dodge}
          style={noStyle}
        />
      </div>

      {dodges >= 4 && (
        <p className="reveal mt-4 text-xs text-berry/70" style={{ animationDelay: '0.1s' }}>
          Nice try, but fate already picked Yes.
        </p>
      )}
    </section>
  )
}
