import { useEffect, useRef, useState } from 'react'
import { gameBet, renderGame } from "."
import { useGameState } from '../state'
import { gamePayouts } from './board'
import { PayoutWidget } from './Payout'
import { LastPayouts } from './LastPopouts'

export function GameApp() {
    const { mode, rows, risk } = useGameState()
    const [appWidth, setAppWidth] = useState(1)
    const [appHeight, setAppHeight] = useState(1)
    const [payouts, setPayouts] = useState(gamePayouts)
    const gameBoardRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        function handleResize() {
            setAppWidth(gameBoardRef.current?.clientWidth || 1)
            setAppHeight(gameBoardRef.current?.clientHeight || 1)
        }
        return () => { window.removeEventListener('resize', handleResize) }
    }, [])
    useEffect(() => {
        if (mode === 'auto') {
            const tm = setInterval(() => gameBet(false), 1300)
            return () => { clearInterval(tm) }
        }
    }, [mode])
    useEffect(() => {
        renderGame(gameBoardRef.current!)
        setPayouts(gamePayouts)
    }, [rows, risk, appWidth, appHeight])
    return <div className='md:flex-1 w-full flex flex-col justify-stretch h-[70svh] md:h-full'>
        <div ref={gameBoardRef} className='flex-1' />
        <div className='w-full h-40 relative'>
            {payouts.payouts.map((payout) => (<PayoutWidget key={payout.idx} payout={payout} />))}
        </div>
        <LastPayouts />
    </div>
}