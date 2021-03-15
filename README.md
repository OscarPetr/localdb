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
const Database = require('localdb');
```
After we required package localdb, we can finally declare our first database with the imported class `Database`. Declaring new database takes two parameters:

`path: string` → Custom path to your local database.

`idUsage: boolean` → Every insertion to your database, package will generate an unique id in the last slot of your row.

```javascript
const db = new Database(path, idUsage);
```

## **Functions**

### setup()
This function is the first function that you have to declare before inserting or querying database. Setup will actually create or load the database (depends if the database has been declared before) with the propper datab init. No parameters are needed for declaration.

```javascript
db.setup();
```

### insert(entries)
This function enables you to add new properties/entries to your locale database, with or without unique id ([idUsage](#Declaring-new-database)). Function insert() takes one parameter – object that can have infinite entries:

`entries: object` → Inserts to your local database passed entries as arguments.

```javascript
db.insert({key: value, ...});
```

### query(entries, callback)
This function enables you to query your local database with one or more passed entries as arguments. Function query() takes two parameters – object that can have infinite entries and callback function:

`entries: object` → Queries your locale database with one or more entries passed as an argument.

`callback: function(err, data)` → If your query was not successful, the *err* parameter will inform you in your project console. On the other hand if your query was successful, your can work with the parameter *data* further in your callback function. The parameter *data* will only return the first one found in you database.

```javascript
db.query({key: value, ...}, (err, data) => {
  // your after-query syntax
});
```

### queryAll(entries, callback)
Unlike the function before, this function will query your locale database in all rows that the function will find, not only the first one as previous. Parameters and usage is the same as the query() function before.

```javascript
db.queryAll({key: value, ...}, (err, data) => {
  // your after-query syntax
});
```
