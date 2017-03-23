/*___________________________________4what____________________________________*/

/**
 * 4what JavaScript Library
 *
 * @author http://www.4what.cn/
 * @version 1.1 Build 2017.03.23
 */
(function() {

var Util = function() {
	//this.version = "";
};

Util.prototype = {
	/*--------------------------------------
	  Category: Core
	--------------------------------------*/
	/**
	 * @param {String} name
	 * @param {Function} fn
	 * @return {Object}
	 */
	extend: function(name, fn) {
		Util.prototype[name] = fn;
		return this;
	},

	/*--------------------------------------
	  Category: AJAX
	--------------------------------------*/
	/**
	 * same-origin
	 * 
	 * @requires $js.url
	 * @param {Object} options
	 */
	ajax: function(options) {
		var
		url = options.url, // {String} (*)
		type = (options.type || "GET").toUpperCase(), // {String}
		data = options.data || null, // {Object|String} {name: value, ...} | "key=value&..."
		async = options.async !== false, // {Boolean}
		contentType = options.contentType === false ? false : "application/x-www-form-urlencoded", // {Boolean|String}
		processData = options.processData !== false, // {Boolean}
		beforeSend = options.beforeSend || new Function(), // {Function}
		complete = options.complete || new Function(), // {Function}
		success = options.success || new Function(), // {Function}
		error = options.error || new Function(), // {Function}

		//crossDomain = /^https?:\/\//.test(url) && !new RegExp("^" + window.location.protocol + "\/\/" + window.location.host + "(?:\/|$)").test(url),
			
		xhr = "XMLHttpRequest" in window ?
			new XMLHttpRequest() : // for IE7+, Std
			new ActiveXObject("Microsoft.XMLHTTP"); // for IE6

		function callback() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var results = xhr.responseText || xhr.responseXML;
					success(results, xhr);
				} else {
					error(xhr);
				}
				complete(xhr);
			}
		}

		if (async) {
			xhr.onreadystatechange = callback;
		}

		url = this.url.encode(url);

		if (data) {
			if (processData) {
				data = this.url.serialize(typeof data !== "string" ? data : this.url.parse(data));
			}

			if (type === "GET") {
				url += (/\?/.test(url) ? "&" : "?") + data;

				data = null; // "method: POST"? (IE6)
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
	 * cross-domain
	 * 
	 * @requires $js.getScript
	 * @param {String} url
	 * @param {Function} callback
	 */
	jsonp: function(url, callback) {
		this.getScript(url, callback, "jsonp");
	},

	/**
	 * cross-domain
	 * 
	 * @requires $js.url
	 * @param {String} url
	 * @param {Function} callback
	 * @param {Boolean|String} jsonp (optional)
	 */
	getScript: function(url, callback, jsonp) {
		var
		head = document.getElementsByTagName("head")[0],
		script = document.createElement("script"),

		clean = function() {
			head.removeChild(script);
			script = undefined;
		};

		script.src = url;
		script.type = "text/javascript";

		if (!jsonp) {
			if ("onload" in script) {
				script.onload = function() { // for IE9+, Std
					callback();

					clean();
				}
			} else {
				script.onreadystatechange = function() { // for IE10-
					if (/complete|loaded/.test(script.readyState)) {
						callback();

						clean();
					}
				};
			}
		} else {
			var fn = "jsonp_" + new Date().getTime();

			script.src = this.url.encode(url + (/\?/.test(url) ? "&" : "?") + "callback=" + fn);

			window[fn] = function(results) {
				callback(results);

				// garbage collect
				window[fn] = undefined;

				clean();
			};
		}

		head.appendChild(script);
	},

	/**
	 * for IE9-, Std
	 *
	 * cross-domain
	 *
	 * @requires $js.bind, $js.url
	 * @param {Object} options
	 */
	windowName: function(options) {
		var
		callback = options.callback || new Function(), // {Function}
		form = options.form, // {Object} (*: !url)
		url = options.url, // {String} (*: !form)

		complete, iframe,
		local = window.location.protocol + "//" + window.location.host + "/robots.txt", // {String} (*: ?) // IE9: absolute path
		name = "windowname-" + new Date().getTime();

		try {
			iframe = document.createElement('<iframe name="' + name + '"></iframe>'); // for IE8-
		} catch (e) {
			iframe = document.createElement("iframe"); // for IE9+, Std
			iframe.name = name;
		}

		iframe.src = form ? local : this.url.encode(url);
		iframe.style.display = "none";

		this.bind(iframe, "load", function() {
			if (complete) {
				var results = iframe.contentWindow.name;
				iframe.contentWindow.document.write("");
				iframe.contentWindow.close();
				document.body.removeChild(iframe);
				callback(results);
			} else {
				complete = true;
				iframe.contentWindow.location.href = local;
			}
		});

		document.body.appendChild(iframe);

		if (form) {
			form.target = name;
			form.submit();
		}
	},

	/*--------------------------------------
	  Category: Array
	--------------------------------------*/
	/**
	 * @param {Object} element
	 * @param {Object[]} array
	 * @return {Number}
	 */
	inArray: function(element, array) {
		// for IE9+, Std
		if ("indexOf" in array) {
			return array.indexOf(element);
		}
		// for IE8-
		for (var i = 0, l = array.length; i < l; i++) {
			if (array[i] === element) {
				return i;
			}
		}
		return -1;
	},

	/**
	 * @requires $js.random
	 * @param {Number} size
	 * @param {Number} min
	 * @param {Number} max
	 * @param {Boolean} isInt (optional)
	 * @param {Boolean} sort (optional)
	 * @return {Number[]}
	 */
	randoms: function(size, min, max, isInt, sort) {
		var
		array = [],
		element,
		map = {};
		while (array.length < size) {
			element = this.random(min, max, isInt);
			if (
				!(element in map)
			) {
				array.push(element);
				map[element] = true;
			}
		}
		if (sort || sort === undefined) {
			array.sort(function(a, b) {
				return a - b;
			});
		}
		return array;
	},

	/**
	 * @requires $js.inArray
	 * @param {Object} element
	 * @param {Object[]} array
	 * @return {Object[]}
	 */
	removeElement: function(element, array) {
		var index = this.inArray(element, array);
		if (index !== -1) {
			array.splice(index, 1);
		}
		return array;
	},

	/**
	 * @param {Number[]|String[]} array
	 * @return {Number[]|String[]}
	 */
	unique: function(array) {
		var
		result = [],
		element,
		map = {};
		for (var i = 0, l = array.length; i < l; i++) {
			element = array[i];
			if (
				!(element in map)
			) {
				result.push(element);
				map[element] = true;
			}
		}
		return result;
	},

	/*--------------------------------------
	  Category: CSS
	--------------------------------------*/
	/**
	 * same-origin
	 *
	 * @requires $js.style
	 * @param {String} id
	 */
	iFrameAutoHeight: function(id) {
		var
		self = this,
		iframe = document.getElementById(id);
		iframe.onload = function() {
			//alert(iframe === this); // for IE9+, Std
			var body = iframe.contentWindow.document.body;
			iframe.height = body.offsetHeight
				+ parseInt(self.style(body, "margin-top"), 10)
				+ parseInt(self.style(body, "margin-bottom"), 10);
		};
	},

	/**
	 * @param {Object} target
	 * @param {String} name
	 * @return {String}
	 */
	style: function(target, name) {
		var value;
		if ("getComputedStyle" in window) { // for IE9+, Std
			value = target.ownerDocument.defaultView.getComputedStyle(target, null).getPropertyValue(name);
		} else { // for IE
			var camelCase = name.replace(/-([a-z])/ig, function(all, letter){
				return letter.toUpperCase();
			});
			value = target.currentStyle[camelCase];
		}
		return value;
	},

	/**
	 * window.onload = handler;
	 *
	 * @param {Object} target
	 * @param {Number} x
	 * @param {Number} y
	 */
	zoomOut: function(target, x, y) {
		var
		imgs = target.getElementsByTagName("img"),

		width, height;

		for (var item, i = imgs.length - 1; i >= 0; i--) {
			item = imgs[i];

			width = item.width;
			height = item.height;

			//item.style.width = "auto";
			//item.style.height = "auto";

			if (width > x && width > height) {
				item.style.width = x + "px";
			} else if (height > y) {
				item.style.height = y + "px";
			}
		}
	},

	/*--------------------------------------
	  Category: Event
	--------------------------------------*/
	/**
	 * @param {Object} target
	 * @param {String} type
	 * @param {Function} listener
	 */
	bind: function(target, type, listener) {
		if ("addEventListener" in target) { // for IE9+, Std
			target.addEventListener(type, listener, false);
		} else { // for IE10-
			target.attachEvent("on" + type, listener);
		}
	},

	/**
	 * @param {Event} e
	 * @return {Number}
	 */
	keyCode: function(e) {
		return e.keyCode
			|| e.which; // for IE9+, Std
	},

	/**
	 * @param {Event} e
	 */
	preventDefault: function(e) {
		"preventDefault" in e ?
			e.preventDefault() : // for IE9+, Std
			e.returnValue = false; // for IE8-
	},

	/**
	 * @param {Event} e
	 */
	stopPropagation: function(e) {
		if ("stopPropagation" in e) { // for IE9+, Std
			e.stopPropagation();
		}
		e.cancelBubble = true;
	},

	/**
	 * @param {Object} target
	 * @param {String} type
	 * @param {Function} listener
	 */
	unbind: function(target, type, listener) {
		if ("removeEventListener" in target) { // for IE9+, Std
			target.removeEventListener(type, listener, false);
		} else { // for IE10-
			target.detachEvent("on" + type, listener);
		}
	},

	/*--------------------------------------
	  Category: Form
	--------------------------------------*/
	/**
	 * TODO
	 * 
	 * @requires $js.keyCode
	 * @param {Event} e
	 * @param {String} type
	 * @return {Boolean}
	 */
	verify: function(e, type) {
		var
		key = String.fromCharCode(this.keyCode(e)),
		re;
		switch (type) {
			case "digit":
				re = /\d/;
				break;
			default:
				break;
		}
		return !re.test(key);
	},

	/*--------------------------------------
	  Category: Misc
	--------------------------------------*/
	/**
	 * @param {String} id (optional)
	 * @param {String} lang (optional)
	 * @return {String} (optional)
	 */
	clock: function(id, lang) {
		var
		date = new Date(),
		// Year
		YYYY = date.getFullYear(),
		// Month
		MM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		// Day
		DD = date.getDate(),
		// Weekday
		WwwD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		// Hour
		hh = date.getHours(),
		// Minute
		mm = date.getMinutes(),
		// Second
		ss = date.getSeconds();

		// + 0
		if (mm < 10) {
			mm = "0" + mm;
		}
		if (ss < 10) {
			ss = "0" + ss;
		}

		var clock = WwwD[date.getDay()] + ",&nbsp;" + MM[date.getMonth()] + "&nbsp;" + DD + ",&nbsp;" + YYYY + "&nbsp;" + hh + ":" + mm + ":" + ss;

		// zh
		if (lang === "zh") {
			MM = date.getMonth() + 1;
			WwwD = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			clock = WwwD[date.getDay()] + ",&nbsp;" + YYYY + "年" + MM + "月" + DD + "日&nbsp;" + hh + ":" + mm + ":" + ss;
		}

		if (id) {
			document.getElementById(id).innerHTML = clock;
		} else {
			return clock;
		}
	},

	/**
	 * @param {String} key
	 * @param {String} value (optional)
	 * @param {Object} options (optional)
	 * @return {String}
	 */
	cookie: function(key, value, options) {
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

		for (var entry, i = 0, l = map.length; i < l; i++) {
			entry = map[i].split("=");
			if (decodeURIComponent(entry[0]) === key) {
				return decodeURIComponent(entry[1]);
			}
		}

		return null;
	},

	/**
	 * @param {String} url
	 */
	include: function(url) {
		var
		css = '<style type="text/css">@import url("' + url + '");</style>',
		js = '<script type="text/javascript" src="' + url + '"></script>';
		document.write(/\.css$/i.test(url) ? css : js);
	},

	/**
	 * TODO
	 */
	json: {
		/**
		 * @param {String} text
		 * @return {Object}
		 */
		parse: function(text) {
			return "JSON" in window ?
				window.JSON.parse(text) : // for IE8+, Std
				eval("(" + text + ")");
		}
	},

	/**
	 * cross-domain
	 * 
	 * @requires $js.getScript
	 * @param {Object} obj
	 * @param {String} url
	 * @param {Function} callback
	 */
	loader: function(obj, url, callback) {
		var self = this;

		//callback = callback || new Function();

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
			self.getScript(url, function() {
				self._loader[url].loaded = true;

				for (var i = 0, l = self._loader[url].queue.length; i < l; i++) {
					self._loader[url].queue[i]();
				}
			});
		}
	},

	/**
	 * @param {Number} min (>=)
	 * @param {Number} max (<=)
	 * @param {Boolean} isInt (optional)
	 * @return {Number}
	 */
	random: function(min, max, isInt) {
		return isInt ?
			(Math.floor(Math.random() * (max - min + 1)) + min) : // Integer
			(Math.random() * (max - min) + min);
	},

	/**
	 * @param {Function} fn
	 * @param {Function} callback (optional)
	 * @return {String} (optional)
	 */
	timer: function(fn, callback) {
		var start = new Date();

		fn();

		var
		end = new Date(),
		result = end - start + " ms";

		if (typeof callback === "function") {
			callback(result)
		} else {
			return result;
		}
	},

	url: {
		/**
		 * @param {String} url
		 * @return {String}
		 */
		encode: function(url) {
			var index = url.indexOf("?");
			if (index > -1) {
				var search = url.slice(index + 1);
				url = url.slice(0, index) + "?" + this.serialize(this.parse(search));
			}
			return url;
		},
		/**
		 * @param {String} key
		 * @return {String}
		 */
		param: function(key) {
			return this.params()[key];
		},
		/**
		 * @return {Object}
		 */
		params: function() {
			return this.parse(window.location.search.slice(1));
		},
		/**
		 * @param {String} text
		 * @return {Object}
		 */
		parse: function(text) {
			var
			result = {},
			map = text.split("&");
			for (var entry, i = 0, l = map.length; i < l; i++) {
				entry = map[i].split("=");
				result[entry[0]] = entry[1];
			}
			return result;
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
	}
};

window.$js = new Util();

})();
