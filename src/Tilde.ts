import WineHorn from "./WineHorn.js";
import Plugin from "./Plugin.js";

import fs from "node:fs";
import path from "node:path";

import TL from "the-lopster";
import {Extension} from "the-lopster";

import qp from "qp-color";

type extensions = "json" | "ini" | "yaml" | "toml" | "xml";

class Tilde {
	private src: string = "./data"
	private ext: extensions = "json";
	private tables: Record<string, TL> = {};

	constructor(src?: string, preload: boolean = true) {
		if (src) this.src = src;
		if (preload) this.preload();

		if (!fs.existsSync(this.src)) {
			fs.mkdirSync(this.src, {recursive: true});
		}
	}

	public get extension(): extensions {
		return this.ext;
	}

	public set extension(ext: extensions) {
		this.ext = ext;
	}

	public get length(): number {
		return Object.keys(this.tables).length;
	};

	public use(ext: Extension): void {
		TL.use(ext);
	}

	public create(table: string): void | TL {
		if (this.tables[table]) {
			if (this.tables[table].src === path.resolve(path.join(this.src, `${table}.${this.ext}`))) {
				console.log(qp.gb("{Tilde}"), qp.yi(`The "${table}" table has been loaded.`));
				return this.tables[table];
			}
		} else {
			this.tables[table] = new TL(path.join(this.src, `${table}.${this.ext}`));
			console.log(qp.gb("{Tilde}"), qp.yi(`The "${table}" table has been created.`));
			return this.tables[table];
		}
	}

	public load(table: string) {
		if (this.tables[table]) {
			if (this.tables[table].src === path.resolve(path.join(this.src, `${table}.${this.ext}`))) {
				return this.tables[table];
			}
		} else {
			this.tables[table] = new TL(path.join(this.src, `${table}.${this.ext}`));
			return this.tables[table];
		}
	}

	public close(table: string): void {
		if (this.tables[table]) {
			delete this.tables[table];
			console.log(qp.gb("{Tilde}"), qp.yi(`The "${table}" table has been closed.`));
		}
	}

	public delete(table: string): void {
		if (this.tables[table]) {
			fs.unlinkSync(this.tables[table].src);
			delete this.tables[table];
			console.log(qp.gb("{Tilde}"), qp.ri(`The "${table}" table has been deleted.`));
		}
	}

	public get(table: string): TL | undefined {
		return this.tables[table];
	}

	public preload(): void {
		if (!fs.existsSync(this.src)) {
			fs.mkdirSync(this.src, {recursive: true});
		}

		const files = fs.readdirSync(this.src);
		files.forEach(file => {
			const table = file.split(".")[0];
			this.tables[table] = new TL(path.join(this.src, file));
			console.log(qp.gb("{Tilde}"), qp.yi(`The "${table}" table has been loaded.`));
		});
	};
}

export default {
	name: "Tilde",
	id: "tl",
	install(wh: WineHorn): Tilde {
		let src: string = "./data";
		if (wh.config.tilde?.src) {
			src = wh.config.tilde.src;
		}
		return new Tilde(src, wh.config.tilde?.preload);
	}
} as Plugin<Tilde>;