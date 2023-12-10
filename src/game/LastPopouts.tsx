import { useGameState } from "../state"
import { PayoutWidget } from "./Payout"

export function LastPayouts() {
    const { lastPayouts } = useGameState()
    const [pu, p1, p2, p3, p4, pd] = lastPayouts
    return <div className='w-32 h-full flex flex-col gap-2 py-10 px-2 items-stretch justify-stretch'>
        <div className="relative p-2">{pu ? <PayoutWidget payout={pu} relative /> : null}</div>
        <div className="relative p-2">{p1 ? <PayoutWidget payout={p1} relative /> : null}</div>
        <div className="relative p-2">{p2 ? <PayoutWidget payout={p2} relative /> : null}</div>
        <div className="relative p-2">{p3 ? <PayoutWidget payout={p3} relative /> : null}</div>
        <div className="relative p-2">{p4 ? <PayoutWidget payout={p4} relative /> : null}</div>
        <div className="relative p-2">{pd ? <PayoutWidget payout={pd} relative /> : null}</div>
    </div>
}
