var schedule = require('node-schedule');
var sqLite3 = require('sqlite3').verbose();
var debug = require('debug')('dht-pi-temp:task');
var nconf = require('nconf');

nconf.file({file: './config.json'});
debug("dht:pin=" + nconf.get('dht:pin'));
debug("dht:sensor=" + nconf.get('dht:sensor'));

function getData() {
    try {
        var dht = require('dht-sensor');
        var current = dht.read(nconf.get('dht:sensor'), nconf.get('dht:pin'));
        return current;
    } catch (err) {
        debug("Cannot access dht sensor");
        return {temperature: -1000, humidity: -1000};
    }
}

function logError(err) {
    if (err) {
        debug(err.message);
    }
}

schedule.scheduleJob('*/1 * * * *', function () {

    var db = new sqLite3.Database('./sqlite.db', logError);

    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS weather ('id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 'datetime' DATETIME DEFAULT CURRENT_TIMESTAMP, 'temperature' REAL, 'humidity' REAL)", logError);

        var current = getData();

        db.run("INSERT INTO weather ('id','temperature','humidity') VALUES (NULL,'" + current.temperature + "','" + current.humidity + "')", function(err) {
            logError(err);
            if (!err) {
                debug("Data written to db: temperature=" + current.temperature + ", humidity=" + current.humidity);
            }
        });
    });

    db.close();

});
