var fs = require("fs")
var path = require("path")
var join = path.join
var extname = path.extname

exports.read = read
exports.write = write

function read(path, opts, callback) {
	if (typeof opts === "function") {
		callback = opts
		opts = {}
	}
	fs.stat(path, function (err, stats) {
		if (err) return callback(err)
		if (stats.isFile()) {
			return fs.readFile(path, "utf8", callback)
		}
		var tree = {}
		var base = path
		fs.readdir(path, function (err, names) {
			if (err) return callback(err)
			// remove ignored extensions (could probably be done in main loop)
			if (opts.ignore) {
				var ignore = opts.ignore
				for (var i = names.length; i--;) {
					var name = names[i]
					if (ignore.indexOf(name) >= 0 || ignore.indexOf(extname(name)) >= 0) {
						names.splice(i, 1)
					}
				}
			}
			if (!names.length) return callback(null, {})
			for (var i = 0; i < names.length; i++) {
				var name = names[i]
				// use closure to preserve filename value
				;(function (name) {
					read(join(base, name), opts, function (err, data) {
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

function write(path, data, callback) {
	if (!data || typeof data !== "object") {
		return fs.writeFile(path, data, callback)
	}
	if (!fs.existsSync(path)) {
		fs.mkdir(path, function (err) {
			if (err) return callback(err)
			writeContents(path, data, callback)
		})
	} else {
		writeContents(path, data, callback)
	}
}

function writeContents(base, tree, callback) {
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
}
