---
outline: deep
---

# Route

This is the path class for the server.

``` ts [import]
import Route from "winehorn/Route";
```

``` ts
Route(method: RequestTypes, path: string, handler: RequestHandler, validator?: Schema) ;
```

- `method: RequestTypes` - specifies a request method that accepts a path (i.e.: `GET` | `POST` | `PUT` | `DELETE` | `PATCH` | `OPTIONS` | `HEAD` | `CONNECT` | `TRACE`)
- `path: string` - This is the path that will be listened to.
- `handler: RequestHandler` - callback that processes the request.
- `validator?: Schema` - an optional argument that accepts a [scheme](/Validator) according to which `req.query` will be processed.
