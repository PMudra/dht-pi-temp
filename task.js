var schedule = require('node-schedule');
var sqLite3 = require('sqlite3').verbose();
var debug = require('debug')('dht-pi-temp:task');

schedule.scheduleJob('*/1 * * * *', function () {

    var db = new sqLite3.Database('./sqlite.db');

    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS weather ('id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 'datetime' DATETIME DEFAULT CURRENT_TIMESTAMP, 'temperature' REAL, 'humidity' REAL)");

        // todo
        db.run("INSERT INTO weather ('id','temperature','humidity') VALUES (NULL,'0.12','0.13')");

    });

    db.close();

    debug("data written");
});


