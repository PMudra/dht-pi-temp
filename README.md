# dht-pi-temp

This web service uses [dht-sensor](https://github.com/entercritical/dht-sensor) to collect temperature and humidity data every minute and stores it in a sqlite database.
This data is exposed with a rest api.

## Setup

1. Connect your dht sensor to your pi
2. Check if your sensor is working
    * https://github.com/entercritical/dht-sensor
    * https://github.com/adafruit/Adafruit_Python_DHT
3. Get the sources of this repository
4. Run ```npm install```
5. Configure config.json
    * Find the BCM number of your pin https://pinout.xyz/
    * dht.sensor must be either 11 (for DHT11) or 22 (for DHT22)
6. Run ```sudo npm start``` (root required to read sensor data)

## Debug

Run ```sudo DEBUG=dht-pi-temp:* npm start```

## Use

### Get current temperature

Url: ```GET /temp```

Example response: ```{"temperature":21}```