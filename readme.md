# fs-tree
> speedy recursive reads and writes for simple file system trees

```js
const { read, write } = require("@semibran/fs-tree")

read(src, (err, data) => {
  if (err) throw err
  write(dest, data, (err) => {
    if (err) throw err
    console.log(`copied from ${src} to ${dest}`)
  })
})
```

`fs-tree` provides fast recursive read and write operations for both files and folders by modelling them as strings and maps respectively. For example, consider the following folder structure:

```
foo
└── bar
    ├── hello.txt
    └── world.txt
```

In this scenario, `read("foo", callback)` might yield the following:

```js
foo = {
  "bar": {
    "hello.txt": "greetings human",
    "world.txt": "welcome to mars"
  }
}
```

Furthermore, `read("foo/bar/hello.txt", callback)` would yield `"greetings human"`, equivalent to the output of `fs.readFile` called with the `"utf8"` option.

Note that this module doesn't handle any kinds of links for simplicity's sake, although this property is subject to change.

## usage
[![npm badge]][npm package]

### `read(path, callback(err, data))`
Reads the file or folder specified by `path` and returns its data via `callback`.

```js
read(path, (err, data) => {
  if (err) throw err
  console.log(path + ": " + JSON.stringify(data, null, 2))
})
```

### `write(path, data, callback(err))`
Writes `data` to the given path, calling `callback` upon completion.

```js
write(path, data, err => {
  if (err) throw err
  console.log("write successful")
})
```

## related
* [`semibran/scaffy`][semibran/scaffy]: tiny project scaffolding tool

[npm badge]:       https://nodei.co/npm/@semibran/fs-tree.png?mini
[npm package]:     https://npmjs.com/package/@semibran/fs-tree
[semibran/scaffy]: https://github.com/semibran/scaffy
