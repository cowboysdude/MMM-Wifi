/* Magic Mirror
 * Module: MMM-UV
 *
 * By Cowboysdude
 *
 */
const NodeHelper = require('node_helper');
var wifi = require('node-wifi');


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getWifi: function(url) {
    	var self = this;
    	wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null 
    });
    	wifi.scan(function(err, networks) {
    if (err) {
        console.log(err);
    } else {
       var result = networks;
       self.sendSocketNotification("WIFI_RESULT", result);
    }
});
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_WIFI') {
            this.getWifi(payload);
        }
    }
});
