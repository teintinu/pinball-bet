import { i18n, updateGameState, useGameState } from "../state"

export function InputGameMode() {
    const gameState = useGameState()
    return (
        <div className="w-full flex gap-2 p-2 justify-around mt-4 bg-gray-900 rounded-[30px]">
            <button type="button" className={"w-1/2 h-12  rounded-[23px] " + (gameState.mode === 'manual' ? 'bg-gray-500' : '')}
                onClick={() => {
                    updateGameState((prev) => ({
                        ...prev,
                        mode: 'manual'
                    }))
                }}
            >
                {i18n().manual}
            </button>
            <button type="button" className={"w-1/2 h-12  rounded-[23px] " + (gameState.mode === 'auto' ? 'bg-gray-500' : '')}
                onClick={() => {
                    updateGameState((prev) => ({
                        ...prev,
                        mode: 'auto'
                    }))
                }}
            >
                {i18n().auto}
            </button>
        </div>
    )
}