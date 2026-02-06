import { LOVE_GIF, PHOTO_ASSETS } from '../assets/media'
import PhotoCollage from './PhotoCollage'

const CELEBRATION_PHOTOS = PHOTO_ASSETS

export default function Celebration({ name }) {
  return (
    <section className="card celebration w-full text-center shadow-2xl">
      <p className="pill reveal" style={{ animationDelay: '0.05s' }}>
        Valentine accepted
      </p>
      <h2
        className="reveal mt-5 text-3xl font-bold text-berry sm:mt-6 sm:text-5xl"
        style={{ animationDelay: '0.12s' }}
      >
        YAYYY <span aria-hidden="true">💖</span>
      </h2>
      <p
        className="reveal mx-auto mt-4 max-w-sm text-base text-berry/90 sm:max-w-md sm:text-lg"
        style={{ animationDelay: '0.18s' }}
      >
        You just made me the happiest person alive,
        <span className="ml-2 font-script text-3xl text-rose">{name}</span>.
      </p>
      <p
        className="reveal mt-4 text-base text-berry/90 sm:text-lg"
        style={{ animationDelay: '0.24s' }}
      >
        Happy Valentine&apos;s Day <span aria-hidden="true">🌹</span>
      </p>
      <div
        className="reveal mx-auto mt-6 max-w-sm rounded-2xl border border-white/70 bg-white/80 p-4 text-sm text-berry/90 shadow-lg sm:max-w-md sm:p-6 sm:text-base"
        style={{ animationDelay: '0.3s' }}
      >
        <p>
          Every little moment with you feels like a tiny celebration. Thank you
          for being my calm, my chaos, and my favorite person all in one.
        </p>
        <p className="mt-3">
          I cannot wait to make more sweet memories together and keep choosing
          you, every single day.
        </p>
      </div>
      {CELEBRATION_PHOTOS.length > 0 && (
        <div className="reveal mt-6" style={{ animationDelay: '0.36s' }}>
          <PhotoCollage photos={CELEBRATION_PHOTOS} variant="celebration" />
        </div>
      )}
      {LOVE_GIF && (
        <img
          className="reveal mx-auto mt-6 w-48 rounded-3xl border border-white/70 shadow-lg sm:w-64"
          style={{ animationDelay: '0.42s' }}
          src={LOVE_GIF}
          alt="Playful I love you gif"
          loading="lazy"
        />
      )}
      <div
        className="reveal mt-6 flex items-center justify-center"
        style={{ animationDelay: '0.48s' }}
      >
        <span className="pill">Forever yours</span>
      </div>
    </section>
  )
}
