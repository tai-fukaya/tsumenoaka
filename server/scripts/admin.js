(function($) {
	var $head = $('.js-tsumenoaka-head'),
		$table = $('.js-tsumenoaka-data'),
		$result = $('.js-twitter-result');

	// ソケット
	var socket = io('/admin');
	socket.on('request generate', function(data) {
		showTweetResult(data);
	});
	socket.on('show bigname personality', function(data) {
		showPersonalityBigname(data);
	});
	socket.on('show tweet personality', function(data) {
		showPersonalityTweet(data);
	});

	$('.js-button-senddata').on('click', function() {
		var items = [];
		$table.find('tr').each(function() {
			var $self = $(this);
			var item = {};
			item.id = $self.find('td').first().text();
			item.bigname = +($self.find('.js-bigname-value').val() || 0);
			item.tweet = +($self.find('.js-tweet-value').val() || 0);
			item.diff = +($self.find('.js-diff-value').val() || 0);
			items.push(item);
		});
		var data = {
			bignameId : $('.js-bigname-id').val(),
			twitterId : $('.js-twitter-id').val(),
			personality : items
		};
		socket.emit('send generate data', data);
	});
	$('.js-button-init').on('click', function() {
		socket.emit('init');
	});
	$table.on('change', '.js-bigname-value, .js-tweet-value', function() {
		$table.find('tr').each(function() {
			var $self = $(this),
				bignameValue = $self.find('.js-bigname-value').val(),
				tweetValue = $self.find('.js-tweet-value').val();
			
			if (!tweetValue) {
				$self.find('.js-tweet-value').val(0.0);
				tweetValue = 0.0;
			}
			var diff = +bignameValue - +tweetValue;
			diff = ("" + diff).slice(0, 5);
			$self.find('.js-diff-value').val(diff);
		});
	});

	showTweetResult({
		bignameId : "trump",
		twitterId: "test",
		result: "てすと"
	});
	showPersonalityBigname({
		"id": "donaldtrump",
		"name": "ドナルド・トランプ",
		"personality" : [
			{
				"id" : "Openness",
				"percentile" : 0.9146784881175186
			},
			{
				"id" : "Conscientiousness",
				"percentile" : 0.9669232451450606
			},
			{
				"id" : "Extraversion",
				"percentile" : 0.988866341794915
			},
			{
				"id" : "Agreeableness",
				"percentile" : 0.9349618657525601
			},
			{
				"id" : "Neuroticism",
				"percentile" : 0.9726571151399218
			}
		]
	});


	// ツイートの取得結果
	function showTweetResult(data) {
		$result.val(data.result);
		showTitle(data.bignameId, data.twitterId);
	}
	function showTitle(bignameId, twitterId) {
		$('.js-bigname-id').val(bignameId);
		$('.js-twitter-id').val(twitterId);
	}
	// 解析結果の表示
	function showPersonalityBigname(data) {
		var items = data.personality;
		items.forEach(function(personality) {
			var id = personality.id.toLowerCase();
			var $row = $table.find('.' + id);
			$row.find('.js-bigname-value').val(("" + personality.percentile).slice(0, 4));
		});
		$('.js-bigname-value').first().trigger('change');
	}
	function showPersonalityTweet(data) {
		var items = data.personality;
		items.forEach(function(personality) {
			var id = personality.id.toLowerCase();
			var $row = $table.find('.' + id);
			$row.find('.js-tweet-value').val(("" + personality.percentile).slice(0, 4));
		});
		$('.js-tweet-value').first().trigger('change');
	}
})(jQuery);