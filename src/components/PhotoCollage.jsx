const LAYOUTS = {
  teaser: [
    { left: 18, top: 52, width: 28, rotate: -10 },
    { left: 37, top: 28, width: 24, rotate: -4 },
    { left: 58, top: 58, width: 28, rotate: 7 },
    { left: 79, top: 35, width: 24, rotate: 12 },
  ],
  celebration: [
    { left: 11, top: 52, width: 20, rotate: -11 },
    { left: 25, top: 30, width: 19, rotate: -6 },
    { left: 41, top: 57, width: 22, rotate: 5 },
    { left: 58, top: 30, width: 20, rotate: 9 },
    { left: 74, top: 58, width: 21, rotate: -3 },
    { left: 89, top: 35, width: 19, rotate: 10 },
  ],
}

export default function PhotoCollage({ photos, variant = 'teaser' }) {
  const slots = LAYOUTS[variant] ?? LAYOUTS.teaser
  const framedPhotos = photos.slice(0, slots.length)

  if (framedPhotos.length === 0) return null

  return (
    <div className={`photo-collage photo-collage--${variant}`}>
      {framedPhotos.map((photo, index) => {
        const slot = slots[index]
        return (
          <figure
            key={photo.id}
            className="photo-frame"
            style={{
              '--frame-left': `${slot.left}%`,
              '--frame-top': `${slot.top}%`,
              '--frame-width': `${slot.width}%`,
              '--frame-rotate': `${slot.rotate}deg`,
              '--frame-float-delay': `${(index * 0.42).toFixed(2)}s`,
            }}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </figure>
        )
      })}
    </div>
  )
}
