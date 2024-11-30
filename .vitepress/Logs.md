---
outline: deep
---

# Logs

`WineHorn` has built-in functionality for logging and storing requests and responses for error detection.

## Directories

When `WineHorn` is started, the following directories are automatically created:

``` text
.
└─ log
   ├─ response
   ├─ in.log
   ├─ out.log
   └─ system.log
```

Each request is assigned its own id (serial number) under which it, the response to it, and the response body will be recorded.

### response

This is the directory where response bodies are written in compressed format (compressed via `gzip` from `node:zlib`). All files are named according to `{id}.zlog` so you can find which request this response belongs to.

### in.log

A file that records all occurrences (i.e. requests) with supporting information according to the pattern: `[{id}] {date} <<< {method} {path} {ip}`.

### out.log

A file in which all outputs (i.e. responses) are recorded with supporting information according to the pattern: `[{id}] {date} >>> {method} {status} {path} {ip}`.

### system.log

A file in which system messages are recorded.
