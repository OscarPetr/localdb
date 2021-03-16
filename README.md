# **LocalDb**

This is a local database that serves lots of different functionalities such as inserting objects of unlimited slots, removing objects, querying databases with arguments and much more. Local databases are made with the JSON structure, which means they are incredibly easy to use, insert, remove or query.

## **Dependencies**
For generating databases in local directory, the only dependency you need to include in your project is file system.
```bash
npm install --save fs
```

## **Declaring new database**
First thing comes first, you need to require this package to your Node.js project and the class `Database` will automatically load to your import statement.
```javascript
const localdb = require('localdb');
```
After we required package localdb, we can finally declare our first database with the imported class `Database`. Declaring new database takes two optional parameters:

`path?: string` → Custom path to your local database.

`idUsage?: boolean` → Every insertion to your database, package will generate an unique id in the last slot of your row.

```javascript
const db = new Database({path: 'your-path-to/db.json', idUsage: true});
```

## **Mehods**

### load()
This method is the first thing that you have to declare before inserting or querying database. Load method will actually create or load the database (depends if the database has been declared before) with the proper database rows in it. No parameters are needed for declaration.

```javascript
db.setup();
```

### insert(entries, callback)
This method enables you to add new properties/entries to your locale database, with or without unique id ([idUsage](#Declaring-new-database)). Method insert takes two parameters – object that can have infinite entries and callback function:

`entries: object` → Inserts to your local database passed entries as arguments.

`callback: (err, new)` → If there was a problem the `err` parameter will take place, but if everything was successful the `new` will return inserted object.

```javascript
db.insert({key: value, ...});
```

### query(entries, callback)
This method enables you to query your local database with one or more passed entries as arguments. Method query takes two parameters – object that can have infinite entries and callback function:

`entries: object` → Queries your locale database with one or more entries passed as an argument.

`callback: function(err, data)` → If your query was not successful, the *err* parameter will inform you in your project console. On the other hand if your query was successful, your can work with the parameter *data* further in your callback function. The parameter *data* will only return the first found object in you database.

```javascript
db.query({key: value, ...}, (err, data) => {
  // your after-query syntax
});
```

### queryAll(entries, callback)
Unlike the method before, this method will query your locale database in all rows that the method will find, not only the first one as previous. Parameters and usage is the same as the query method before.

```javascript
db.queryAll({key: value, ...}, (err, data) => {
  // your after-queryall syntax
});
```

### remove(entries, callback)
This functoin enables you to first query your database and then the found object will disappear from your locale database.

`entries: object` → Queries your locale database with one or more entries passed as an argument then removes the first one that contains entries.
```javascript
db.remove({key: value, ...});
```
### removeAll(entries, callback)

### update(entries, callback)

### updateAll(entries, callback)
