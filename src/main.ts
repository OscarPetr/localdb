const fs = require('fs');
const path = require('path');
const { generate } = require('./general');

class Dababase {
    filepath: string;
    idUsage: boolean;
    source: string;

    constructor(options?: { filepath?: string, idUsage?: boolean }) {
        this.filepath = options?.filepath || 'db.json';
        this.idUsage = options?.idUsage || false;
        this.source = `${process.cwd()}/${this.filepath}`;
    }

    // LOAD METHOD
    load() {
        fs.readdir(path.dirname(this.source), 'utf-8', (err: Error, files: string[]) => {
            if (err) throw err;

            if (files.includes(this.filepath)) { } else {
                fs.writeFile(this.source, '[]', (err: Error) => {
                    if (err) throw err;
                });
            }
        });
    }

    // INSERT METHOD
    insert(entries: object, callback: (err: Error) => void) {
        fs.readFile(this.source, (err: Error, data: any) => {
            if (err) throw err;

            var obj = JSON.parse(data);

            if (this.idUsage) entries = { ...entries, _id: generate(8) };
            obj.push(entries);
            obj = JSON.stringify(obj);

            fs.writeFile(this.filepath, obj, (err: Error) => {
                callback(err);
            });
        });
    }

    // QUERY METHOD
    query(entry: object, callback: (err: Error, query: any) => void) {
        fs.readFile(this.source, (err: Error, data: any) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var filter = Array.from(obj).find((object: any) => object.hasOwnProperty(keys) && object[keys] === values);

            callback(err, filter);
        });
    }

    // QUERYALL METHOD
    queryAll(entry: object, callback: (err: Error, query: any[]) => void) {
        fs.readFile(this.source, (err: Error, data: any) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var filter = Array.from(obj).filter((object: any) => object.hasOwnProperty(keys) && object[keys] === values);

            callback(err, filter);
        });
    }

    // REMOVE METHOD
    remove(entry: object, callback: (err: Error) => void) {
        fs.readFile(this.source, (err: Error, data: any) => {
            if (err) throw err;

            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var index = Array.from(obj).findIndex((object: any) => object.hasOwnProperty(keys) && object[keys] === values);

            obj.splice(index, index);
            obj = JSON.stringify(obj);

            fs.writeFile(this.source, obj, (err: Error) => {
                callback(err);
            });
        });
    }

    // REMOVEALL METHOD
    removeAll(entries: object, callback: (err: Error) => void) {
        fs.readFile(this.source, (err: Error, data: any) => {
            if (err) throw err;

            var obj = JSON.parse(data);
            var keys = Object.keys(entries)[0];
            var values = Object.values(entries)[0];
            var indecies: number[] = [];

            obj.forEach((object: any, index: number) => object.hasOwnProperty(keys) && object[keys] === values ? indecies.push(index) : null);

            for (var i = 0; i < indecies.length; i++) {
                obj.splice(indecies[i] - i, indecies[i] - i);
            }

            obj = JSON.stringify(obj);

            fs.writeFile(this.source, obj, (err: Error) => {
                callback(err);
            });
        });
    }

    // UPDATE METHOD
    update(from: object, to: object, callback: (err: Error) => void) {
        fs.readFile(this.source, (err: Error, data: any) => {
            if (err) throw err;

            var obj = JSON.parse(data);

            this.query(from, (err: Error, query: any) => {
                query[Object.keys(from)[0]] = Object.values(to)[0];

                var keys = Object.keys(from)[0];
                var values = Object.values(from)[0];
                var index = Array.from(obj).findIndex((object: any) => object.hasOwnProperty(keys) && object[keys] === values);

                obj[index] = query;
                obj = JSON.stringify(obj);

                fs.writeFile(this.source, obj, (err: Error) => {
                    callback(err);
                });
            });
        });
    }

    // UPDATEALL METHOD
    updateAll(from: object, to: object, callback: (err: Error) => void) {

    }

    // MOVE METHOD
    move(filepath: string, callback: (err: Error) => void) {
        var old = this.source;

        this.filepath = `${filepath}/${this.filepath}`;
        this.source = `${process.cwd()}/${this.filepath}`;

        fs.rename(old, this.source, (err: Error) => {
            callback(err);
        });
    }

    // RENAME METHOD
    rename(filename: string, callback: (err: Error) => void) {
        var old = this.source;

        this.filepath = filename;
        this.source = `${process.cwd()}/${this.filepath}`;

        fs.rename(old, this.source, (err: Error) => {
            callback(err);
        });
    }

    // CLONE METHOD
    clone(filepath: string, callback: (err: Error) => void) {
        fs.copyFile(this.source, `${filepath}/${this.filepath}`, (err: Error) => {
            callback(err);
        });
    }

    // SIZE FUNCTION
    size(type: 'B' | 'KB' | 'MB' | 'GB' | 'TB', callback: (err: Error, size: number) => number) {
        fs.stat(this.source, { bigint: false }, (err: Error, stats: { size: number }) => {
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
    props(callback: (err: Error, data: object) => object) {
        fs.stat(this.source, { bigint: false }, (err: Error, stats: { atime: string, birthtime: string, ctime: string, mtime: string }) => {
            var obj = {
                birthTime: `${stats.birthtime}`,
                lastAccess: `${stats.atime}`,
                lastModified: `${stats.mtime}`,
                lastInode: `${stats.ctime}`
            }

            callback(err, obj);
        });
    }
}

export = Dababase;