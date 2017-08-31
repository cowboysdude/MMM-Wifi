/* Magic Mirror
 * Module: MMM-Fun
 *
 * By Mykle1
 *
 */
Module.register("MMM-Wifi", {

    // Module config defaults.
    defaults: {
        animationSpeed: 3000, // fade in and out speed
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 20 * 1000,
        rotateInterval: 60 * 1000,
        network: '',
        seeall: true,
        maxWidth: "100%"
    },

    getStyles: function() {
        return ["MMM-Wifi.css"];
    },

    getWifi: function() {
        this.sendSocketNotification('GET_WIFI');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'WIFI_RESULT') {
            this.processWifi(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }

            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
        if (notification === 'POS_RESULT') {
            this.processPos(payload);
        }
    },

    processWifi: function(data) {
        this.today = data.Today;
        this.Wifi = data;
        this.loaded = true;
    },

    processPos: function(data) {
        this.Pos = data;
        console.log(this.Pos);
    },

    scheduleCarousel: function() {
        console.log("Showing Network[s] Status");
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getWifi();
        }, this.config.updateInterval);
        this.getWifi(this.config.initialLoadDelay);
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.Wifi = {};
        this.activeItem = 0;
        this.rotateInterval = null;
        this.updateInterval = null;
        this.scheduleUpdate();
    },



    getDom: function() {
        var Wifi = this.Wifi;

        var wrapper = document.createElement("ul");
        wrapper.style.maxWidth = this.config.maxWidth;

        if (this.config.seeall != true) {
            for (var i = 0; i < this.Wifi.length; i++) {
                if (this.Wifi[i].ssid == this.config.network) {

                    var SSid = document.createElement("li");
                    SSid.classList.add("wifi");
                    SSid.innerHTML = "Network: <font color=#7cf6be>" + this.Wifi[i].ssid + "</font>";
                    wrapper.appendChild(SSid);

                    var Secret = document.createElement("li");
                    Secret.classList.add("wifi");
                    Secret.innerHTML = "Security: <font color=#7cf6be>" + this.Wifi[i].security + "</font>";
                    wrapper.appendChild(Secret);

                    var Mac = document.createElement("li");
                    Mac.classList.add("wifi");
                    Mac.innerHTML = "MAC: <font color=#7cf6be>" + this.Wifi[i].mac + "</font>";
                    wrapper.appendChild(Mac);

                    var Signal = document.createElement("li");
                    Signal.classList.add("wifi");
                    Signal.innerHTML = "Signal: <meter value=" + this.Wifi[i].signal_level + " min='-100' max='0'></meter>";
                    wrapper.appendChild(Signal);

                    var Channel = document.createElement("li");
                    Channel.classList.add("wifi");
                    Channel.innerHTML = "Channel <font color=#fff4b7>" + this.Wifi[i].frequency + "<font>";
                    wrapper.appendChild(Channel);
                }
            }
        } else {
            var keys = Object.keys(this.Wifi);
            if (keys.length > 0) {
                if (this.activeItem >= keys.length) {
                    this.activeItem = 0;
                }
                var Wifi = this.Wifi[keys[this.activeItem]];


                var SSid = document.createElement("li");
                SSid.classList.add("wifi");
                SSid.innerHTML = "Network: <font color=#7cf6be>" + Wifi.ssid + "</font>";
                wrapper.appendChild(SSid);

                var Secret = document.createElement("li");
                Secret.classList.add("wifi");
                Secret.innerHTML = "Security: <font color=#7cf6be>" + Wifi.security + "</font>";
                wrapper.appendChild(Secret);

                var Mac = document.createElement("li");
                Mac.classList.add("wifi");
                Mac.innerHTML = "MAC: <font color=#7cf6be>" + Wifi.mac + "</font>";
                wrapper.appendChild(Mac);

                var Signal = document.createElement("p");
                Signal.classList.add("wifi");
                Signal.innerHTML = "Signal <meter value=" + Wifi.signal_level + " min='-100' max='0'></meter>";
                wrapper.appendChild(Signal);

                var Channel = document.createElement("li");
                Channel.classList.add("wifi");
                Channel.innerHTML = "Channel <font color=#fff4b7>" + Wifi.frequency + "<font>";
                wrapper.appendChild(Channel);
            }
        }
        return wrapper;
    },
});
