(function() {
	var updateRequested;
	var innerWidth;
	var innerHeight;
	var innerRatio;
	var devicePixelRatio;
	var adjustedWidth;
	var adjustedHeight;
	var containers = [];
	var triggering;

	function update() {
		innerWidth = window.innerWidth;
		innerHeight = window.innerHeight;
		innerRatio = innerWidth / innerHeight;
	}

	function resize(e) {
		update();

		containers.forEach(function (container) {
			var top = container.getBoundingClientRect().top;
			var dh = innerHeight - top;

			container.style.height = dh.toString() + 'px';
		});
	}

	document.addEventListener('DOMContentLoaded', function() {
		containers = Array.prototype.slice.call(document.querySelectorAll('.page[id^="video"] .container-video'));
	});

	update();

	window.addEventListener('resize', resize);
	window.addEventListener('deviceOrientation', resize);

	Monsoon.onPageReady(function(e, page) {
		if(page.getAttribute('id').startsWith('video')) {
			var raf;

			page.style.display='flex';

			resize();
		}
	});

})();
