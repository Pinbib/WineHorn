#!/usr/bin/env node

import fs from "fs";
import path from "path";

import prompts from "prompts";

import qp from "qp-color";

let version = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "..", "package.json"), "utf8")).version;
let version_jsr = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "..", "jsr.json"), "utf8")).version;

function copyDir(from, to, args) {
	function replaceArgs(text) {
		Object.keys(args).forEach(key => {
			text = text.replace(new RegExp(`@${key}`, "g"), args[key]);
		});

		return text;
	}

	let files = fs.readdirSync(from);

	for (let file of files) {
		if (fs.statSync(path.join(from, file)).isDirectory()) {
			fs.mkdirSync(path.join(to, file), {recursive: true});
			copyDir(path.join(from, file), path.join(to, file), args);
		} else {
			let text = fs.readFileSync(path.join(from, file), "utf8");
			text = replaceArgs(text);
			fs.writeFileSync(path.join(to, file), text);
		}
	}
}

(async () => {
	let {ready} = await prompts({
		type: "confirm",
		name: "ready",
		message: "Create a new WineHorn project?"
	});

	if (ready) {
		let {name} = await prompts({
			type: "text",
			name: "name",
			message: "Project name?",
			validate: name => name === "" ? "Project name cannot be empty." : true
		});

		if (name) {
			let {runtime} = await prompts({
				type: "select",
				name: "runtime",
				message: "Select a runtime",
				choices: [
					{
						name: "Node.js",
						value: "node",
						description: "Node.js is an open-source and cross-platform JavaScript runtime environment. It is a popular tool for almost any kind of project!"
					},
					{
						name: "Deno",
						value: "deno",
						description: "Deno, the open-source runtime for TypeScript and JavaScript. Features built-in dev tools, powerful platform APIs, and native support for TypeScript and JSX."
					},
					{
						name: "Bun",
						value: "bun",
						description: "A fast JavaScript runtime designed as a drop-in replacement for Node.js. It's written in Zig and powered by JavaScriptCore under the hood, dramatically reducing startup times and memory usage."
					}
				]
			});

			if (runtime) {
				copyDir(path.join(import.meta.dirname, "..", "templates", runtime), "./", {name, version, version_jsr});

				console.log(qp.gb("Project created successfully!"));

				console.log(qp.gb("To get started, run the following commands:"));

				switch (runtime) {
					case "node":
						console.log(qp.yi(`\n\tnpm install`));
						console.log(qp.yi(`\tnpm run dev`));
						break;
					case"deno":
						console.log(qp.yi(`\n\tdeno task dev`));
						break;
					case"bun":
						console.log(qp.yi(`\n\tnpm install`));
						console.log(qp.yi(`\tbun dev`));
						break;
				}
			}
		}
	}
})();