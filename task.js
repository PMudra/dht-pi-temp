var schedule = require('node-schedule');
var sqLite3 = require('sqlite3').verbose();
var debug = require('debug')('dht-pi-temp:task');
var nconf = require('nconf');

nconf.argv().env().file({file: './config.json'});
debug("dht:pin=" + nconf.get('dht:pin'));

function getData() {
    try {
        var dht = require('dht-sensor');
        var current = dht.read(11, config.get('dht:pin'));
        return current;
    } catch (err) {
        debug("Cannot access dht sensor");
        return {temperature: -1, humidity: -1};
    }
}

schedule.scheduleJob('*/1 * * * *', function () {

    var db = new sqLite3.Database('./sqlite.db');

    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS weather ('id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 'datetime' DATETIME DEFAULT CURRENT_TIMESTAMP, 'temperature' REAL, 'humidity' REAL)");

        var current = getData();

        db.run("INSERT INTO weather ('id','temperature','humidity') VALUES (NULL,'" + current.temperature + "','" + current.humidity + "')");
        debug("Data written to db: temperature=" + current.temperature + ", humidity=" + current.humidity);
    });

    db.close();

});

