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
    source: string;

    constructor(path: string, idUsage: boolean) {
        this.path = path;
        this.idUsage = idUsage;
        this.source = `${process.cwd()}/${this.path}`;
    }

    // SETUP METHOD
    setup() {
        fs.readdir(path.dirname(this.source), 'utf-8', (err, files) => {
            if (err) throw err;

            if (files.includes(this.path)) {} else {
                fs.writeFile(this.source, '[]', (err) => {
                    if (err) throw err;
                });
            }
        });
    }

    // INSERT METHOD
    insert(entries: object) {
        fs.readFile(this.source, (err, data) => {
            var obj = JSON.parse(data);

            if (this.idUsage) entries["_id"] = generate(8);
            obj.push(entries);

            obj = JSON.stringify(obj);
            fs.writeFile(this.path, obj, (err) => {
                if (err) throw err;
            });
        });
    }

    // QUERY METHOD
    query(entry: object, callback: (err: Error, query: object)) {
        fs.readFile(this.source, (err, data) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            
            callback(err, Array.from(obj).find((object) => object.hasOwnProperty(keys) && object[keys] === values))
        });
    }

    // QUERYALL METHOD
    queryAll(entry: object, callback: (err: Error, query: object[])) {
        fs.readFile(this.source, (err, data) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            
            callback(err, Array.from(obj).filter((object) => object.hasOwnProperty(keys) && object[keys] === values))
        });
    }

    // REMOVE METHOD
    remove(entry: object) {
        fs.readFile(this.source, (err, data) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            
            var index = Array.from(obj).findIndex((object) => object.hasOwnProperty(keys) && object[keys] === values);
            delete obj[index];
        });
    }
}

module.exports = Dababase;