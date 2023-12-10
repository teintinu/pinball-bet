import { GameForm } from './form'
import { useGameLocale } from './state'
import { GameApp } from './game/GameApp'

export function App() {
  useGameLocale()

  return (
    <div className='w-[100svw] h-[100svh] max-h-[100svh] flex p-10 bg-gray-800'>
      <div className='w-[400px] bg-gray-700'>
        <GameForm />
      </div>
      <GameApp />
    </div>
  )
}

export default App
