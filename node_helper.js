/* Magic Mirror
 * Module: MMM-UV
 *
 * By Cowboysdude
 *
 */
const NodeHelper = require('node_helper');
var wifi = require('node-wifi');
const scanner = require('node-wifi-scanner');
var wifiScanner = require('node-wifiscanner')

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getWifi: function(url) {
        var self = this;
        wifi.init({
            iface: null // network interface, choose a random wifi interface if set to null 
        });
        wifi.scan(function(err, networks) {
            if (err) {
                console.log(err);
            } else {
                var result = networks;
                self.sendSocketNotification("WIFI_RESULT", result);
                //self.getPos();
            }
        });
    },

    getPos: function(url) {
       wifiScanner.scan(function (err, towers) {
  if (err) throw err
 
  geocodeWifi(towers, function (err, location) {
    if (err) throw err
 
    console.log(location) // => { lat: 38.0690894, lng: -122.8069356, accuracy: 42 } 
  })
})
		},

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_WIFI') {
            this.getWifi(payload);
        }
    },
});
