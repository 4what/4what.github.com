/* Google Analytics */
/*
(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function() {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-39252062-1', 'auto');
ga('send', 'pageview');
*/

(function () {
	var script = document.createElement("script");
	script.src = "https://www.googletagmanager.com/gtag/js?id=G-JM0JM3D8S4";
	script.type = "text/javascript";

	script.async = 1;

	document.body.appendChild(script);
})();

window.dataLayer = window.dataLayer || [];

function gtag() {
	dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", "G-JM0JM3D8S4");
