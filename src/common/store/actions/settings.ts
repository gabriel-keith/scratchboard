import { Action } from 'redux';
import { Theme } from '../state/settings';

export const CHANGE_THEME_ACTION = 'SET_THEME_ACTION';

export type SettingsAction = ChangeThemeAction;

interface ChangeThemeAction extends Action {
	type: typeof CHANGE_THEME_ACTION;
	payload: Theme;
}

export function setTheme(theme: Theme): ChangeThemeAction {
	return {
		type: CHANGE_THEME_ACTION,
		payload: theme
	};
}
