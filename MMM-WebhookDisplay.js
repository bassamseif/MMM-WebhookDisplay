Module.register("MMM-WebhookDisplay", {
	// Default module config
	defaults: {
		message: ""
	},

	// Define required scripts
	getScripts () {
		return [];
	},

	// Define required styles
	getStyles () {
		return ["MMM-WebhookDisplay.css"];
	},

	// Override dom generator
	getDom () {
		var wrapper = document.createElement("div");
		wrapper.id = "webhook-message";
		wrapper.innerHTML = this.config.message;
		return wrapper;
	},

	// Override start method
	start () {
		Log.info(`Starting module: ${this.name}`);
		this.sendSocketNotification("CONFIG", this.config);
	},

	// Override notification handler
	notificationReceived (notification, payload, sender) {
		if (notification === "WEBHOOK_MESSAGE") {
			Log.info(`Received WEBHOOK_MESSAGE: ${payload.message}`);
			this.config.message = payload.message;
			this.updateDom();
		}
	},

	socketNotificationReceived (notification, payload) {
		if (notification === "WEBHOOK_MESSAGE") {
			Log.info(`Received WEBHOOK_MESSAGE: ${payload.message}`);
			this.config.message = payload.message;
			this.updateDom();
		}
	}
});
