import { atom, useAtomValue } from 'jotai'
import { gameStore } from './store'
import { GamePayout } from '../game/board'

export type BetRisk = 'low' | 'medium' | 'high'
export type GameState = typeof gameState

const gameState = {
    mode: 'manual' as 'manual' | 'auto',
    betValue: 0.0002,
    balance: 0.007125,
    risk: 'medium' as BetRisk,
    rows: 16,
    activeBets: 0,
    lastPayouts: [] as GamePayout[],
    playSounds: true,
}

const gameStateAtom = atom(gameState)

export function useGameState() {
    return useAtomValue(gameStateAtom)
}

export function updateGameState(fn: (prev: GameState) => GameState) {
    gameStore.set(gameStateAtom, fn)
}

export function getGameState() {
    return gameStore.get(gameStateAtom)
}

const payoutAnimations = atom({} as Record<number, number>)

export function usePayoutAnimations() {
    return useAtomValue(payoutAnimations)
}

export function animatePayOut(idx: number, value: boolean) {
    gameStore.set(payoutAnimations, (prev) => ({ ...prev, [idx]: value ? Date.now() + 700 : 0 }))
}
