import express from "express";
import qp from "qp-color";
import Path, {PathProto, RequestTypesLowerCase} from "./Path.js";
import Log from "./Log.js";

class WineHorn {
	public port: number = 3000;
	private paths: Path[] = [];

	constructor(port?: number, paths?: Path[]) {
		if (port) this.port = port;
		if (paths) this.paths = paths;
	}

	public get Paths(): Path[] {
		return this.paths;
	}

	public add(path: Path | PathProto): void {
		if (this.paths.find(p => p.path === path.path)) throw new Error(`Path ${path.path} already exists.`);
		else this.paths.push(Path.transform(path));
	}

	public adds(...paths: Path[] | PathProto[]): void {
		paths.forEach(path => this.add(path));
	}

	public listen(): void {
		const port = this.port;
		const app = express();

		app.use(express.json());

		// log
		app.use(Log(this));

		this.paths.forEach(path => {
			app[path.method.toLowerCase() as RequestTypesLowerCase](path.path, path.handler); // todo: bind(?)
		});

		app.listen(port, () => {
			console.log(qp.gb(`Server started on port ${port}\n>>> `), qp.ri(`http://localhost:${port}`));
		});
	}
}

export default WineHorn;