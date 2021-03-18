"use strict";
const fs = require('fs');
const path = require('path');
const { generate } = require('./general');
class Dababase {
    constructor(options) {
        this.filepath = (options === null || options === void 0 ? void 0 : options.filepath) || 'db.json';
        this.idUsage = (options === null || options === void 0 ? void 0 : options.idUsage) || false;
        this.source = `${process.cwd()}/${this.filepath}`;
    }
    // LOAD METHOD
    load() {
        fs.readdir(path.dirname(this.source), 'utf-8', (err, files) => {
            if (err)
                throw err;
            if (files.includes(this.filepath)) { }
            else {
                fs.writeFile(this.source, '[]', (err) => {
                    if (err)
                        throw err;
                });
            }
        });
    }
    // INSERT METHOD
    insert(entries, callback) {
        fs.readFile(this.source, (err, data) => {
            if (err)
                throw err;
            var obj = JSON.parse(data);
            if (this.idUsage)
                entries = Object.assign(Object.assign({}, entries), { _id: generate(8) });
            obj.push(entries);
            obj = JSON.stringify(obj);
            fs.writeFile(this.filepath, obj, (err) => {
                if (err)
                    throw err;
                callback(err);
            });
        });
    }
    // QUERY METHOD
    query(entry, callback) {
        fs.readFile(this.source, (err, data) => {
            if (err)
                throw err;
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            callback(err, Array.from(obj).find((object) => object.hasOwnProperty(keys) && object[keys] === values));
        });
    }
    // QUERYALL METHOD
    queryAll(entry, callback) {
        fs.readFile(this.source, (err, data) => {
            if (err)
                throw err;
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            callback(err, Array.from(obj).filter((object) => object.hasOwnProperty(keys) && object[keys] === values));
        });
    }
    // REMOVE METHOD
    remove(entry, callback) {
        fs.readFile(this.source, (err, data) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var index = Array.from(obj).findIndex((object) => object.hasOwnProperty(keys) && object[keys] === values);
            obj.splice(index, index);
            obj = JSON.stringify(obj);
            fs.writeFile(this.source, obj, (err) => {
                if (err)
                    throw err;
            });
        });
    }
    // REMOVEALL METHOD
    removeAll(entries, callback) {
        fs.readFile(this.source, (err, data) => {
            if (err)
                throw err;
            var obj = JSON.parse(data);
            var keys = Object.keys(entries)[0];
            var values = Object.values(entries)[0];
            var indecies = [];
            obj.forEach((object, index) => object.hasOwnProperty(keys) && object[keys] === values ? indecies.push(index) : null);
            for (var i = 0; i < indecies.length; i++) {
                obj.splice(indecies[i] - i, indecies[i] - i);
            }
            obj = JSON.stringify(obj);
            fs.writeFile(this.source, obj, (err) => {
                if (err)
                    throw err;
            });
        });
    }
    // UPDATE METHOD
    update(from, to, callback) {
        fs.readFile(this.source, (err, data) => {
            if (err)
                throw err;
            var obj = JSON.parse(data);
            this.query(from, (err, query) => {
                query[Object.keys(from)[0]] = Object.values(to)[0];
                var keys = Object.keys(from)[0];
                var values = Object.values(from)[0];
                var index = Array.from(obj).findIndex((object) => object.hasOwnProperty(keys) && object[keys] === values);
                obj[index] = query;
                obj = JSON.stringify(obj);
                fs.writeFile(this.source, obj, (err) => {
                    if (err)
                        throw err;
                    callback(err);
                });
            });
        });
    }
    // UPDATEALL METHOD
    updateAll(from, to, callback) {
    }
    // MOVE METHOD
    move(filepath, callback) {
        var old = this.source;
        this.filepath = `${filepath}/${this.filepath}`;
        this.source = `${process.cwd()}/${this.filepath}`;
        fs.rename(old, this.source, (err) => {
            if (err)
                throw err;
            callback(err);
        });
    }
    // RENAME METHOD
    rename(filename, callback) {
        var old = this.source;
        this.filepath = filename;
        this.source = `${process.cwd()}/${this.filepath}`;
        fs.rename(old, this.source, (err) => {
            if (err)
                throw err;
            callback(err);
        });
    }
    // CLONE METHOD
    clone(filepath, callback) {
        fs.copyFile(this.source, `${filepath}/${this.filepath}`, (err) => {
            callback(err);
        });
    }
    // SIZE FUNCTION
    size(type, callback) {
        fs.stat(this.source, { bigint: false }, (err, stats) => {
            var size = stats.size;
            switch (type) {
                case 'KB':
                    size = size / 1000;
                    break;
                case 'MB':
                    size = size / 1000000;
                    break;
                case 'GB':
                    size = size / 1000000000;
                    break;
                case 'TB':
                    size = size / 1000000000000;
                    break;
            }
            callback(err, size);
        });
    }
    // PROPS FUNCTION
    props(callback) {
        fs.stat(this.source, { bigint: false }, (err, stats) => {
            var obj = {
                birthTime: `${stats.birthtime}`,
                lastAccess: `${stats.atime}`,
                lastModified: `${stats.mtime}`,
                lastInode: `${stats.ctime}`
            };
            callback(err, obj);
        });
    }
}
module.exports = Dababase;
