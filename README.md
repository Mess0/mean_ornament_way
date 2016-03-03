
## Instructions to run locally 

1) Clone repository and download npm packages 

```
git clone https://github.com/Mess0/mean_ornament_way.git
npm install
```

2. Start the MongoDB from dump files

 Install MongoDB from

```
npm install mongo
```

Set up the MongoDB environment.

```
md \data\db
```

Use `mongorestore` to connect to an active `mongod` or `mongos`, use a command with the following prototype form:
```
mongorestore  <path to the backup> ,
example: mongorestore D:/myFolder/data/dump/
```
3) Launch mongod in one terminal then run server.js

````
mongod
node server.js
````

4) Open browser `http://localhost:3000/`

