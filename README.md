### How to start project

```bash
$ cd <myApp> && npm install
```

### Invoke node with a task manager
Mean supports the gulp task runner for various services which are applied on the code.
To start your application run -
```bash
$ gulp
```

Alternatively, when not using `gulp` (and for production environments) you can run:
```bash
$ node server
```
Then, open a browser and go to:
```bash
http://localhost:3000
```

### How to start the MongoDB from dump files

1. Install MongoDB from  `https://www.mongodb.org/downloads#production`

2. Set up the MongoDB environment.

Command Prompt: `md \data\db`
or
manually create these folders.

3. Use `mongorestore` to connect to an active `mongod` or `mongos`, use a command with the following prototype form:

`mongorestore  path to the backup` , example `D:/myFolder/data/dump/`