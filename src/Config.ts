export default interface Config {
	createBackupsAfter?: number,

	tilde?: {
		src?: string;
		preload?: boolean;
	}
}