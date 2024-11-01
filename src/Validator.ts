export type Types =
	"string"
	| "number"
	| "boolean"
	// | "object"
	| "array"
	| "undefined"
// | "?string"
// | "?number"
// | "?boolean"
// | "?object"
// | "?array";

export type ArrayDef = Types[]
// export type ArrayDef = ["array", ...Types[]]

// export type ArrayDef = ["array" | "?array", ...Types[]]

export interface Schema {
	[key: string]: Types | Schema | ArrayDef;
}

function Valid(schema: Schema, obj: Record<string, any>): boolean | string {
	let keys = Object.keys(schema);

	for (let key of keys) {
		if (obj[key] === undefined) return `Key "${key}" is missing.`;

		let expectant = schema[key];
		let received = typeof obj[key];

		switch (typeof expectant) {
			case "string":
				if (expectant === "array") {
					try {
						if (!Array.isArray(JSON.parse(obj[key]))) return `In the "${key}" field, type "array" is expected, and "${received}" is received.`;
						else {
							obj[key] = Array(obj[key]);
						}
					} catch (err) {
						if (err) return `In the "${key}" field, type "array" is expected, and "${received}" is received.`;
					}
				} else if (expectant === "number") {
					try {
						Number(obj[key]);
						obj[key] = Number(obj[key]);
					} catch (err) {
						if (err) return `In the "${key}" field, type "${expectant}" is expected, and "${received}" is received.`;
					}
				} else if (expectant === "boolean") {
					try {
						Boolean(obj[key]);
						obj[key] = Boolean(obj[key]);
					} catch (err) {
						if (err) return `In the "${key}" field, type "${expectant}" is expected, and "${received}" is received.`;
					}
				} else if (received !== expectant) return `In the "${key}" field, type "${expectant}" is expected, and "${received}" is received.`;
				break;
			case "object":
				try {
					if (Array.isArray(JSON.parse(obj[key]))) {
						obj[key] = JSON.parse(obj[key]);

						for (let i = 0; i < obj[key].length; i++) {
							// fix
							if (typeof obj[key][i] !== (expectant as ArrayDef)[i]) return `In the "${key}[${i}]" field, type "${(expectant as ArrayDef).join(" | ")}" is expected, and "${received}" is received.`;
						}
					} else return `In the "${key}" field, type "array" is expected, and "${received}" is received.`;
				} catch (err) {
					if (err) return Valid(expectant as Schema, obj[key]);
				}
				break;
			case "undefined":
				break;
		}
	}

	return true;
}

export default Valid;