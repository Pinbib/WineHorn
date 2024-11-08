import {RequestHandler} from "express";
import Validator, {Schema} from "./Validator.js";

export type RequestTypes = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE";
export type RequestTypesLowerCase = Lowercase<RequestTypes>;

export interface PathProto {
	method: RequestTypes;
	path: string;
	handler: RequestHandler;
	validator?: Schema;
}

// ?x? implement !
class Path implements PathProto {
	method: RequestTypes;
	path: string;
	handler: RequestHandler;
	validator?: Schema;

	constructor(method: RequestTypes, path: string, handler: RequestHandler, validator?: Schema) {
		this.method = method;
		this.path = path;
		this.handler = handler;
		this.validator = validator;
	}

	public static transform(path: PathProto): Path {
		return new Path(path.method, path.path, path.handler, path.validator);
	}

	public isValid(query: Record<string, unknown>): boolean | string {
		if (this.validator) {
			return Validator(this.validator, query);
		} else return true;
	}

	public alias(...path: string[]): Path[] {
		return path.map(p => new Path(this.method, p, this.handler, this.validator));
	}
}

export default Path;