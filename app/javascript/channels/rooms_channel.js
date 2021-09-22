import consumer from "./consumer"

const RoomsChannel = consumer.subscriptions.create("RoomsChannel", {
  connected() {
		console.log("Connected to the rooms channel. (rooms_chanel.js)");
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
		console.log("Received data from the rooms channel. (rooms_channel.js: )");
    // Called when there's incoming data on the websocket for this channel
  }
});

export default RoomsChannel
