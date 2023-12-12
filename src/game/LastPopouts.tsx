// import { useEffect, useState } from "react"
import { emptyPayout, peekPayOutIdx, useGameState } from "../state"
import { PayoutWidget } from "./Payout"

// let cont = 0
export function LastPayouts() {
    const { lastPayouts } = useGameState()
    // const [s, setS] = useState(lastPayouts)
    // useEffect(() => {
    //     setS(fn())
    //     const i = setInterval(() => {
    //         setS((prev) => [...prev, { idx: cont++, tax: Math.random() * 100, style: 'bg-red-500', x: 0, y: 0 }])
    //     }, 1000)
    //     return () => {
    //         clearInterval(i)
    //     }
    //     function fn() {
    //         return s.map(() => {
    //             return { idx: cont++, tax: Math.random() * 100, style: 'bg-red-500', x: 0, y: 0 }
    //         })
    //     }
    // }, [])

    // const s2 = s.slice(s.length - 6)
    const s2 = [...lastPayouts.slice(lastPayouts.length - 5), {...emptyPayout, idx: peekPayOutIdx()}]
    return <div className='absolute right-0 top-20 w-[90px] h-[280px] md:py-10 px-2 overflow-hidden'>
        {s2.map((p, idx) => (
            <div key={p.idx} className={"transition-all duration-1000 overflow-hidden absolute"}
                style={{
                    top: -50 + idx * 60,
                    height: (idx === 0 ? 0 : 60),
                    maxHeight: (idx === 0 ? 0 : 60),
                    width: 70,
                    zIndex: 100-idx,
                }}
            >
                {/* <span className="text-white">{idx}-{p.idx}</span> */}
                <PayoutWidget payout={p} relative />
            </div>
        ))}
    </div>
}
