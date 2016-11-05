'use strict';
const Twitter = require('twitter');

class Tweet {
	constructor(setting) {
		this.client = new Twitter(setting);
	}
	getUserTimeline(option, callback) {
		option = option || {};
		let uri = '/statuses/user_timeline.json';
		if (!option.count) option.count = 10;

		this.client.get(uri, option, 
			(error, tweets, response) => {
				(callback || function(){})(error, tweets);
			});
	}
}

module.exports = Tweet;