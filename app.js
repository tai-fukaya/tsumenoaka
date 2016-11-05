'use strict';
const Tweet = require('./Tweet');
const setting = require('./setting');
const fs = require('fs');

let screenName = 'ochyai';

let tweet = new Tweet(setting);
let items = [];

// できるだけすべてのツイートの取得
getAllTweets(screenName);

function getTweets(option, callback) {
	tweet.getUserTimeline(option, callback);
}

function getAllTweets(screenName) {
	let maxId = undefined;
	let count = 200;
	tweet.getUserTimeline({
		screen_name: screenName,
		count: count
	},function callback(error, tweets) {
		if (error) {
			console.err(error);
			outputTweets();
			return;
		}
		console.log(`tweets: ${tweets.length}`);
		// lengthが１以下、または、エラーなら、終了
		if (tweets.length <= 1) {
			console.log('finish');
			outputTweets();
			return;
		}

		tweets.map((tweet, index) => {
			// maxIdも含めて検索するので、２回目は省く
			if (index === 0 && maxId) {
				return;
			}
			items.push(tweet.text);
		});

		// これをキーにして、過去分を取得する
		maxId = tweets[tweets.length - 1].id_str;
		console.log(maxId);
		tweet.getUserTimeline({
			screen_name: screenName,
			count: count,
			max_id: maxId
		}, callback);
	});
}
function outputTweets() {
	// ファイルに書き出し
	let text = items.join('\n');
	let now = Date.now();
	fs.writeFile(
		`data/${screenName}.raw.txt`,
		text,
		(err) => {
			if (err) console.err(err);
			console.log('success raw');
		}
	);
	fs.writeFile(
		`data/${screenName}.txt`,
		text.replace(/(RT|@|http)[^ \n]*/g, ''), // RT @{hoge}, http{hoge}は削除
		(err) => {
			if (err) console.err(err);
			console.log(`success ${now} ${screenName}`);
		}
	);
}
