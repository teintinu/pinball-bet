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
            }, 500)
            return 'transition translate-y-4 scale-125 duration-300 ease-in-out'
        }
        return ''
    }, [animating, payout.idx])
    return <div
        className={(relative ? '' : 'absolute') + " rounded-md shadow-lg flex items-center justify-center " + payout.style + animateClass}
        style={relative ? {} : {
            left: payout.x + 'px',
            top: 2,
            width: gamePayouts.squareWidth + 'px',
            height: 40,
        }}
    >
        {formatNumber(payout.tax, 0, 1) + '\u00d7'}
    </div >
}