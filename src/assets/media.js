const MEDIA_FILES = import.meta.glob('./*', { eager: true, import: 'default' })

const PHOTO_EXTENSIONS = /\.(avif|jpe?g|png|webp)$/i
const GIF_EXTENSION = /\.gif$/i

const sortedMedia = Object.entries(MEDIA_FILES).sort(([left], [right]) =>
  left.localeCompare(right)
)

export const PHOTO_ASSETS = sortedMedia
  .filter(([path]) => PHOTO_EXTENSIONS.test(path))
  .map(([path, src], index) => ({
    id: path,
    src,
    alt: `Sweet memory ${index + 1}`,
  }))

export const LOVE_GIF = sortedMedia.find(([path]) => GIF_EXTENSION.test(path))?.[1] ?? null
