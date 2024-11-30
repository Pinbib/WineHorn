---
outline: deep
---

# Validator

Allows you to control a query (`req.query`) using lightweight schemas.
A schema is an object that defines what parameters a request should have, and what type they can be.

``` ts [import]
import {Schema} from "winehorn/Validator";
```

``` ts
type Types = "string" | "number" | "boolean" | "array" | "undefined";

type ArrayDef = Types[]

interface Schema {
 [key: string]: Types | Schema | ArrayDef;
}
```

For example, if your schema looks like this:

``` ts
import {Schema} from "winehorn/Validator";

let sch: Schema = {
    age: "number",
    name: "string",
    hasHome: "boolean"
};

```

So the query parameters (`req.query`) should look like this:

``` json
{
    "name": "Alex",
    "age": 21,
    "hasHome": true
}
```

The query validation function is built into [Route](/Route).

``` ts [usingValidatorInRoute]
import WineHorn from "winehorn";
import Route from "winehorn/Route";
import {Schema} from "winehorn/Validator";

let wh: WineHorn = new WineHorn();

let student: Schema = {
    age: "number",
    name: "string",
    hasHome: "boolean"
};

let route = new Route("POST", "/student", (req, res)=>{
    console.log(req.query);
}, student);

wh.add(route);

wh.listen();
```

If a request is sent to `/student` and it does not contain the required parameters or they have an invalid type, the request will automatically be rejected.
