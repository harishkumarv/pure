/* eslint-env browser */

import eio from 'engine.io-client/engine.io';
import { bus, config } from '../../core.js';
/* eslint-env browser */

var backOff = 1, client, protocol = config.server.protocol, host = config.server.apiHost;

function disconnected() {

	/* eslint-disable block-scoped-var, no-use-before-define */
	var connectionStatus = "offline";

	if (backOff < 256) backOff *= 2;
	else backOff = 256;

	bus.emit("setstate", {
		app: { connectionStatus, backOff}
	});
	setTimeout(connect, backOff * 1000);
}

function onMessage(message) {
	var stateChange = JSON.parse(message); // change it to string pack
	bus.emit("setstate", stateChange);
}

function connect() {
	client = new eio.Socket((protocol === "https:" ? "wss:" : "ws:") + "//" + host, {
		jsonp: "createElement" in document // Disable JSONP in non-web environments, e.g.- react-native
	});

	client.on("close", disconnected);

	client.on("open", function() {
		var connectionStatus = "online";
		backOff = 1;
		bus.emit("setstate", {
			app: { connectionStatus, backOff}
		});
	});

	client.on("message", onMessage);
}
