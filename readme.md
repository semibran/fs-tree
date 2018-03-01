# vfs
> speedy reads and writes for file system trees

For the sake of simplicity, we can represent a folder as an object whose keys correspond to the names of its contents. Files can be modelled as simple strings.

```js
let folder = {
  foo: {
    bar: {
      hello: "greetings human",
      world: "welcome to mars"
    }
  }
}
```

This module contains two functions, `read(path, cb(err, tree))` and `write(path, tree, cb(err))` for creating and using these kinds of data structures.

## usage
[![npm badge]][npm package]

[npm badge]:      https://nodei.co/npm/@semibran/vfs.png?mini
[npm package]:    https://npmjs.com/package/@semibran/vfs
