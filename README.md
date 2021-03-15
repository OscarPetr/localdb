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

`path: string;` → Custom path to your local database.

`idUsage: boolean;` → Every insertion to your database, package will generate an unique id in the last slot of your row.

```javascript
const db = new Database(path, idUsage);
```

## **Functions**

### insert()
This function enables you to add new properties to your locale database, with or without unique id ([#ref](#Declaring_new_database)).

### get()


### getAll()
