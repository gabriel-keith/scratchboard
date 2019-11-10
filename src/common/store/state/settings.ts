export type Theme = 'dark' | 'light';

export interface SettingsState {
	theme: Theme;
}

export function createDefaultSettings(): SettingsState {
	return {
		theme: 'dark',
	};
}
