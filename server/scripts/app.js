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

		var ctx = $('#graph');
		var gData = {
	    labels: ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"],
		    datasets: [
		        {
		            label: "Target",
		            backgroundColor: "rgba(179,181,198,0.2)",
		            borderColor: "rgba(179,181,198,1)",
		            pointBackgroundColor: "rgba(179,181,198,1)",
		            pointBorderColor: "#fff",
		            pointHoverBackgroundColor: "#fff",
		            pointHoverBorderColor: "rgba(179,181,198,1)",
		            data: [data.personality[0].bigname,data.personality[1].bigname,data.personality[2].bigname,data.personality[3].bigname,data.personality[4].bigname]
		        },
		        {
		            label: "You",
		            backgroundColor: "rgba(255,99,132,0.2)",
		            borderColor: "rgba(255,99,132,1)",
		            pointBackgroundColor: "rgba(255,99,132,1)",
		            pointBorderColor: "#fff",
		            pointHoverBackgroundColor: "#fff",
		            pointHoverBorderColor: "rgba(255,99,132,1)",
		            data: [data.personality[0].tweet,data.personality[1].tweet,data.personality[2].tweet,data.personality[3].tweet,data.personality[4].tweet]
		        }
		    ]
		};
		var radar = new Chart(ctx,{
		    type: 'radar',
		    data: gData
		    // options: options
		});

		console.log(data)
		var $table = $('.js-tsumenoaka-data').empty();

		// 名前の検索
		var bigname = $('.js-bigname').find('option[value=' + data.bignameId + ']').text();
		if (!bigname) {
			bigname = data.bignameId;
		}
		// $head.find('.bigname').text(bigname);
		// $head.find('.tweet').text('@' + data.twitterId);

		var items = [];

		// データの表示
		data.personality.forEach(function(item) {
			var $tr = $('<tr>');
			// $tr.append('<td>' + item.id + '</td>');
			$tr.append('<td>' + ("" + item.bigname).slice(0, 4) + '</td>');
			$tr.append('<td>' + ("" + item.tweet).slice(0, 4) + '</td>');
			$tr.append('<td>' + ("" + item.diff).slice(0, 4) + '</td>');

			$table.append($tr);
		});
	}
})(jQuery);