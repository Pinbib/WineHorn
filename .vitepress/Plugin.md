---
outline: deep
---

# Plugin

This is an interface for extending the capabilities of WineHorn.

``` ts [import]
import Plugin from "winehorn/Plugin";
```

``` ts
default interface Plugin<T> {
 name: string;
 id: string;

 install(wh: WineHorn): T;
}
```

- `name` - public name of the plugin.
- `id` - the name under which the plugin will be registered in the [`WineHorn.$`](/WineHorn#winehornuse) registry.
- `install(wh: WineHorn): T` - a function that returns an object (i.e. `<T>`) that will be written to the register [`WineHorn.$`](/WineHorn#winehornuse).

To install the plugin, use the method [`WineHorn.use<T>(plugin: Plugin<T>): void`](/WineHorn#winehornuse)
