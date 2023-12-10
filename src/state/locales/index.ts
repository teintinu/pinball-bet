import { en } from './en'
import { pt } from './pt'
import { cn } from './cn'

export const translations = {
    pt, en, cn
}

export type Locales = keyof typeof translations;
