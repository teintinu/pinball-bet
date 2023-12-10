import { atom, useAtomValue } from 'jotai'
import { gameStore } from './store'
import { Locales, translations } from './locales'

let locale: Locales = 'pt'
let loadedLocale

export function formatNumber(value: number, minimumFractionDigits: number, maximumFractionDigits: number) {
    return new Intl.NumberFormat(locale, { minimumFractionDigits, maximumFractionDigits }).format(value)
}

export function i18n() {
    return translations[locale]
}

const gameLocaleAtom = atom(locale as Locales)
applyLocale(locale)

export function useGameLocale() {
    return useAtomValue(gameLocaleAtom)
}

export function applyLocale(desiredLocale: Locales) {
    loadedLocale = translations[desiredLocale]
    if (loadedLocale) {
        locale = desiredLocale
    } else {
        locale = 'pt'
        loadedLocale = translations.pt
    }
    gameStore.set(gameLocaleAtom, locale)
}
