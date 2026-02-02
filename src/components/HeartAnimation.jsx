import { useMemo } from 'react'

const GLYPHS = ['❤', '💗', '💖', '💞']

export default function HeartAnimation({ mode = 'idle' }) {
  const count = mode === 'celebrate' ? 18 : 9

  // Freeze the random layout between renders for a calmer animation.
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const size = 14 + Math.random() * 18
      const duration = (mode === 'celebrate' ? 6 : 10) + Math.random() * 6
      return {
        id: `${mode}-${index}`,
        glyph: GLYPHS[index % GLYPHS.length],
        left: `${Math.random() * 100}%`,
        size: `${size}px`,
        delay: `${Math.random() * 4}s`,
        duration: `${duration}s`,
        drift: `${(Math.random() * 60 - 30).toFixed(1)}px`,
      }
    })
  }, [count, mode])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            '--left': heart.left,
            '--size': heart.size,
            '--delay': heart.delay,
            '--duration': heart.duration,
            '--drift': heart.drift,
          }}
        >
          {heart.glyph}
        </span>
      ))}
    </div>
  )
}
