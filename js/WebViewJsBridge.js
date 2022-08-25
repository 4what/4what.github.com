var WebViewJsBridge = {
	/**
	 * @param {String} method
	 * @param {Object} data (optional)
	 * @param {Function} callback (optional)
	 */
	invoke: function(method, data, callback) {
		var url = "wvjb".toLowerCase() + "://?method=" + method;

		if (data) {
			url += "&" + this.serialize(data);
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
	},

	/**
	 * @param {Object} map
	 * @return {String}
	 */
	serialize: function(map) {
		var result = [];

		for (var key in map) {
			result.push(encodeURIComponent(key) + "=" + encodeURIComponent(map[key]));
		}

		return result.join("&");
	}
};
