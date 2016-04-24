var express = require('express');
var router = express.Router();
var debug = require('debug')('dht-pi-temp:dht');
var dht = require('dht-sensor');
var nconf = require('nconf');

nconf.file({file: './config.json'});
debug("pin=" + nconf.get('pin'));
debug("sensor=" + nconf.get('sensor'));

router.get('/current', function (req, res, next) {
    try {
        var current = dht.read(nconf.get('sensor'), nconf.get('pin'));
        res.json(current);
    } catch (err) {
        debug(err);
        next(err);
    }
});

module.exports = router;
