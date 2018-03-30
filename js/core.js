(function() {

/**
 * @requires $js
 */
var $4what = function() {
	/**
	 * @requires jQuery 1.3.2+
	 * @param {Object} obj
	 * @param {Object[]|String[]} spec
	 * @param {Object} code
	 */
	this.api = function(obj, spec, code) {
		var
		menu = [],
		methods = [],
		param = $js.url.param("method"),
		status = false;

		for (var key in obj) {
			methods.push(key);

			if (key === param) {
				status = true;
			}
		}

		methods.sort();

		for (var item, i = 0, l = methods.length; i < l; i++) {
			item = methods[i];
			menu.push('<a href="?method=' + item + '">' + item + '</a>');
		}

		$("#api-menu").html(menu.join(" | "));

		for (var i = spec.length - 1; i >= 0; i--) {
			$(spec[i]).each(function() {
				if (!$(this).hasClass(param)) {
					$(this).hide();
				}
			});
		}

		if (!status) {
			return;
		}

		$("#api-method").html(param);

		try {
			code[param]();
		} catch(e) {}
	};

	/**
	 * @param {String} name
	 * @return {RegExp}
	 */
	this.file = function(name) {
		return new RegExp("(?:/|\\\\)" + (name || "([^\\s\\./\\\\]+?)") + "\\.[^\\s\\./\\\\]+?$");
	};

	/**
	 * @requires jQuery 1.3.2+
	 * @param {String} args
	 * @param {String} callback (optional)
	 */
	this.include = function(args) {
		var host = (function() {
			var
			result = "",
			folders = ["article", "sample"],
			path,
			pathname = window.location.pathname,
			re;
			for (var item, i = folders.length - 1; i >= 0; i--) {
				item = folders[i];
				re = new RegExp("(?:/|\\\\)(" + item + "(?:/|\\\\)((?!" + item + "(?:/|\\\\)).)*?$)").exec(pathname);
				if (re) {
					path = re[1];
					re = /\/|\\/g;
					while (re.exec(path)) {
						result += "../";
					}
					break;
				}
			}
			return result;
		})();

		for (var i = 0, l = arguments.length; i < l; i++) {
			switch (arguments[i]) {
				// jQuery
				case "jquery": // for IE6+
					$js.include(
						host +
							//"js/jquery/jquery-1.3.2.min.js"
							"js/jquery/jquery-1.8.3.min.js"
					);
					break;

				// jQuery UI
				case "jqueryui": // for IE6+
					// v1.8 for jQuery 1.3.2+
					//$js.include(host + "js/jquery/ui/1.8.24/jquery-ui.min.css");
					//$js.include(host + "js/jquery/ui/1.8.24/jquery-ui.min.js");
					//$js.include(host + "js/jquery/ui/1.8.24/jquery.ui.datepicker-zh-CN.min.js");

					// v1.9 for jQuery 1.6+
					//$js.include(host + "js/jquery/ui/1.9.2/jquery-ui.min.css");
					$js.include(host + "js/jquery/ui/1.9.2/jquery-ui.min.js");
					//$js.include(host + "js/jquery/ui/1.9.2/jquery.ui.datepicker-zh-CN.min.js");
					break;

				// jQuery lightBox
				case "jquery-lightbox":
					$js.include(host + "js/jquery/plugin/lightbox/0.5/jquery.lightbox-0.5.css");
					$js.include(host + "js/jquery/plugin/lightbox/0.5/jquery.lightbox-0.5.pack.js");
					break;

				// SyntaxHighlighter
				case "syntaxhighlighter":
					$js.include(host + "js/syntaxhighlighter/3.0.83/shCoreDefault.css");

					$js.include(host + "css/syntaxhighlighter.css");

					$js.include(host + "js/syntaxhighlighter/3.0.83/shCore.js");
					//$js.include(host + "js/syntaxhighlighter/3.0.83/shAutoloader.js");

					$js.include(host + "js/syntaxhighlighter/3.0.83/shLegacy.js"); // v1.5

					$js.include(host + "js/syntaxhighlighter/3.0.83/shBrushCss.js");
					$js.include(host + "js/syntaxhighlighter/3.0.83/shBrushJava.js");
					$js.include(host + "js/syntaxhighlighter/3.0.83/shBrushJScript.js");
					$js.include(host + "js/syntaxhighlighter/3.0.83/shBrushPhp.js");
					$js.include(host + "js/syntaxhighlighter/3.0.83/shBrushXml.js");

					// v3.x
					$(function() {

						//SyntaxHighlighter.defaults["auto-links"] = true;
						//SyntaxHighlighter.defaults["class-name"] = "";
						//SyntaxHighlighter.defaults["collapse"] = false;
						//SyntaxHighlighter.defaults["first-line"] = 1;
						//SyntaxHighlighter.defaults["gutter"] = true;
						//SyntaxHighlighter.defaults["highlight"] = [];
						//SyntaxHighlighter.defaults["html-script"] = false;
						//SyntaxHighlighter.defaults["smart-tabs"] = true;
						//SyntaxHighlighter.defaults["tab-size"] = 4;
						//SyntaxHighlighter.defaults["toolbar"] = false;

						SyntaxHighlighter.all();

					});

					// v1.5
					$js.bind(window, "load", function() {
						dp.SyntaxHighlighter.HighlightAll("code", true, false, false, 1, false); // (name, [showGutter], [showControls], [collapseAll], [firstLine], [showColumns])
					});
					break;
				default:
					break;
			}
		}

		// callback
		var callback = arguments[arguments.length - 1];

		if (typeof callback === "function") {
			callback();
		}
	};

	/**
	 * @param {Object} data
	 * @param {Object} target (optional)
	 */
	this.log = function(data, target) {
		var p = document.createElement("p");
		p.className = "log";
		p.innerHTML = data;
		(target || document.body).appendChild(p);
	};
};

$4what.prototype = $js;

window.$4what = new $4what();

})();

// init
$4what.include("jquery");
