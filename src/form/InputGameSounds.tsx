import { i18n, updateGameState, useGameState } from "../state"

export function InputGameSounds() {
    const gameState = useGameState()
    return (
        <div className="w-full flex gap-2 p-2 justify-around mt-4 bg-gray-900 rounded-[30px]">
            <button type="button" className={"w-1/2 h-12  rounded-[23px] " + (gameState.playSounds ? 'bg-gray-500' : '')}
                onClick={() => {
                    updateGameState((prev) => ({
                        ...prev,
                        playSounds: true,
                    }))
                }}
            >
                {i18n().playSounds}
            </button>
            <button type="button" className={"w-1/2 h-12  rounded-[23px] " + (!gameState.playSounds ? 'bg-gray-500' : '')}
                onClick={() => {
                    updateGameState((prev) => ({
                        ...prev,
                        playSounds: false
                    }))
                }}
            >
                {i18n().mute}
            </button>
        </div>
    )
}