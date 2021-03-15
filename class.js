var fs = require('fs');
var path = require('path');
function generate(length) {
    var chars = 'qwertyuiopasdfghjklzxcvbnm';
    var generation = '';
    for (var i = 0; i < length; i++) {
        generation += chars[Math.floor(Math.random() * chars.length)];
    }
    return generation;
}
var Dababase = /** @class */ (function () {
    function Dababase(path, idUsage) {
        this.path = path;
        this.idUsage = idUsage;
    }
    ;
    Dababase.prototype.setup = function () {
        var _this = this;
        var source = process.cwd() + "/" + this.path;
        var parent = path.dirname(source);
        fs.readdir(parent, 'utf-8', function (err, files) {
            if (err)
                throw err;
            if (files.includes(_this.path)) { }
            else {
                fs.writeFile(source, '[]', function (err) {
                    if (err)
                        throw err;
                });
            }
        });
    };
    ;
    Dababase.prototype.insert = function (entries) {
        var _this = this;
        var source = process.cwd() + "/" + this.path;
        fs.readFile(source, function (err, data) {
            var obj = JSON.parse(data);
            if (_this.idUsage) {
                entries["_id"] = generate(8);
            }
            obj.push(entries);
            obj = JSON.stringify(obj);
            fs.writeFile(_this.path, obj, function (err) {
                if (err)
                    throw err;
            });
        });
    };
    ;
    Dababase.prototype.get = function (entry, callback) {
        var source = process.cwd() + "/" + this.path;
        fs.readFile(source, function (err, data) {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var lol = Array.from(obj).find(function (object) { return object.hasOwnProperty(keys) && object[keys] === values; });
            console.log(typeof lol);
            callback(err, Array.from(obj).find(function (object) { return object.hasOwnProperty(keys) && object[keys] === values; }));
        });
    };
    ;
    Dababase.prototype.getAll = function (entry, callback) {
        var source = process.cwd() + "/" + this.path;
        fs.readFile(source, function (err, data) {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var lol = Array.from(obj).filter(function (object) { return object.hasOwnProperty(keys) && object[keys] === values; });
            console.log(typeof lol);
            callback(err, Array.from(obj).filter(function (object) { return object.hasOwnProperty(keys) && object[keys] === values; }));
        });
    };
    ;
    Dababase.prototype.remove = function (entries) { };
    return Dababase;
}());
module.exports = Dababase;
