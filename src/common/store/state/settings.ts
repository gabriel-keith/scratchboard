
export type Theme = 'dark' | 'light';

export function createDefaultSettings(): SettingsState {
	return {
		theme: 'dark'
	};
}

export interface SettingsState {
	theme: Theme;
}
