# vfs
> speedy reads and writes for simple file system trees

```js
vfs.read(src, (err, data) => {
  if (err) throw err
  vfs.write(dest, data, (err) => {
    if (err) throw err
    console.log(`copied from ${src} to ${dest}`)
  })
})
```

`vfs` recursively reads and writes both files and folders by modelling them as strings and maps respectively. For example, consider the following folder structure:

```
foo
└── bar
    ├── hello.txt
    └── world.txt
```

In this scenario, `vfs.read("foo", callback)` might yield the following:

```js
foo = {
  "bar": {
    "hello.txt": "greetings human",
    "world.txt": "welcome to mars"
  }
}
```

Furthermore, `vfs.read("foo/bar/hello.txt", callback)` would yield `"greetings human"`, equivalent to the output of `fs.readFile` called with the `"utf8"` option.

Note that this module doesn't handle any kinds of links for simplicity's sake, although this is subject to change.

## usage
[![npm badge]][npm package]

### `read(path, callback(err, data))`
Reads the file or folder specified by `path` and returns its data via `callback`.

```js
vfs.read(path, (err, data) => {
  if (err) throw err
  console.log(path + ": " + JSON.stringify(data, null, 2))
})
```

### `write(path, data, callback(err))`
Writes `data` (can be a tree structure) to the given path, calling `callback` upon completion. Will error if a directory exists at the specified location.

## related
* [`semibran/scaffy`][semibran/scaffy]: tiny project scaffolding tool

[npm badge]:       https://nodei.co/npm/@semibran/vfs.png?mini
[npm package]:     https://npmjs.com/package/@semibran/vfs
[semibran/scaffy]: https://github.com/semibran/scaffy
