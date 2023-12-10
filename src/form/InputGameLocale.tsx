import { applyLocale, useGameLocale } from '../state'

export function InputGameLocale() {
    const locale = useGameLocale()
    return (
        <div className="w-full flex gap-2 p-2 justify-around mt-2">
            <button type="button" className={"p-1 w-2/3 rounded-2xl border " + (locale === 'pt' ? 'bg-gray-500' : '')}
                onClick={() => {
                    applyLocale('pt')
                }}
            >
                {'Português'}
            </button>
            <button type="button" className={"p-1 w-2/3 rounded-2xl border " + (locale === 'en' ? 'bg-gray-500' : '')}
                onClick={() => {
                    applyLocale('en')
                }}
            >
                English
            </button>
            <button type="button" className={"p-1 w-2/3 rounded-2xl border " + (locale === 'cn' ? 'bg-gray-500' : '')}
                onClick={() => {
                    applyLocale('cn')
                }}
            >
                简体中文
            </button>
        </div>
    )
}