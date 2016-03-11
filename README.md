# dht-pi-temp

## Setup

1. Connect your dht sensor to your pi
2. Check if your sensor is working
    * https://github.com/entercritical/dht-sensor
    * https://github.com/adafruit/Adafruit_Python_DHT
3. Get the sources of this repository
4. Run ```npm install```
5. Configure config.json
    * Find the BCM number of your pin https://pinout.xyz/
6. Run ```npm start```

## Debug

Run ```DEBUG=dht-pi-temp:* npm start```

## Use

### Get current temperature

Url: ```GET /temp```

Example response: ```{"temperature":21}```