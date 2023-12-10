import { GameForm } from './form'
import { useGameLocale } from './state'
import { GameApp } from './game/GameApp'

export function App() {
  useGameLocale()

  return (
    <div className='md:w-[100svw] md:h-[100svh] md:sm:h-max md:max-h-[100svh] max-h-max flex flex-col md:flex-row p-0 md:p-0 bg-gray-800'>
      <GameApp />
      <div className='md:w-[400px] bg-gray-700 md:-order-1'>
        <GameForm />
      </div>
    </div>
  )
}

export default App
