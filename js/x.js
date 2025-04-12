/**
 * @author https://4what.cn
 * @version 2.0 Build 2024.11.19
 */
(function () {

var Utilities = function () {
};

Utilities.prototype = {
	/*--------------------------------------
	  Request
	--------------------------------------*/
	/**
	 * (Same-origin)
	 *
	 * @param {Object} options
	 */
	ajax: function (options) {
		var
			url = options.url, // {String} (*)
			type = (options.type || "GET").toUpperCase(), // {String}
			data = options.data || null, // {Object}
			async = options.async !== false, // {Boolean}
			contentType = options.contentType === false ? false : "application/x-www-form-urlencoded", // {Boolean}
			processData = options.processData !== false, // {Boolean}
			beforeSend = options.beforeSend || new Function(), // {Function}
			complete = options.complete || new Function(), // {Function}
			success = options.success || new Function(), // {Function}
			error = options.error || new Function(), // {Function}

			xhr = "XMLHttpRequest" in window ?
				new XMLHttpRequest() : // for IE7+, Std
				new ActiveXObject("Microsoft.XMLHTTP"); // for IE6

		function callback() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var result = xhr.responseText || xhr.responseXML;
					success(result, xhr);
				} else {
					error(xhr);
				}
				complete(xhr);
			}
		}

		if (async) {
			xhr.onreadystatechange = callback;
		}

		if (data) {
			if (processData) {
				data = self.encode(data);
			}

			if (type === "GET") {
				url += (/\?/.test(url) ? "&" : "?") + data;

				data = null; // IE6
			}
		}

		xhr.open(type, url, async);

		if (type === "POST" && contentType) {
			xhr.setRequestHeader("Content-Type", contentType);
		}

		beforeSend(xhr);

		xhr.send(data);

		if (!async) {
			callback();
		}
	},

	/**
	 * (Cross-domain)
	 *
	 * @param {String} url
	 * @param {Function} callback
	 * @param {Boolean} jsonp?
	 */
	getScript: function (url, callback, jsonp) {
		var script = document.createElement("script");

		function clean() {
			document.body.removeChild(script);
			script = undefined;
		};

		script.src = url;
		script.type = "text/javascript";

		if (!jsonp) {
			if ("onload" in script) {
				script.onload = function () { // for IE9+, Std
					callback();
					clean();
				}
			} else {
				script.onreadystatechange = function () { // for IE10-
					if (/complete|loaded/.test(script.readyState)) {
						callback();
						clean();
					}
				};
			}
		} else {
			var jsonpCallback = "jsonp_" + new Date().getTime();

			script.src = url + (/\?/.test(url) ? "&" : "?") + "callback=" + jsonpCallback;

			window[jsonpCallback] = function (result) {
				callback(result);
				clean();

				window[jsonpCallback] = undefined; // GC
			};
		}

		document.body.appendChild(script);
	},

	/**
	 * (Cross-domain)
	 *
	 * @param {String} url
	 * @param {Function} callback
	 */
	jsonp: function (url, callback) {
		self.getScript(url, callback, true);
	},

	/**
	 * (Cross-domain)
	 *
	 * for IE9-, Std
	 *
	 * @param {Object} options
	 */
	windowName: function (options) {
		var
			form = options.form, // {Object}
			url = options.url, // {String}

			callback = options.callback || new Function(), // {Function}

			iframe,
			local = window.location.protocol + "//" + window.location.host + "/robots.txt", // IE9: Absolute path
			name = "windowname-" + new Date().getTime(),

			completed;

		try {
			iframe = document.createElement('<iframe name="' + name + '"></iframe>'); // for IE8-
		} catch (error) {
			iframe = document.createElement("iframe"); // for IE9+, Std
			iframe.name = name;
		}

		iframe.src = form ? local : url;
		iframe.style.display = "none";

		self.bind(iframe, "load", function () {
			if (completed) {
				var result = iframe.contentWindow.name;

				iframe.contentWindow.document.write("");
				iframe.contentWindow.close();

				document.body.removeChild(iframe);

				callback(result);
			} else {
				completed = true;

				iframe.contentWindow.location.assign(local);
			}
		});

		document.body.appendChild(iframe);

		if (form) {
			form.target = name;
			form.submit();
		}
	},

	/*--------------------------------------
	  Array
	--------------------------------------*/
	/**
	 * @param {Object} element
	 * @param {Object[]} array
	 * @return {Number}
	 */
	inArray: function (element, array) {
		/* for IE9+, Std */
		if ("indexOf" in array) {
			return array.indexOf(element);
		}

		/* for IE8- */
		for (var i = 0; i < array.length; i++) {
			if (array[i] === element) {
				return i;
			}
		}

		return -1;
	},

	/**
	 * @param {Object} element
	 * @param {Object[]} array
	 * @return {Object[]}
	 */
	removeElement: function (element, array) {
		var index = self.inArray(element, array);

		if (index !== -1) {
			array.splice(index, 1);
		}

		return array;
	},

	/**
	 * @param {Number[]|String[]} array
	 * @return {Number[]|String[]}
	 */
	unique: function (array) {
		var
			result = [],
			element,
			map = {};

		for (var i = 0; i < array.length; i++) {
			element = array[i];

			if (!(element in map)) {
				result.push(element);

				map[element] = true;
			}
		}

		return result;
	},

	/*--------------------------------------
	  CSS
	--------------------------------------*/
	/**
	 * @param {Object} target
	 * @param {String} value
	 */
	addClass: function (target, value) {
		if (target.className) {
			var classes = target.className.split(" ");
			var values = value.split(" ");

			for (var item, i = values.length - 1; i >= 0; i--) {
				item = values[i];

				if (self.inArray(item, classes) === -1) {
					classes.push(item);
				}
			}

			target.className = classes.join(" ");
		} else {
			target.className = value;
		}
	},

	/**
	 * @param {Object} target
	 * @param {String} name
	 * @return {String}
	 */
	getStyle: function (target, name) {
		var value;

		if ("getComputedStyle" in window) { // for IE9+, Std
			value = target.ownerDocument.defaultView.getComputedStyle(target, null).getPropertyValue(name);
		} else { // for IE
			var camelCase = name.replace(/-([a-z])/ig, function (all, letter) {
				return letter.toUpperCase();
			});

			value = target.currentStyle[camelCase];
		}

		return value;
	},

	/**
	 * @param {Object} target
	 * @param {String} value
	 */
	removeClass: function (target, value) {
		if (arguments.length > 1) {
			var classes = target.getAttribute("class").split(" ");
			var values = value.split(" ");

			for (var i = values.length - 1; i >= 0; i--) {
				self.removeElement(values[i], classes);
			}

			target.setAttribute("class", classes.join(" "));
		} else {
			target.setAttribute("class", "");
		}
	},

	/**
	 * (Same-origin)
	 *
	 * @param {String} id
	 */
	setIFrameHeight: function (id) {
		var iframe = document.getElementById(id);

		iframe.onload = function () {
			var body = iframe.contentWindow.document.body;

			iframe.height = body.offsetHeight
				+ parseInt(self.getStyle(body, "margin-top"), 10)
				+ parseInt(self.getStyle(body, "margin-bottom"), 10);
		};
	},

	/*--------------------------------------
	  Event
	--------------------------------------*/
	/**
	 * @param {Object} target
	 * @param {String} type
	 * @param {Function} listener
	 */
	bind: function (target, type, listener) {
		if ("addEventListener" in target) { // for IE9+, Std
			target.addEventListener(type, listener);
		} else { // for IE10-
			target.attachEvent("on" + type, listener);
		}
	},

	/**
	 * @param {Event} event
	 */
	preventDefault: function (event) {
		"preventDefault" in event ?
			event.preventDefault() : // for IE9+, Std
			event.returnValue = false; // for IE8-
	},

	/**
	 * @param {Event} event
	 */
	stopPropagation: function (event) {
		if ("stopPropagation" in event) { // for IE9+, Std
			event.stopPropagation();
		}

		event.cancelBubble = true;
	},

	/**
	 * @param {Object} target
	 * @param {String} type
	 * @param {Function} listener
	 */
	unbind: function (target, type, listener) {
		if ("removeEventListener" in target) { // for IE9+, Std
			target.removeEventListener(type, listener, false);
		} else { // for IE10-
			target.detachEvent("on" + type, listener);
		}
	},

	/*--------------------------------------
	  URL
	--------------------------------------*/
	/**
	 * @param {Object} data
	 * @return {String}
	 */
	encode: function (data) {
		var result = [];

		function push(key, value) {
			result.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
		}

		for (var key in data) {
			var value = data[key];

			if (value instanceof Array) {
				for (var i = 0; i < value.length; i++) {
					push(key, value[i]);
				}
			} else {
				push(key, value);
			}
		}

		return result.join("&");
	},

	/**
	 * @param {String} url
	 * @return {Object}
	 */
	params: function (url) {
		var
			hash = url.indexOf("#"),
			query = url.indexOf("?"),

			search = query === -1 ? "" : url.slice(query + 1, hash === - 1 ? url.length : hash);

		if (!search) {
			return {};
		}

		var
			result = {},

			pairs = search.split("&");

		for (var i = 0; i < pairs.length; i++) {
			var
				pair = pairs[i].split("="),

				key = pair[0],
				newValue = pair[1] || "";

			if (result.hasOwnProperty(key)) {
				var value = result[key];

				if (!(value instanceof Array)) {
					value = [value];
				}

				value.push(newValue);

				result[key] = value;

				continue;
			}

			result[key] = newValue;
		}

		return result;
	},

	/*--------------------------------------
	  Misc
	--------------------------------------*/
	/**
	 * @param {String} key
	 * @param {String} value?
	 * @param {Object} options?
	 * @return {String}
	 */
	cookie: function (key, value, options) {
		if (arguments.length > 1) {
			options = options || {};

			var
				domain = options.domain, // {String}
				expires = options.expires, // {Number|Date}
				path = options.path, // {String}
				secure = options.secure; // {Boolean}

			if (value === null) {
				expires = -1;
			}

			if (typeof expires === "number") {
				var date = new Date();
				date.setDate(date.getDate() + expires);

				expires = date;
			}

			return document.cookie = [
				encodeURIComponent(key) + "=" + encodeURIComponent(value),
				domain ? "; domain=" + domain : "",
				expires ? "; expires=" + expires.toUTCString() : "",
				path ? "; path=" + path : "",
				secure ? "; secure" : ""
			].join("");
		}

		var map = document.cookie.split("; ");

		for (var i = 0; i < map.length; i++) {
			var entry = map[i].split("=");

			if (decodeURIComponent(entry[0]) === key) {
				return decodeURIComponent(entry[1]);
			}
		}

		return null;
	},

	/**
	 * @param {String} url
	 */
	include: function (url) {
		var
			css = '<style>@import "' + url + '";</style>',
			js = '<script src="' + url + '"></script>';

		document.write(/\.css$/i.test(url) ? css : js);
	},

	/**
	 * (Cross-domain)
	 *
	 * @param {Object} obj
	 * @param {String} url
	 * @param {Function} callback
	 */
	loader: function (obj, url, callback) {
		if (obj) {
			callback();

			return;
		}

		self._loader = self._loader || {};

		self._loader[url] = self._loader[url] || {
			loaded: false,
			queue: []
		};

		if (self._loader[url].loaded) {
			callback();

			return;
		}

		if (self._loader[url].queue.push(callback) === 1) {
			self.getScript(url, function () {
				self._loader[url].loaded = true;

				for (var i = 0; i < self._loader[url].queue.length; i++) {
					self._loader[url].queue[i]();
				}
			});
		}
	},

	/**
	 * >= Min, <= Max
	 *
	 * @param {Number} min
	 * @param {Number} max
	 * @param {Boolean} float?
	 * @return {Number}
	 */
	random: function (min, max, float) {
		return float
			? Math.random() * (max - min) + min
			: Math.floor(Math.random() * (max - min + 1)) + min;
	},

	/**
	 * @param {Number} size
	 * @param {Number} min
	 * @param {Number} max
	 * @param {Boolean} float?
	 * @return {Number[]}
	 */
	randoms: function (size, min, max, float) {
		var
			element,

			array = [],
			map = {};

		while (array.length < size) {
			element = self.random(min, max, float);

			if (!(map.hasOwnProperty(element))) {
				array.push(element);
				map[element] = true;
			}
		}

		return array;
	}
};

if (typeof module === "object" && typeof module.exports === "object") { // for CommonJS
	module.exports = new Utilities();
} else if (typeof define === "function" && define.amd) { // for RequireJS
	define(function () {
		return new Utilities();
	});
} else {
	window.X = new Utilities();
}

})();
