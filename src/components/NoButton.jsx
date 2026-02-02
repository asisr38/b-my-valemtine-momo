import { forwardRef } from 'react'

const NoButton = forwardRef(function NoButton({ label, onDodge, style }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className="btn-base btn-no absolute select-none transition-all duration-200 hover:scale-95"
      style={style}
      tabIndex={-1}
      aria-disabled="true"
      onPointerEnter={onDodge}
      onPointerDown={onDodge}
      onFocus={onDodge}
      onClick={(event) => {
        event.preventDefault()
        onDodge()
      }}
      aria-label="No"
    >
      {label}
    </button>
  )
})

export default NoButton
