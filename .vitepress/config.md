--- 
outline: deep
---

# Config

Used to configure the program as well as built-in plugins.

``` ts
interface Config {
 createBackupsAfter?: number,

 tilde?: {
  src?: string;
  preload?: boolean;
 }
}
```

Each [built-in plugin](/builtinplugins) has its own built-in field in the config.
