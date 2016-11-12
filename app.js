'use strict';
/**
 * @author 深谷泰士
 */
const http = require('http')
	, express = require('express')
	, path = require('path')
	, app = express();

// 静的ファイル
app.use(express.static(path.join(__dirname, 'server')));

// サーバー始動
let server = http.createServer(app);
server.listen(3030, () => {
	console.log('http://localhost:3030/');
});

let io = require('socket.io')(server);

let testdata = {
	bignameId: 'donaldtrump',
	twitterId: 'test',
	personality:
	[{ id: 'Openness', bigname: 0.91, tweet: 0.2, diff: 0.71 },
	{ id: 'Conscientiousness', bigname: 0.96, tweet: 0.98, diff: -0.02 },
	{ id: 'Extraversion', bigname: 0.98, tweet: 0.5, diff: 0.48 },
	{ id: 'Agreeableness', bigname: 0.4, tweet: 0.9, diff: -0.5 },
	{ id: 'Neuroticism', bigname: 0.97, tweet: 0.6, diff: 0.37 }]
};

// 管理者
let adminIo = io.of('/admin');
// アプリ
let appIo = io.of('/app');

adminIo.on('connect', (socket) => {
	console.log('admin connect');
	socket.on('send generate data', (data) => {
		// ファイルに保存
		console.log(data);
		
		appIo.emit('success generate', data);
	});
	socket.on('init', (data) => {
		appIo.emit('init');
	});
});

appIo.on('connect', (socket) => {
	console.log('app connect');
	socket.on('generate', (data) => {
		console.log(data);
		// 仮のデータ
		socket.emit('success generate', testdata);

		// ツイートを取得して

		// 結果をファイル保存と管理者画面に送信
		adminIo.emit('request generate', {
			bignameId : data.bignameId,
			twitterId : data.twitterId,
			result : 'テスト'
		});

		// エラー、または、結果がゼロならば、エラーメッセージ
		// socket.emit('error generate');
	});
});
