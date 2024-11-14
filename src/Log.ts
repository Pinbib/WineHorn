import * as fs from "node:fs";
import * as path from "node:path";

import {Request, Response, NextFunction} from "express";
import Lopster, {Extension} from "the-lopster";
import qp from "qp-color";
import WineHorn from "./WineHorn.js";
import Path from "./Route";
import {compress} from "./zip.js";

Lopster.use(new Extension(".log", (data: string): object => {
	return {data: data.split("\n")}
}, (data: object): string => {
	return (data as { data: string[] }).data.join("\n")
}));

export default function Log(app: WineHorn): (req: Request, res: Response, next: NextFunction) => void {

	// preparation of the log directory
	if (!fs.existsSync("./log")) {
		fs.mkdirSync("./log");
	}

	if (!fs.existsSync(path.join("./log", "in.log"))) {
		fs.writeFileSync(path.join("./log", "in.log"), "");
	}

	let il: Lopster = new Lopster(path.join("./log", "in.log"));

	if (!fs.existsSync(path.join("./log", "out.log"))) {
		fs.writeFileSync(path.join("./log", "out.log"), "");
	}

	let ol: Lopster = new Lopster(path.join("./log", "out.log"));

	if (!fs.existsSync(path.join("./log", "response"))) {
		fs.mkdirSync(path.join("./log", "response"));
	}

	if (!fs.existsSync(path.join("./log", "system.log"))) {
		fs.writeFileSync(path.join("./log", "system.log"), "");
	}

	let sl: Lopster = new Lopster(path.join("./log", "system.log"));

	// if (!fs.existsSync("./backups")) {
	// 	fs.mkdirSync("./backups");
	// }

	function colorize(request: string[]): string {
		return qp.gb(request[0]) + qp.yi(request[1]) + qp.yb(request[2])
	}

	// middleware for logging requests
	return (req, res, next) => {
		// if (app.config.createBackupsAfter !== undefined) {
		// 	if ((ol.data as Array<any>).length >= app.config.createBackupsAfter && (il.data as Array<any>).length >= app.config.createBackupsAfter) {
		// 		// todo: create backup system
		// 	}
		// }

		// placeholder of the send fictitious method
		(() => {
			const originalSend = res.send;

			res.send = function (body) {
				fs.writeFileSync(path.join("./log", "response", `${id}.zlog`), compress(body.replace(/\n/g, "{_n_}")));

				let response: string[] = [`[${id}] (${new Date().toLocaleString()}) >>> ${req.method} ${res.statusCode} `, `${req.path} `, `${req.ip}`];
				console.log("{RESPONSE} " + colorize(response));

				// recording the response in the log
				ol.set((data: Object) => {
					(data as { data: string[] }).data.push(response.join(" "));
				});

				return originalSend.call(this, body);
			};
		})();

		// request id
		let id: number = (il.data as { data: string[] }).data.length - 1;

		let request: string[] = [`[${id}] (${new Date().toLocaleString()}) <<< ${req.method} `, `${req.path} `, `${req.ip}`];

		console.log("{REQUEST} " + colorize(request));

		// recording the request in the log
		il.set((data: Object) => {
			(data as { data: string[] }).data.push(request.join(" "));
		});

		let path_: Path | undefined = app.Routes.find(p => p.path === req.path);

		if (path_) {
			// request validation
			if (path_.validator) {
				let valid: string | boolean = path_.isValid(req.query);

				if (typeof valid === "string") {
					res.status(400);

					// validation error output
					console.log("{Validator} " + qp.rb(`[${id}] >>> ${req.method} ${res.statusCode} ${req.path} ${req.ip} >>> ${valid}`));

					res.send(valid);
				} else {
					next();
				}
			} else {
				next();
			}
		} else {
			res.status(404).send("Cannot " + req.method + " " + req.path);
		}
	};
}