const fs = require('fs');
const path = require('path');

function generate(length: number): string {
    var chars = 'qwertyuiopasdfghjklzxcvbnm';
    var generation = '';
    for(var i = 0; i < length; i++) {
        generation += chars[Math.floor(Math.random() * chars.length)];
    }
    return generation;
}

class Dababase {
    path: string;
    idUsage: boolean;

    constructor(path: string, idUsage: boolean) {
        this.path = path;
        this.idUsage = idUsage;
    };

    setup() {
        var source = `${process.cwd()}/${this.path}`;
        var parent = path.dirname(source);

        fs.readdir(parent, 'utf-8', (err, files) => {
            if (err) throw err;

            if (files.includes(this.path)) {} else {
                fs.writeFile(source, '[]', (err) => {
                    if (err) throw err;
                });
            }
        });
    };

    insert(entries: object) {
        var source = `${process.cwd()}/${this.path}`;
        fs.readFile(source, (err, data) => {
            var obj = JSON.parse(data);

            if (this.idUsage) {
                entries["_id"] = generate(8);
            }
            obj.push(entries);

            obj = JSON.stringify(obj);

            fs.writeFile(this.path, obj, (err) => {
                if (err) throw err;
            });
        });
    };

    query(entry: object, callback: (err: Error, query: object)) {
        var source = `${process.cwd()}/${this.path}`;
        fs.readFile(source, (err, data) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            
            callback(err, Array.from(obj).find((object) => object.hasOwnProperty(keys) && object[keys] === values))
        });
    };

    queryAll(entry: object, callback: (err: Error, query: object[])) {
        var source = `${process.cwd()}/${this.path}`;
        fs.readFile(source, (err, data) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            
            callback(err, Array.from(obj).filter((object) => object.hasOwnProperty(keys) && object[keys] === values))
        });
    };

    remove(entries: object) {}
}

module.exports = {Dababase};