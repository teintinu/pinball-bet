import { useEffect, useRef, useState } from 'react'
import { gameBet, renderGame } from "."
import { useGameState } from '../state'
import { gamePayouts } from './board'
import { PayoutWidget } from './Payout'
import { LastPayouts } from './LastPopouts'

export function GameApp() {
    const { mode, rows, risk } = useGameState()
    const [payouts, setPayouts] = useState(gamePayouts)
    const gameBoardRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (mode === 'auto') {
            const tm = setInterval(() => gameBet(false), 700)
            return () => { clearInterval(tm) }
        }
    }, [mode])
    useEffect(() => {
        renderGame(gameBoardRef.current!)
        setPayouts({ ...gamePayouts })
        gameBoardRef.current!.addEventListener('resize', () => {
            renderGame(gameBoardRef.current!)
            setPayouts({ ...gamePayouts })
        })
    }, [rows, risk])
    return <div className='bg-gray-900 flex-1 h-full w-full flex flex-col justify-stretch '>
        <div className='flex justify-stretch h-full w-full'>
            <div ref={gameBoardRef} className='flex-1' />
            <LastPayouts />
        </div>
        <div className='w-full h-20 relative'>
            {payouts.payouts.map((payout) => (<PayoutWidget key={payout.idx} payout={payout} />))}
        </div>
    </div>
}