# Slife

Slife is a small MySQL ORM package for Node Js beginners.

## Install & Import
First, you will need to install Slife:
```
npm i slife
```

Then you can import it in your file.
```js
const Slife = require('slife');
// or
import Slife from "slife";
```

## Instantiation
Each instance of Slife will need connection parameters. You can also create your connection by using MySQL connection string.
```js
let db = new Slife({
    host: "localhost",
    database: "my_database",
    user: "mzzay",
    password: "mypassword",
    port: 3306 // optional
});
// or
let db = new Slife("mysql://mzzay:mypassword@localhost/my_database");
```
⚠ Don't forget to close Slife instance else your program won't stop.
```js
db.end();
```
## Queries
Slife accept actually every simple query like SELECT, UPDATE, DELETE, CREATE and INSERT.

⚠ If you're using TypeScript, at the end of all queries you must add `.run()`. 

### Create table
```js
await db.createTable("my_first_table", {
    name: "VARCHAR(255)",
    age: "INT(255)"
});
```

### Insert
For Update request, you need to specify columns & value to add and table name in `into` method.

```js
await db.insert({ name: "mzzay" })
        .into("my_first_table");

// or pass an array of objects as parameter
await db.insert([{ name: "foo" },{ name: "bar" }])
        .into("my_first_table");
```

### Select
For Select request, you need to specify columns to select and table name in `from` method. `.where()` method is optional.

💡 You can use `LIMIT` and `OFFSET`. 

```js
await db.select("*")
        .from("my_first_table")
        .where("age",">", 21);

// or select one column / multiple columns
await db.select("name")
        .from("my_first_table")

await db.select(["name", "age"])
    .from("my_first_table")
    .where("age",">", 21);
    .where("name", "=", "mzzay")
```

💡 If you're using TypeScript, you can pass custom type as parameter to have auto-completion.

```ts
type User {
        name: string;
        age: number;
}

await db.select<User>("*").from("my_first_table").run();
```
### Update
For Update request, you need to specify table name and columns to update. `.where()` method is optional.
```js
await db.update("my_first_table", {
        name: "new name"
}).where("name", "=", "foo");
```

### Delete
For Delete request, you need to specify table name. `.where()` method is optional.
```js
await db.delete("my_first_table");
// or
await db.delete("my_first_table")
        .where("age", "=", 21);
```
###
Union are useful with MySQL, to use them proceed like this.
```js
await db.select("*").from("my_first_table")
        .where('name', '=', 'mzzay').union([
            db.select("*").from("my_second_table")
        ])
```

### Raw
You can execute brut SQL query by using `raw` method.
```js
await db.raw("SELECT * FROM my_first_table");
```

## Contacts
Contact me on Discord: Mzzay#6920