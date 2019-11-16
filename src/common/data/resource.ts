
export default interface Resource<T> {
	value?: T;
	error?: string;
	updateStarted: string; // DATE
	updateFinished?: string; // DATE
}