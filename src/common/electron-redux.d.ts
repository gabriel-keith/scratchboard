declare module 'electron-redux' {
	import { Middleware, Store, AnyAction, Dispatch } from 'redux'

	export const forwardToMain: Middleware<{}, any, Dispatch<AnyAction>>
	export const forwardToRenderer: Middleware<{}, any, Dispatch<AnyAction>>
	export const triggerAlias: Middleware<{}, any, Dispatch<AnyAction>>
	export function createAliasedAction(name: string, action: (...args: any[]) => AnyAction): (...args: any[]) => AnyAction
	export function getInitialStateRenderer(): any
	export function replayActionRenderer(store: Store): void
	export function replayActionMain(store: Store): void
}