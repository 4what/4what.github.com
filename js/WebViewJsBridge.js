/**
 * @requires $js
 */
var WebViewJsBridge = {
	/**
	 * @param {String} method
	 * @param {Object} data?
	 * @param {Function} callback?
	 */
	invoke: function(method, data, callback) {
		var url = "wvjb".toLowerCase() + "://?method=" + method;

		if (data) {
			url += "&" + $js.url.serialize(data);
		}

		if (callback) {
			var fn = "WebViewJsBridgeCallback_" + new Date().getTime();

			url += "&callback=" + fn;

			window[fn] = function(result) {
				callback(result);

				window[fn] = undefined;
			};
		}

		//window.location.href = url;

		var iframe = document.createElement("iframe");
		iframe.src = url;
		iframe.style.display = "none";

		document.body.appendChild(iframe);

		setTimeout(function() {
			document.body.removeChild(iframe);
		}, 0);
	}
};
