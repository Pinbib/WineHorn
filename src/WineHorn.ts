import express, {RequestHandler} from "express";
import qp from "qp-color";
import Route, {RouteProto, RequestTypesLowerCase} from "./Route.js";
import Log from "./Log.js";
import Config from "./Config.js";
import Plugin from "./Plugin.js";

// todo: create db system

class WineHorn {
	public port: number = 3000;
	public config: Config = {};
	// plugins
	public $: Record<string, any> = {};
	private routes: Route[] = [];
	private middlewares: RequestHandler[] = [];

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

		// middlewares
		this.middlewares.forEach(middleware => app.use(middleware));

		this.routes.forEach(route => {
			app[route.method.toLowerCase() as RequestTypesLowerCase](route.path, route.handler); // todo: bind(?)
		});

		app.listen(port, () => {
			console.log(qp.gb(`Server started on port ${port}\n>>> `), qp.ri(`http://localhost:${port}`));
		});
	}

	public use<T>(plugin: Plugin<T>): void {
		console.log(qp.gb("{WineHorn}"), qp.yi(`Installing plugin "${plugin.id}"`));
		if (this.$[plugin.id] !== undefined) {
			console.log(qp.gb("{WineHorn}"), qp.yi(`The "${plugin.id}" plugin has been overwritten.`));
		}

		// for accuracy
		this.$[plugin.id] as T;

		try {
			this.$[plugin.id] = plugin.install();

			// Object.defineProperty(this, `$$${plugin.id}`, {
			// 	get: () => this.$[plugin.id],
			// 	configurable: true
			// });
		} catch (err) {
			console.log(qp.gb("{WineHorn}"), qp.ri(`Error installing plugin "${plugin.id}"`));
		}
	}

	public middleware(middleware: RequestHandler): void {
		this.middlewares.push(middleware);
	}
}

export default WineHorn;