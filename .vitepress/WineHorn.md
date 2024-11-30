---
outline: deep
---

# WineHorn

This is the main class through which the server is launched.

``` ts [import]
import WineHorn from "winehorn";
```

``` ts
WineHorn(port?: number, routes?: Route[], config?: Config)
```

- `port?: number` - an optional argument that indicates on which port the server will be started.
- `routes?: Route[]` - an optional argument that accepts server [routes](/Route).
- `config?: Config` - an optional argument that accepts [configuration](/config).

## Methods

### WineHorn.add()

The `add` method accepts and adds a new [route](/Route) to the server.

``` ts
WineHorn.add(route: Route | RouteProto): void;
```

Using:

``` ts [using]
import WineHorn from "WineHorn";

let wh: WineHorn = new WineHorn();

wh.add(route);
```

### WineHorn.listen()

The `listen` method starts the server.

``` ts
WineHorn.listen(): void;
```

Using:

``` ts [using]
import WineHorn from "winehorn";

let wh: WineHorn = new WineHorn();

wh.listen();
```

### WineHorn.use()

The `use` method accepts and writes to the `$` register [plugin](/Plugin).

``` ts
WineHorn.use<T>(plugin: Plugin<T>): void;
```

Using:

``` ts [using]
import WineHorn from "winehorn";
import plugin from "my-plugin";

let wh: WineHorn = new WineHorn();

wh.use(plugin);
```

All plugins are written to the `WineHorn.$` registry and can also be accessed through this registry, for example:

``` ts [using]
import WineHorn from "winehorn";
import plugin from "my-plugin"; // let's assume this plugin has a "hello" method

let wh: WineHorn = new WineHorn();

wh.use(plugin);

wh.$.myPlugin.hello();
```

### WineHorn.middleware()

This method accepts and installs [express middleware](https://expressjs.com/en/guide/using-middleware.html)

``` ts
WineHorn.middleware(middleware: RequestHandler): void;
```

``` ts [using]
import WineHorn from "winehorn";
import express from "express";

let wh: WineHorn = new WineHorn();

wh.middleware(express.json());
```
