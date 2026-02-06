export const NO_BUTTON_PADDING = 10

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const getLimits = (fieldRect, buttonRect, padding = NO_BUTTON_PADDING) => {
  const minX = padding
  const minY = padding
  const maxX = Math.max(minX, fieldRect.width - buttonRect.width - padding)
  const maxY = Math.max(minY, fieldRect.height - buttonRect.height - padding)

  return { minX, minY, maxX, maxY }
}

export const getInitialNoButtonPosition = (fieldRect, buttonRect, padding = NO_BUTTON_PADDING) => {
  const { minX, minY, maxX, maxY } = getLimits(fieldRect, buttonRect, padding)

  return {
    x: maxX,
    y: clamp((fieldRect.height - buttonRect.height) / 2, minY, maxY),
  }
}

export const getRandomNoButtonPosition = (
  fieldRect,
  buttonRect,
  random = Math.random,
  padding = NO_BUTTON_PADDING
) => {
  const { minX, minY, maxX, maxY } = getLimits(fieldRect, buttonRect, padding)

  return {
    x: minX + random() * (maxX - minX),
    y: minY + random() * (maxY - minY),
  }
}

export const createDodgeFrameLock = (requestFrame) => {
  let locked = false

  return (beforeFrame, afterFrame) => {
    if (locked) return false
    locked = true
    beforeFrame()
    requestFrame(() => {
      afterFrame()
      locked = false
    })
    return true
  }
}
