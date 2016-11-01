/*___________________________________4what____________________________________*/

/**
 * 4what JavaScript Library
 *
 * @author http://www.4what.cn/
 * @version 2016.11.01
 */
(function() {

var Util = function() {
	this.version = "";
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
			
		xhr = window.XMLHttpRequest ?
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
	 * @requires $js.script
	 * @param {String} url
	 * @param {Function} callback
	 */
	jsonp: function(url, callback) {
		this.script(url, callback, "jsonp");
	},

	/**
	 * @requires $js.url
	 * @param {String} url
	 * @param {Function} callback
	 * @param {Boolean|String} jsonp (optional)
	 */
	script: function(url, callback, jsonp) {
		var
		head = document.getElementsByTagName("head")[0],
		script = document.createElement("script"),

		clean = function() {
			head.removeChild(script);
			script = undefined;
		},

		state;

		script.src = url;
		script.type = "text/javascript";

		if (!jsonp) {
			script.onload = // for Std
			script.onreadystatechange = // for IE
				function() {
					state = script.readyState;

					if (
						!state
						|| /loaded|complete/.test(state) // for IE
					) {
						callback();

						script.onload = script.onreadystatechange = null; // for IE

						clean();
					}
				};
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
	 * @requires $js.bind, $js.url
	 * @param {Object} options
	 */
	windowName: function(options) {
		var
		callback = options.callback || new Function(), // {Function}
		form = options.form, // {Object} (*: !url)
		url = options.url, // {String} (*: !form)

		complete, iframe,
		local = window.location.protocol + "//" + window.location.host + "/robots.txt", // {String} // IE9: absolute path
		name = "windowname-" + new Date().getTime();

		try {
			iframe = document.createElement('<iframe name="' + name + '"></iframe>'); // for IE
		} catch (e) {
			iframe = document.createElement("iframe"); // for Std
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
		if (array.indexOf) {
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
				!map[element]
				//!(element in map)
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
	remove: function(element, array) {
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
				!map[element]
				//!(element in map)
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
	 * @requires $js.iframeDoc, $js.style
	 * @param {String} id
	 */
	iframeHeight: function(id) {
		var self = this;
		document.getElementById(id).onload = function() {
			var body = self.iframeDoc(id).body;
			document.getElementById(id).height = body.scrollHeight
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
		if (target.currentStyle) { // for IE
			var camelCase = name.replace(/-([a-z])/ig, function(all, letter){
				return letter.toUpperCase();
			});
			value = target.currentStyle[camelCase];
		} else if (window.getComputedStyle) { // for IE9+, Std
			value = target.ownerDocument.defaultView.getComputedStyle(target, null).getPropertyValue(name);
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
		if (target.addEventListener) { // for IE9+, Std
			target.addEventListener(type, listener, false);
		} else if (target.attachEvent) { // for IE
			target.attachEvent("on" + type, listener);
		}
	},

	/**
	 * @param {Event} e
	 */
	cancel: function(e) {
		e.preventDefault ?
			e.preventDefault() : // for IE9+, Std
			e.returnValue = false; // for IE8-
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
	stop: function(e) {
		if (e.stopPropagation) { // for IE9+, Std
			e.stopPropagation();
		}
		e.cancelBubble = true; // for IE
	},

	/**
	 * @param {Object} target
	 * @param {String} type
	 * @param {Function} listener
	 */
	unbind: function(target, type, listener) {
		if (target.removeEventListener) { // for IE9+, Std
			target.removeEventListener(type, listener, false);
		} else if (target.detachEvent) { // for IE
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
	 * for IE, Firefox
	 *
	 * @param {String} title (optional)
	 * @param {String} url (optional)
	 */
	fav: function(title, url) {
		if (!title) {
			title = document.title;
		}
		if (!url) {
			url = window.location.href;
		}
		window.sidebar ?
			window.sidebar.addPanel(title, url, "") : // for Firefox
			window.external.AddFavorite(url, title); // for IE
	},

	/**
	 * https://developer.mozilla.org/en-US/docs/Migrate_apps_from_Internet_Explorer_to_Mozilla#Rich_text_differences
	 *
	 * @deprecated
	 * @param {String} id
	 * @param {String} name (optional)
	 * @return {Object}
	 */
	iframeDoc: function(id, name) {
		//document.getElementById(id).contentWindow.document
		//window[name].document
		return document.getElementById(id).contentDocument // for Std
			|| document.frames[
				id // id|name
			].document; // for IE
	},

	/**
	 * TODO
	 */
	JSON: {
		/**
		 * @param {String} text
		 * @return {Object}
		 */
		parse: function(text) {
			return eval("(" + text + ")");
		}
	},

	/**
	 * @param {String} url
	 */
	load: function(url) {
		var
		css = '<style type="text/css">@import url("' + url + '");</style>',
		js = '<script type="text/javascript" src="' + url + '"></script>';
		document.write(/\.css$/i.test(url) ? css : js);
	},

	/**
	 * @requires $js.script
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
			self.script(url, function() {
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
		get: function(key) {
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

window["$js"] = new Util();

})();
