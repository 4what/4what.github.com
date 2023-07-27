/* Google Analytics */
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
