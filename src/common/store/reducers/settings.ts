import { SettingsState, createDefaultSettings } from '../state/settings';
import { SettingsAction, CHANGE_THEME_ACTION } from '../actions/settings';

export default function settingsReducer(
	state: SettingsState = createDefaultSettings(),
	action: SettingsAction,
): SettingsState {
	switch (action.type) {
		case CHANGE_THEME_ACTION:
			return {
				...state,
				theme: action.payload,
			};
		default:
			return state;
	}
}
