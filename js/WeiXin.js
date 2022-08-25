/**
 * @param {Object} options
 * @param {Function} callback
 */
var WeiXin = function(options, callback) {
	var script = document.createElement("script");
	script.src = "http://res.wx.qq.com/open/js/jweixin-1.4.0.js";
	document.body.appendChild(script);

	script.onload = function() {
		options = options || {};

		var
		host = options.host,
		url = window.location.protocol + "//" + window.location.host + window.location.pathname + encodeURIComponent(window.location.search);

		var xhr = new XMLHttpRequest();
		xhr.onerror = function(e) {
			alert("XHR Error");
		};
		xhr.onload = function(e) {
			var result = JSON.parse(xhr.responseText);

			switch (result[options.status || "status"]) {
				case (options.success !== undefined ? options.success : 0):
					var jsApiList = options.jsApiList || [
						"updateAppMessageShareData",
						"updateTimelineShareData"
					];

					wx.config({
						debug: false,
						appId: result.data["appId"],
						timestamp: result.data["timestamp"],
						nonceStr: result.data["nonceStr"],
						signature: result.data["signature"],
						jsApiList: jsApiList
					});

					wx.ready(function() {
						callback();
					});

					break;
				default:
					break;
			}
		};
		xhr.open("GET", host + url);
		xhr.send();
	};
};
