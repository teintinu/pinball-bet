
export const en = {
	manual: 'Manual',
	auto: 'Automatic',
	betAmount: 'Bet amount',
	risk: 'Risk',
	high: 'High',
	medium: 'Medium',
	low: 'Low',
	rows: 'Rows',
	bet: 'Bet',
	balance: 'Balance',
	playSounds: 'Play sounds',
	mute: 'Mute',
} as const

export type Translation = Record<keyof typeof en, string>
