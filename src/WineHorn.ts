import express from "express";
import qp from "qp-color";
import Route, {RouteProto, RequestTypesLowerCase} from "./Route";
import Log from "./Log.js";
import Config from "./Config.js";

// todo: create plugin system
// todo: create db system

class WineHorn {
	public port: number = 3000;
	public config: Config = {};
	private routes: Route[] = [];

	constructor(port?: number, routes?: Route[], config?: Config) {
		if (port) this.port = port;
		if (routes) this.routes = routes;
		if (config) this.config = config;
	}

	public get Routes(): Route[] {
		return this.routes;
	}

	public add(route: Route | RouteProto): void {
		if (this.routes.find(r => r.path === route.path)) throw new Error(`Route ${route.path} already exists.`);
		else this.routes.push(Route.transform(route));
	}

	public adds(...routes: Route[] | RouteProto[]): void {
		routes.forEach(route => this.add(route));
	}

	public listen(): void {
		const port = this.port;
		const app = express();

		app.use(express.json());

		// log
		app.use(Log(this));

		this.routes.forEach(route => {
			app[route.method.toLowerCase() as RequestTypesLowerCase](route.path, route.handler); // todo: bind(?)
		});

		app.listen(port, () => {
			console.log(qp.gb(`Server started on port ${port}\n>>> `), qp.ri(`http://localhost:${port}`));
		});
	}
}

export default WineHorn;