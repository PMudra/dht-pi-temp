var express = require('express');
var router = express.Router();
var debug = require('debug')('dht-pi-temp:dht');
var dht = require('dht-sensor');
var nconf = require('nconf');

nconf.file({file: './config.json'});
debug("dht:pin=" + nconf.get('dht:pin'));
debug("dht:sensor=" + nconf.get('dht:sensor'));

router.get('/current', function (req, res, next) {
    try {
        var current = dht.read(nconf.get('dht:sensor'), nconf.get('dht:pin'));
        res.json(current);
    } catch (err) {
        debug(err);
        next(err);
    }
});

module.exports = router;
