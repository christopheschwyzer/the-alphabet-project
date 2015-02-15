var speechSynthesis = ('speechSynthesis' in window);
if (!speechSynthesis) {
	alert('Web Speech API not supported!');
}

$(document).ready(function() {

	var letters = ['a', 'b', 'z'];
	var $slider = $('.slider');

	letters.forEach(function(currentValue, index) {
		if (index <= 2) {
			var $section = $('<li class="slider-slide svg-' + currentValue + '"/>');
			//			$section.css('left', index * 100 + '%');

			$section.load('img/svg/' + currentValue + '.svg', null, function(response, status, xhr) {
				if (status == "error") {
					var msg = "Sorry but there was an error: ";
					$slider.html(msg + xhr.status + " " + xhr.statusText);
				} else {
					svgLoaded(currentValue);
				}
			});

			$slider.append($section);
		}
	});

	setTimeout(function() {
		$slider.lightSlider({
			item: 1,
			keyPress: true,
			slideMargin: 0,
			easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
			speed: 600,
			pager: false,
			addClass: 'fullscreen-slider'
		});
	}, 100);

});

var svgLoaded = function(letter) {
	var $elements = $('.svg-' + letter + ' .clickable');
	var svg = Snap('.svg-' + letter + ' svg');
	var clickable = svg.selectAll('.clickable');

	speakOnClick($elements);
	animateClickable(clickable, 1.05);
	animateMotionPath();
};

var speakOnClick = function(el) {
	if (!speechSynthesis) {
		return;
	}

	el.on('click', function(e) {
		var self = e.currentTarget;

		var title = $(self).find('title').text();
		var msg = new SpeechSynthesisUtterance(title);
		window.speechSynthesis.speak(msg);

		var snapObject = Snap(self);
		animateClickable(snapObject);
	});
};

var animateClickable = function(object, size) {
	size = typeof size !== 'undefined' ? size : 1.2;

	var firstFrame = {
		transform: 's' + size + ',' + size + ''
	};
	var lastFrame = {
		transform: 's1,1'
	};

	object.animate(firstFrame, 1000, mina.bounce, function() {
		object.animate(lastFrame, 1000, mina.elastic);
	});
};

var animateMotionPath = function() {
	var animation = Snap('#animations');

	var leave1 = animation.select('#leave-1');
	var path1 = animation.select('#motion-path-1');
	path1.attr({'stroke-opacity': 0});

	setTimeout(function() {
		leave1.drawAtPath(path1, 20000, {reverse: true, easing: mina.easeinout});
	}, 2000);

	var leave2 = animation.select('#leave-2');
	var path2 = animation.select('#motion-path-2');
	path2.attr({'stroke-opacity': 0});
	setTimeout(function() {
		leave2.drawAtPath(path2, 16000, {easing: mina.easeout})
	}, 6000);
};