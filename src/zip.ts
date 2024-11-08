import {gzipSync, gunzipSync} from "node:zlib";
import {readFileSync, writeFile} from "node:fs";

export function compress(input: string): string {
	return gzipSync(input).toString("base64");
}

export function decompress(input: string): string {
	return gunzipSync(Buffer.from(input, "base64")).toString();
}

export function filesCompress(out: string, files: string[]): Promise<any> {
	return new Promise((resolve, reject) => {
		try {
			let file: string[] = [];
			files.forEach(path => {
				let data = decompress(readFileSync(path, "utf-8"));
				file.push(`\n\n${path}\n${data}`);
			});

			let data: string = compress(file.join());
			writeFile(out, data, resolve);
		} catch (err) {
			if (err) reject(err);
		}
	});
}

type files = { name: string, data: string }[];

export function filesDecompress(input: string): files {
	let files: files = [];

	let data = decompress(readFileSync(input, "utf-8"));

	data.split("\n\n").forEach(file => {
		let [name, data] = file.split("\n");
		files.push({name, data});
	});

	return files.slice(1);
}

export default {compress, decompress, filesCompress, filesDecompress};