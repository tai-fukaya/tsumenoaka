(function($) {
	var $selectArea = $('#area-select-data'),
		$showArea = $('#area-show-data');

	$('.js-bigname').val($('.js-bigname option:first').val());
	$('.js-twitter-id').val('');
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
		$('.js-bigname').val($('.js-bigname option:first').val());
		$('.js-twitter-id').val('');
		$selectArea.show();
		$showArea.hide();
	});

	// ツメノアカを生成する
	$('.js-button-generate').on('click', function() {
		var bignameId = $('.js-bigname').val(),
			twitterId = $('.js-twitter-id').val();
		$('.js-message').text('');
		
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

		// 名前の検索
		var bigname = $('.js-bigname').find('option[value=' + data.bignameId + ']').text();
		if (!bigname) {
			bigname = data.bignameId;
		}
		$head.find('.bigname').text(bigname);
		$head.find('.tweet').text('@' + data.twitterId);

		var items = [];

		// データの表示
		data.personality.forEach(function(item) {
			var $tr = $('<tr>');
			$tr.append('<td>' + item.id + '</td>');
			$tr.append('<td>' + ("" + item.bigname).slice(0, 4) + '</td>');
			$tr.append('<td>' + ("" + item.tweet).slice(0, 4) + '</td>');
			$tr.append('<td>' + ("" + item.diff).slice(0, 4) + '</td>');

			$table.append($tr);
		});
	}
})(jQuery);