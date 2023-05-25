/**
 * @author https://4what.cn
 * @version 1.4 Build 2022.08.30
 */
(function() {

var Util = {
	/*--------------------------------------
	  Category: CSS
	--------------------------------------*/
	/**
	 * @requires jQuery 1.3.2+
	 * @param {Number} min
	 */
	center: function(min) {
		var
		body = $("body"),
		width;

		$(window).bind("load resize", function() {
			width = $(window).width();

			body.css("margin-left", width < min ? (width - min) / 2 : "auto");
		});
	},

	/**
	 * @requires jQuery 1.3.2+
	 * @param {Object|String} target
	 * @param {Object} options?
	 */
	fixed: function(target, options) {
		var
		defaults = {
			duration: 0, // {Number|String}
			offset: 0, // {Number}
			position: "bottom" // {String} bottom|top
		},
		settings = $.extend(defaults, options);

		target = $(target);

		var
		position = (function() {
			if (settings.position === "bottom") {
				var outerHeight = target.outerHeight(true);

				return function() {
					return $(window).height() - outerHeight - settings.offset;
				};
			} else {
				return function() {
					return settings.offset;
				};
			}
		})(),

		prop = function() {
			return {
				"top": $(window).scrollTop() + position()
					+ "px" // for IE
			};
		},

		handler = (function() {
			return !settings.duration ?
				function() {
					target.css(prop());
				} :
				function() {
					target.stop().animate(prop(), settings.duration);
				};
		})();

		$(window).bind("load resize scroll", handler);
	},

	/**
	 * @requires jQuery 1.3.2+
	 * @param {Object|String} target
	 * @param {Number} limit
	 */
	maxHeight: function(target, limit) {
		$(target).each(function() {
			if ($(this).height() > limit) {
				$(this).height(limit);
			}
		});
	},

	/**
	 * @requires jQuery 1.3.2+
	 * @param {Object|String} target
	 * @param {Number} limit
	 */
	minHeight: function(target, limit) {
		$(target).each(function() {
			if ($(this).height() < limit) {
				$(this).height(limit);
			}
		});
	},

	/**
	 * min-width
	 *
	 * @requires jQuery 1.3.2+
	 * @param {Object|String} target
	 * @param {Number} width
	 */
	minWidth: function(target, width) {
		$(window).bind("load resize", function() {
			$(target).width($(window).width() <= width ? width : "auto");
		});
	},

	/**
	 * same-origin
	 *
	 * @requires jQuery 1.3.2+
	 * @param {Object|String} target
	 */
	setIFrameHeight: function(target) {
		$(target).load(function() {
			$(this).height($(this).contents().find("body").outerHeight(true));
		});
	},

	/*--------------------------------------
	  Category: Event
	--------------------------------------*/
	/**
	 * @requires jQuery 1.3.2+
	 * @param {Number[]} code
	 * @param {Object|String} target?
	 */
	blockKey: function(code, target) {
		$(target || document).keydown(function(e) {
			for (var i = code.length - 1; i >= 0; i--) {
				if (e.which === code[i]) {
					e.preventDefault();
				}
			}
		});
	},

	/*--------------------------------------
	  Category: Form
	--------------------------------------*/
	/**
	 * @requires jQuery 1.3.2+
	 * @param {Object|String} form
	 * @param {Boolean} bln
	 */
	disableSubmit: function(form, bln) {
		$(form).find(":submit, :image").attr("disabled", bln);
	},

	/**
	 * @requires jQuery 1.3.2+
	 * @param {Object|String} form
	 * @param {String} name
	 * @return {Object}
	 */
	field: function(form, name) {
		return $(form).find(":checkbox, :file, :hidden, :password, :radio, :text, select, textarea").filter("[name='" + name + "']");
	},

	/**
	 * @requires jQuery 1.3.2+
	 * @param {Object} data {"name": value | [value, ...], ...}
	 * @param {Object|String} target?
	 */
	select: function(data, target) {
		var item, value;

		target = $(target).find(":checkbox, :radio, select");

		for (var key in data) {
			item = target.filter("[name='" + key + "']");
			value = data[key];

			if (item.is(":checkbox")) {
				item.attr("checked", false);

				for (var i = value.length - 1; i >= 0; i--) {
					item.filter("[value='" + value[i] + "']").attr("checked", true);
				}
			} else if (item.is(":radio")) {
				item.filter("[value='" + value + "']").attr("checked", true);
			} else if (item.is("select")) {
				item.find("option[value='" + value + "']").attr("selected", true);
			}
		}
	},

	/*--------------------------------------
	  Category: Misc
	--------------------------------------*/
	/**
	 * @requires jQuery 1.3.2+, jQuery ColorBox
	 * @param {Object} options
	 * @param {Object} params?
	 */
	dialog: function(options, params) {
		var
		defaults = {
			callback: new Function(), // {Function}
			template: new Function("id", ""), // {Function} (*)
			timeout: false // {Boolean|Number}
		},
		settings = $.extend(defaults, options),

		id = "dialog-" + new Date().getTime();

		params = $.extend({
			html: settings.template(id),
			onComplete: function() {
				/* close */
				$("#" + id).find("[class*='dialog-close']").click(function() {
					$.colorbox.close();
				});

				/* callback */
				settings.callback();

				/* timeout */
				if (settings.timeout) {
					window.setTimeout($.colorbox.close, settings.timeout === true ? 1000 * 2 : settings.timeout);
				}
			}
		}, params);

		$.colorbox(params);
	},

	/**
	 * @param {String[]} domains
	 * @return {String}
	 */
	domain: function(domains) {
		for (var item, i = domains.length - 1; i >= 0; i --) {
			item = domains[i];

			if (window.location.hostname.indexOf("." + item + ".") !== -1) {
				return item;
			}
		}
		return false;
	},

	/**
	 * @requires jQuery 1.3.2+, $js.url
	 * @param {Object|String} target
	 * @param {Object} options
	 */
	paginator: function(target, options) {
		var
		defaults = {
			debug: false, // {Boolean} !ajax

			ajax: false, // {Boolean}
			callback: new Function(), // {Function} ajax

			param: "pageNum", // {String}
			data: null, // {Object} !ajax

			ellipsis: true, // {Boolean}
			pages: 5, // {Number}

			pageNum: 1, // {Number}
			pageSize: 10, // {Number}
			total: 0, // {Number} (*)

			previous: "Previous", // {String}
			next: "Next", // {String}
			first: "First", // {String}
			last: "Last" // {String}
		},
		settings = $.extend(defaults, options);

		/* init */
		function init(index) {
			var totalPages = Math.ceil(settings.total / settings.pageSize);

			if (totalPages > 1) {
				var query = "?";

				if (!settings.ajax) {
					var params = {};

					if (window.location.search) {
						var
						search = $js.url.params(),
						value;

						for (var key in search) {
							value = search[key];

							if (key === settings.param) {
								if (settings.debug) {
									index = parseInt(value, 10);
								}
							} else {
								params[key] = value;
							}
						}
					}
					if (settings.data) {
						for (var key in settings.data) {
							params[key] = settings.data[key];
						}
					}
					for (var key in params) {
						query += key + "=" + params[key] + "&";
					}
				}

				function url(i) {
					return !settings.ajax ? (query + settings.param + "=" + i) : "";
				}

				var
				pages = Math.min(settings.pages, totalPages),

				start = Math.max(1, Math.ceil(index - (pages / 2))),
				end = Math.min(totalPages, start + pages - 1),

				/* adjust */
				delta = pages - (end - start + 1),
				start = Math.max(1, start - delta),

				box = $('<div class="pagination"></div>'),
				component = "",
				widget;

				$(target).html(box);

				for (var i = start; i <= end; ++i) {
					if (i === index) {
						component += '<span class="current">' + i + '</span> ';
					} else {
						component += '<a href="' + url(i) + '" rel="' + i + '">' + i + '</a> ';
					}
				}

				box.append(component);

				/* first & previous */
				if (index > 1) {
					var
					first = '<a href="' + url(1) + '" class="first" rel="' + 1 + '">' + settings.first + '</a> ',
					previous = index - 1;

					widget = previous = '<a href="' + url(previous) + '" class="previous" rel="' + previous + '">' + settings.previous + '</a> ';

					if (start > 1) {
						if (settings.ellipsis) {
							first = '<a href="' + url(1) + '" class="first" rel="' + 1 + '">' + 1 + '</a> ... ';
							widget = previous + first;
						} else {
							widget = first + previous;
						}
					}

					box.prepend(widget);
				}

				/* last & next */
				if (index < totalPages) {
					var
					last = '<a href="' + url(totalPages) + '" class="last" rel="' + totalPages + '">' + settings.last + '</a> ',
					next = index + 1;

					widget = next = '<a href="' + url(next) + '" class="next" rel="' + next + '">' + settings.next + '</a> ';

					if (end < totalPages) {
						if (settings.ellipsis) {
							last = '... <a href="' + url(totalPages) + '" class="last" rel="' + totalPages + '">' + totalPages + '</a> ';
							widget = last + next;
						} else {
							widget = next + last;
						}
					}

					box.append(widget);
				}

				/* ajax */
				if (settings.ajax) {
					box.find("a").click(function() {
						var index = parseInt($(this).attr("rel"), 10);

						/* recursion */
						init(index);

						/* callback */
						settings.callback(index);

						return false;
					});
				}
			}
		}

		init(settings.pageNum);
	},

	/**
	 * @param {String} value
	 * @return {String}
	 */
	stripHtml: function(value) {
		return value.replace(/<.[^<>]*?>/g, "") // /<\/?[^>]+>/gi
			.replace(/&nbsp;|&#160;/gi, ""); // non-breaking space
	}
};

if (typeof module === "object" && typeof module.exports === "object") { // for CommonJS
	module.exports = Util;
} else if (typeof define === "function" && define.amd) { // for RequireJS
	define(/*"Util", */function() {
		return Util;
	});
} else {
	window.$jq = Util;
}

})();
