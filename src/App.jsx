import { useState } from 'react'
import Celebration from './components/Celebration'
import HeartAnimation from './components/HeartAnimation'
import ValentineCard from './components/ValentineCard'

const NAME = 'Mosaic Shrestha'

export default function App() {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="relative min-h-[100svh] overflow-hidden px-4 py-8 sm:min-h-screen sm:px-8 sm:py-16">
      <HeartAnimation mode={accepted ? 'celebrate' : 'idle'} />
      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center">
        {!accepted ? (
          <ValentineCard name={NAME} onAccept={() => setAccepted(true)} />
        ) : (
          <Celebration name={NAME} />
        )}
      </main>
    </div>
  )
}
