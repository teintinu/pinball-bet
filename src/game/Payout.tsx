import { formatNumber, animatePayOut, usePayoutAnimations } from "../state"
import { GamePayout, gamePayouts } from "./board"
import { useMemo } from "react"

export interface PayoutWidgetProps {
    payout: GamePayout
    relative?: boolean
}

export function PayoutWidget({ payout, relative }: PayoutWidgetProps) {
    const animations = usePayoutAnimations()
    const animating = animations[payout.idx] > Date.now()
    const animateClass = useMemo(() => {
        if (animating) {
            setTimeout(() => {
                animatePayOut(payout.idx, false)
            }, 900)
            return 'transition -translate-y-1 scale-125 duration-500 ease-in-out shadow-xl'
        }
        return ''
    }, [animating, payout.idx])
    return <div
        className={(relative ? 'h-10' : 'absolute h-10') + " rounded-md shadow-lg flex items-center justify-center " + payout.style + animateClass}
        style={relative ? {} : {
            left: payout.x + 'px',
            top: 2,
            width: gamePayouts.squareWidth + 'px',
        }}
    >
        {payout.tax ? formatNumber(payout.tax, 0, 1) + '\u00d7' : ''}
    </div >
}