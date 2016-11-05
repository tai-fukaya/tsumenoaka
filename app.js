'use strict';
const Tweet = require('./Tweet');
const setting = require('./setting');
const fs = require('fs');

let screenName = 'liuliu_taifuun';

let tweet = new Tweet(setting);
tweet.getUserTimeline({
	screen_name: screenName
},function callback(error, tweets) {
	if (error) console.err(error);
	console.log(`tweets: ${tweets.length}`);
	// lengthが１以下、または、エラーなら、終了
	let items = [];
	tweets.map((tweet) => {
		
		items.push(tweet.text);
	});

	// これをキーにして、過去分を取得する
	console.log(tweets[tweets.length - 1].id_str);

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
});