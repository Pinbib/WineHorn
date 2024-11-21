export default interface Plugin<T> {
	id: string;

	install(): T;
}