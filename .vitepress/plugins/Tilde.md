---
outline: deep
---

# Tilde

This is a plugin for reactive work with files as if from a db. A shell for [`the-lopster`](https://github.com/Pinbib/The-Lopster).

| Name | id |
| - | -: |
| `Tilde` | `tl` |

``` ts [import]
import Tilde from "winehorn/Tilde";
```

``` ts [using]
import WineHorn from "winehorn";
import Tilde from "winehorn/Tilde";

let wh: WineHorn = new WineHorn();
wh.use(Tilde)
```

## Config

```ts
interface Config {
    // ...
 tilde?: {
  src?: string;
  preload?: boolean;
 }
}
```

- `src?: string` - specifies the directory where the files will be created.
- `preload?: boolean` - specifies whether to automatically load files from `src`.

## Methods

### Tilde.create()

Creates or loads a table. The [specified extension](/plugins/Tilde#tildextension) is used when creating it.

``` ts
Tilde.create(table: string): void | TL;
```

Using:

``` ts [using]
// ...

wh.$.tl.create("Students")
```

### Tilde.close()

Removes the table from the loaded ones.

```ts
Tilde.close(table: string): void;
```

Using:

``` ts [using]
// ...

wh.$.tl.create("Students");

wh.$.tl.close("Students");

```

The file itself is not deleted, the instance of the class for working with this file is deleted.

### Tilde.delete()

Deletes the file the table is working with.

``` ts
Tilde.delete(table: string): void;
```

Using:

``` ts [using]
// ...

wh.$.tl.create("Students");

wh.$.tl.delete("Students");
```

### Tilde.get()

Returns the specified table.

``` ts
Tilde.get(table: string): TL | undefined;
```

Using:

``` ts [using]
// ...

wh.$.tl.create("Students");

let students = wh.$.tl.get("Students");
```

### Tilde.extension

Specifies the extension with which files will be created. The default is `json`.

``` ts
type extensions = "json" | "ini" | "yaml" | "toml" | "xml";

get Tilde.extension(ext: extensions);
```

### Tilde.length()

Returns the number of tables created.

``` ts
get Tilde.length: number;
```

### Tilde.use()

Installs the extension for [`the-lopster`](https://github.com/Pinbib/The-Lopster).

``` ts
Tilde.use(ext: Extension): void;
```
