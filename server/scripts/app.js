(function($) {
	var $selectArea = $('#area-select-data'),
		$showArea = $('#area-show-data');

	$selectArea.show();
	$showArea.hide();

	// ソケット
	var socket = io('/app');
	// 生成完了ならば
	socket.on('success generate', function(data) {
		console.log(data);
		showData(data);
		$selectArea.hide();
		$showArea.show();
	});
	// 生成がエラーならば
	socket.on('error generate', function(data) {
		$('.js-message').text('ツイートが見つかりません');
	});
	// 初期表示状態に戻す
	socket.on('init', function() {
		$('.js-bigname').val('');
		$('.js-twitter-id').val('');
		$selectArea.show();
		$showArea.hide();
	});

	// ツメノアカを生成する
	$('.js-button-generate').on('click', function() {
		var bignameId = $('.js-bigname').val(),
			twitterId = $('.js-twitter-id').val();

		if (!bignameId || !twitterId) {
			return;
		}
		// ツメノアカの生成リクエスト
		socket.emit('generate', {
			bignameId : bignameId,
			twitterId : twitterId
		});

		console.log(bignameId, twitterId);
	});

	// showData(testdata);
	function showData(data) {
		var $head = $('.js-tsumenoaka-head'),
			$table = $('.js-tsumenoaka-data').empty();
		$head.find('.bigname').text(data.bigname.name);
		$head.find('.tweet').text('@' + data.tweet.id);
		
		var items = [];

		// データの整形
		data.bigname.personality.forEach(function(personality, index){
			var item = {};
			item.id = personality.id;
			item.bigname = personality.percentile;
			item.tweet = data.tweet.personality[index].percentile;
			item.diff = data.diff.personality[index].percentile;
			items.push(item);
		});
		// データの表示
		items.forEach(function(item) {
			var $tr = $('<tr>');
			$tr.append('<td>' + item.id + '</td>');
			$tr.append('<td>' + ("" + item.bigname).slice(0, 4) + '</td>');
			$tr.append('<td>' + ("" + item.tweet).slice(0, 4) + '</td>');
			$tr.append('<td>' + ("" + item.diff).slice(0, 4) + '</td>');

			$table.append($tr);
		});
	}
})(jQuery);