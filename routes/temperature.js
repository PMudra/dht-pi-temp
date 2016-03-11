var express = require('express');
var router = express.Router();
var debug = require('debug')('dht-pi-temp:temp');
var sqLite3 = require('sqlite3').verbose();

router.get('/', function (req, res, next) {

    var db = new sqLite3.Database('./sqlite.db', sqLite3.OPEN_READONLY);

    db.get("SELECT * FROM weather ORDER BY datetime DESC", function (err, row) {
        debug("read from db: id=" + row.id + " datetime=" + row.datetime + " temperature=" + row.temperature + " humidity=" + row.humidity);
        res.json({temperature: row.temperature});
    });

    db.close();
});

module.exports = router;
