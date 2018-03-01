var fs = require("fs")
var join = require("path").join

exports.read = function read(path, callback) {
  fs.stat(path, function (err, stats) {
    if (err) return callback(err)
    if (stats.isFile()) {
      return fs.readFile(path, "utf8", callback)
    }
    var tree = {}
    var base = path
    fs.readdir(path, function (err, names) {
      if (err) return callback(err)
      if (!names.length) return callback(null, {})
      for (var i = 0; i < names.length; i++) {
        var name = names[i]
        var path = join(base, name)
        ;(function (name) {
          read(path, function (err, data) {
            if (err) return callback(err)
            tree[name] = data
            if (!--i) {
              callback(null, tree)
            }
          })
        })(name)
      }
    })
  })
}

exports.write = function write(path, data, callback) {
  if (!data || typeof data !== "object") {
    return fs.writeFile(path, data, callback)
  }
  var tree = data
  var base = path
  fs.mkdir(path, function (err) {
    if (err) return callback(err)
    var i = 0
    for (var name in tree) {
      var data = tree[name]
      var path = join(base, name)
      i++
      write(path, data, function (err) {
        if (err) return callback(err)
        if (!--i) {
          callback(null)
        }
      })
    }
    if (!i) {
      callback(null)
    }
  })
}
