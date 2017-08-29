/* Magic Mirror
 * Module: MMM-UV
 *
 * By Cowboysdude
 *
 */
const NodeHelper = require('node_helper');
var WiFiControl = require('wifi-control');


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getWifi: function(url) {
    	var self = this;
       WiFiControl.init({
    debug: true
  });
   WiFiControl.scanForWiFi( function(err, response) {
    if (err) console.log(err);
    var result = response;
    self.sendSocketNotification("WIFI_RESULT", result);
  });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_WIFI') {
            this.getWifi(payload);
        }
    }
});
