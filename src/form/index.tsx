import { gameBet } from "../game";
import { formatNumber, i18n, updateGameState, useGameState } from "../state";
import { InputGameLocale } from "./InputGameLocale";
import { InputGameMode } from "./InputGameMode";
import { InputGameSounds } from "./InputGameSounds";

export function GameForm() {
    const { betValue, balance, risk, rows, activeBets } = useGameState();
    return (
        <form className="flex flex-col gap-3 text-sm font-mediu text-white p-8 h-full">
            <InputGameMode />
            <div className="flex justify-between w-full pt-8">
                <label htmlFor="board-bet" className="block ">
                    {i18n().betAmount}
                </label>
                <label htmlFor="board-bet" className="block ">
                    {'US$ 0,00'}
                </label>
            </div>
            <div className="flex justify-between w-full h-14 mx-2 gap-1 shadow-sm shadow-black">
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
            <div className="flex justify-between w-full pt-4">
                <label htmlFor="board-risk" className="block ">
                    {i18n().risk}
                </label>
            </div>
            <div className="flex justify-between w-full h-14 mx-2 gap-1 pb-2">
                <select
                    name="board-risk"
                    id="board-risk"
                    className="pl-4 outline-none block h-full w-full text-lg rounded-md bg-gray-900 flex-1"
                    value={risk}
                    disabled={activeBets > 0}
                    onChange={(e) => {
                        updateGameState((prev) => ({
                            ...prev,
                            risk: e.target.value as typeof risk,
                        }));
                    }}
                >
                    <option value="low">{i18n().low}</option>
                    <option value="medium">{i18n().medium}</option>
                    <option value="high">{i18n().high}</option>
                </select>
            </div>
            <div className="flex justify-between w-full pt-4">
                <label htmlFor="board-rows" className="block ">
                    {i18n().rows}
                </label>
            </div>
            <div className="flex justify-between w-full h-14 mx-2 gap-1 pb-2">
                <select
                    name="board-rows"
                    id="board-rows"
                    className="pl-4 outline-none block w-full h-full text-lg rounded-md bg-gray-900 flex-1"
                    value={rows}
                    disabled={activeBets > 0}
                    onChange={(e) => {
                        updateGameState((prev) => ({
                            ...prev,
                            rows: Number(e.target.value),
                        }));
                    }}
                >
                    {[8, 9, 10, 11, 12, 13, 14, 15, 16].map((value) => (
                        <option key={value} value={value}>{String(value)}</option>
                    ))}
                </select>
            </div>
            <button type="button" className="bg-green-500 px-8 py-6 text-xl rounded-xl"
                disabled={balance < betValue}
                onClick={() => gameBet(true)}>
                {i18n().bet}
            </button>
            <div className="flex justify-between w-full pt-8">
                <label htmlFor="board-bet" className="block ">
                    {i18n().balance}
                </label>
                <label htmlFor="board-bet" className="block ">
                    {formatNumber(balance, 1, 8)}
                </label>
            </div>
            <div className="flex-1 flex items-end">
                <div className="flex-1 flex flex-col">
                    <InputGameSounds />
                    <InputGameLocale />
                </div>
            </div>
        </form>
    );
}
