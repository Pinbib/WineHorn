import {gzipSync, gunzipSync} from "zlib";

export function compress(input: string): string {
	return gzipSync(input).toString("base64");
}

export function decompress(input: string): string {
	return gunzipSync(Buffer.from(input, "base64")).toString();
}