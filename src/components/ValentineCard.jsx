import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import NoButton from './NoButton'
import YesButton from './YesButton'

const NO_LABELS = [
  'No 🙃',
  'Are you sure? 😳',
  'Try again 😌',
  'That is not an option 😘',
  'Nice try, Momo 💗',
]

export default function ValentineCard({ name, onAccept }) {
  const [noIndex, setNoIndex] = useState(0)
  const [dodges, setDodges] = useState(0)
  const [noPos, setNoPos] = useState(null)
  const fieldRef = useRef(null)
  const noRef = useRef(null)

  // Keep the "No" button in bounds while making it feel playful.
  const placeNoButton = (mode = 'random') => {
    if (!fieldRef.current || !noRef.current) return

    const fieldRect = fieldRef.current.getBoundingClientRect()
    const buttonRect = noRef.current.getBoundingClientRect()
    const padding = 10

    if (mode === 'initial') {
      setNoPos({
        x: fieldRect.width - buttonRect.width - padding,
        y: (fieldRect.height - buttonRect.height) / 2,
      })
      return
    }

    const maxX = Math.max(0, fieldRect.width - buttonRect.width - padding * 2)
    const maxY = Math.max(0, fieldRect.height - buttonRect.height - padding * 2)
    const x = padding + Math.random() * maxX
    const y = padding + Math.random() * maxY

    setNoPos({ x, y })
  }

  const dodge = () => {
    setDodges((value) => value + 1)
    setNoIndex((value) => (value + 1) % NO_LABELS.length)
    placeNoButton('random')
  }

  useLayoutEffect(() => {
    placeNoButton('initial')
  }, [])

  useEffect(() => {
    const handleResize = () => placeNoButton('initial')
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const noStyle = noPos
    ? { left: `${noPos.x}px`, top: `${noPos.y}px` }
    : { left: '50%', top: '50%', opacity: 0, transform: 'translate(-50%, -50%)' }

  return (
    <section className="card float-slow w-full text-center shadow-2xl">
      <p className="pill reveal" style={{ animationDelay: '0.05s' }}>
        To my favorite person
      </p>
      <h1
        className="reveal mt-6 text-3xl font-bold text-berry sm:text-4xl lg:text-5xl"
        style={{ animationDelay: '0.12s' }}
      >
        <span className="block font-script text-4xl text-rose sm:text-5xl">
          {name},
        </span>
        Will you be my Valentine? <span aria-hidden="true">💖</span>
      </h1>
      <p
        className="reveal mx-auto mt-4 max-w-md text-sm text-berry/80 sm:text-base"
        style={{ animationDelay: '0.2s' }}
      >
        I promise soft smiles, cozy hugs, and an unlimited supply of sweet treats.
      </p>

      <div
        ref={fieldRef}
        className="relative mt-8 flex h-24 w-full items-center justify-center"
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
