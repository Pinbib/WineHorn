---
outline: deep
---

# WineHorn

<!-- [![GitHub Repo stars](https://img.shields.io/github/stars/Pinbib/WineHorn?style=plastic&logo=github&label=WineHorn)](https://github.com/Pinbib/WineHorn)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/Pinbib/WineHorn?style=plastic&logo=github)](https://github.com/Pinbib/WineHorn)
[![NPM Version](https://img.shields.io/npm/v/winehorn?style=plastic&logo=npm)](https://www.npmjs.com/package/winehorn)
[![JSR Version](https://img.shields.io/jsr/v/%40winehorn/winehorn?style=plastic&logo=jsr)](https://jsr.io/@winehorn/winehorn) -->

WineHorn is a library for quickly creating test servers. It is a shell for [express](https://www.npmjs.org/package/express).

## Why WineHorn?

WineHorn - has built-in features (e.g. [creating a request and response log for error detection](/Logs)), and is also wrapped in classes to speed up your work and allow you to focus on developing the server itself.

## Quickstart

To get started with WineHorn, you can use the project initializer:

```bash
npx winehorn@latest
```

After that, you will be asked several questions, after which the project will be created:

::: code-group

```text [NodeJS]
.
├─ src
│  ├─ Routes
│  │  └─ EntryPoint.ts
│  └─ index.ts
├─ nodemon.json
├─ package.json
└─ tsconfig.json
```

```text [Deno]
.
├─ src
│  ├─ Routes
│  │  └─ EntryPoint.ts
│  └─ index.ts
└─ deno.json
```

```text [Bun]
.
├─ src
│  ├─ Routes
│  │  └─ EntryPoint.ts
│  └─ index.ts
└─ package.json
```

:::

After that, install the dependencies according to the runtime for which the project was created (in the case of Deno, simply run the project) and run the project:

::: code-group

```bash [NodeJS]
npm install # installs dependencies
npm run dev # run a project
```

```bash [Deno]
deno task dev # run a project
```

```bash [Bun]
npm install # installs dependencies
bun dev # run a project
```

:::

After running the project, a `./log` directory should be created, and you should receive a message like this:

``` text
Server started on port 3000
>>>  http://localhost:3000
```
