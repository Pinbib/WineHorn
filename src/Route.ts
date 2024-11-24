import {RequestHandler} from "express";
import Validator, {Schema} from "./Validator.js";
import WineHorn from "./WineHorn.js";

export type RequestTypes = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE";
export type RequestTypesLowerCase = Lowercase<RequestTypes>;

export interface RouteProto {
	method: RequestTypes;
	path: string;
	handler: RequestHandler;
	validator?: Schema;
	wh?: WineHorn;
}

// ?x? implement !
class Route implements RouteProto {
	method: RequestTypes;
	path: string;
	handler: RequestHandler;
	validator?: Schema;
	wh?: WineHorn;

	constructor(method: RequestTypes, path: string, handler: RequestHandler, validator?: Schema) {
		this.method = method;
		this.path = path;
		this.handler = handler;
		this.validator = validator;
	}

	public static transform(route: RouteProto): Route {
		return new Route(route.method, route.path, route.handler, route.validator);
	}

	public isValid(query: Record<string, unknown>): boolean | string {
		if (this.validator) {
			return Validator(this.validator, query);
		} else return true;
	}

	public alias(...paths: string[]): Route[] {
		return paths.map(p => new Route(this.method, p, this.handler, this.validator));
	}
}

export default Route;