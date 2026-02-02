export default function YesButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-base btn-yes pulse-glow hover:scale-105 active:scale-100"
    >
      Yes
      <span aria-hidden="true">💕</span>
    </button>
  )
}
