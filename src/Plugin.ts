import WineHorn from "./WineHorn.js";

export default interface Plugin<T> {
	name: string;
	id: string;

	install(wh: WineHorn): T;
}