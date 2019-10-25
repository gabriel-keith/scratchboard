declare module 'electron-redux' {
	import { Middleware } from 'redux'
	export const forwardToMain: Middleware<any, any, any>
	export const forwardToRenderer: Middleware<any, any, any>
	export const triggerAlias: Middleware<any, any, any>
	export function getInitialStateRenderer(): any
	export function replayActionRenderer(store: any): void
	export function replayActionMain(store: any): void
}