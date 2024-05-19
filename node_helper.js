const NodeHelper = require("node_helper");
const bodyParser = require("body-parser");

module.exports = NodeHelper.create({
	start () {
		this.setupWebhook();
	},

	setupWebhook () {
		const self = this;

		// Use body parser middleware to handle JSON request bodies
		this.expressApp.use(bodyParser.json());

		// Define the POST route for /webhook
		this.expressApp.post("/webhook", (req, res) => {
			if (req.body && req.body.message) {
				self.sendSocketNotification("WEBHOOK_MESSAGE", { message: req.body.message });
			}
			res.status(200).send("Message received");
		});
	},

	socketNotificationReceived (notification, payload) {
		if (notification === "CONFIG") {
			this.config = payload;
		}
	}
});
