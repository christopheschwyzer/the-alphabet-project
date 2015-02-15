// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

(function() {
	Snap.plugin( function( Snap, Element, Paper, global ) {

		Element.prototype.drawAtPath = function( path, timer, options) {

			var myObject = this, bbox = this.getBBox(1);
			var point, movePoint = {}, len = path.getTotalLength(), from = 0, to = len, drawpath = 0, easing = mina.linear, callback;
			var startingTransform = '';

			if( options ) {
				easing = options.easing || easing;
				if( options.reverse  ) { from = len; to = 0; };
				if( options.drawpath ) {
					drawpath = 1;
					path.attr({
						fill: "none",
						strokeDasharray: len + " " + len,
						strokeDashoffset: this.len
					});

				};
				if( options.startingTransform ) {
					startingTransform = options.startingTransform;
				};
				callback = options.callback || function() {};
			};

			Snap.animate(from, to , function( val ) {
				point = path.getPointAtLength( val );
				movePoint.x = point.x - bbox.cx; movePoint.y = point.y - bbox.cy;
				myObject.transform( startingTransform + 't' + movePoint.x + ',' + movePoint.y + 'r' + point.alpha);

				if( drawpath ) {
					path.attr({ "stroke-dashoffset": len - val });
				};
			}, timer, easing, callback );
		};
	});

})();

