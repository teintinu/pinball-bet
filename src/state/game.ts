import { atom, useAtomValue } from 'jotai'
import { gameStore } from './store'
import { GamePayout } from '../game/board'

export type BetRisk = 'low' | 'medium' | 'high'
export type GameState = typeof gameState

export const emptyPayout: GamePayout = {
    idx: 0,
    style: '',
    tax: 0,
    x: 0,
    y: 0,
}

let nextPayoutIdx = 0

export function incPayOutIdx() {
    return nextPayoutIdx++
}

export function peekPayOutIdx() {
    return nextPayoutIdx
}

const gameState = {
    mode: 'manual' as 'manual' | 'auto',
    betValue: 0.0002,
    balance: 0.007125,
    risk: 'medium' as BetRisk,
    rows: 8,
    activeBets: 0,
    lastPayouts: [
        { ...emptyPayout, idx: -1 },
        { ...emptyPayout, idx: -2 },
        { ...emptyPayout, idx: -3 },
        { ...emptyPayout, idx: -4 },
        { ...emptyPayout, idx: -5 },
        { ...emptyPayout, idx: -6 },
    ] as GamePayout[],
    playSounds: false,
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
