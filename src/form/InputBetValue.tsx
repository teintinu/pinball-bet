import { i18n, updateGameState, useGameState } from "../state";

export function InputBetValue() {
    const { betValue, balance, activeBets } = useGameState();
    return (
        <>
            <div className="md:order-1 flex justify-between w-full pt-8">
                <label htmlFor="board-bet" className="block ">
                    {i18n().betAmount}
                </label>
                <label htmlFor="board-bet" className="block ">
                    {'US$ 0,00'}
                </label>
            </div>
            <div className="md:order-1 flex justify-between w-full h-14 mx-2 gap-1 shadow-sm shadow-black">
                <div
                    className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md bg-gray-900 flex-1 px-1"
                >
                    <input
                        type="number"
                        name="board-bet"
                        id="board-bet"
                        className="block w-full h-full text-lg pl-4 outline-none border-gray-300 rounded-md bg-gray-900 flex-1"
                        min={0.1}
                        max={balance}
                        disabled={activeBets > 0}
                        value={betValue}
                        onChange={(e) => {
                            updateGameState((prev) => ({
                                ...prev,
                                betValue: Number(e.target.value),
                            }));
                        }}
                    />
                </div>
                <button className="bg-gray-700 rounded-md m-2 w-6" type="button">½</button>
                <button className="bg-gray-700 rounded-md m-2 w-6" type="button">2x</button>
            </div>
        </>
    )
}