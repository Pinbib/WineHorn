import {defineConfig} from "vitepress"

export default defineConfig({
	title: "WineHorn",
	description: "Create fast test servers.",
	base: "/WineHorn/",
	head: [
		["link", {rel: "icon", href: "./favicon.ico"}]
	],
	themeConfig: {
		logo: "./WineHorn.svg",
		nav: [
			{text: "Home", link: "/"},
			{text: "Docs", link: "/what"}
		],

		sidebar: [
			{text: "What is WineHorn?", link: "/what"},
			{
				text: "Development",
				items: [
					{text: "WineHorn", link: "/WineHorn"},
					{text: "Route", link: "/Route"},
					{text: "Validator", link: "/Validator"},
					{text: "Plugin", link: "/Plugin"},
					{text: "Config", link: "/config"},
					{
						text: "Built-in plugins", link: "/builtinplugins",
						items: [
							{text: "Tilde", link: "/plugins/Tilde"}
						]
					}
				]
			},
			{text: "Logs", link: "/Logs"}
		],

		socialLinks: [
			{icon: "github", link: "https://github.com/Pinbib/WineHorn"}
		]
	},
	srcDir: "./",
	outDir: "../docs",
	srcExclude: ["**/README.md"],
});