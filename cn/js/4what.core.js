(function() {

/**
 * @requires $js
 */
var $4what = window["$4what"] = $js;

/**
 * @param {String} args
 * @param {String} callback (optional)
 */
$4what.extend("include", function(args) {
	var root = (function() {
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
				this.load(
					root +
						//"js/jquery/jquery-1.3.2.min.js"
						//"js/jquery/jquery-1.4.4.min.js"
						//"js/jquery/jquery-1.5.2.min.js"
						//"js/jquery/jquery-1.6.4.min.js"
						//"js/jquery/jquery-1.7.2.min.js"
						"js/jquery/jquery-1.8.3.min.js"
				);
				break;

			// jQuery UI
			case "jqueryui": // for IE6+
				// v1.7 for jQuery 1.3.2+
				//this.load(root + "js/jquery/ui/1.7.3/jquery-ui.css");
				//this.load(root + "js/jquery/ui/1.7.3/jquery-ui.min.js");
				//this.load(root + "js/jquery/ui/1.7.3/ui.datepicker-zh-CN.min.js");

				// v1.8 for jQuery 1.3.2+
				//this.load(root + "js/jquery/ui/1.8.24/jquery-ui.min.css");
				//this.load(root + "js/jquery/ui/1.8.24/jquery-ui.min.js");
				//this.load(root + "js/jquery/ui/1.8.24/jquery.ui.datepicker-zh-CN.min.js");

				// v1.9 for jQuery 1.6+
				//this.load(root + "js/jquery/ui/1.9.2/jquery-ui.min.css");
				this.load(root + "js/jquery/ui/1.9.2/jquery-ui.min.js");
				//this.load(root + "js/jquery/ui/1.9.2/jquery.ui.datepicker-zh-CN.min.js");
				break;

			// jQuery lightBox
			case "jquery-lightbox":
				this.load(root + "js/jquery/plugin/lightbox/jquery.lightbox-0.5.css");
				this.load(root + "js/jquery/plugin/lightbox/jquery.lightbox-0.5.pack.js");
				break;

			// SyntaxHighlighter
			case "syntaxhighlighter":
				this.load(root + "js/syntaxhighlighter/shCore.css");
				this.load(root + "js/syntaxhighlighter/shCoreDefault.css");
				//this.load(root + "js/syntaxhighlighter/shThemeDjango.css");
				//this.load(root + "js/syntaxhighlighter/shThemeEclipse.css");
				//this.load(root + "js/syntaxhighlighter/shThemeEmacs.css");
				//this.load(root + "js/syntaxhighlighter/shThemeFadeToGrey.css");
				//this.load(root + "js/syntaxhighlighter/shThemeMDUltra.css");
				//this.load(root + "js/syntaxhighlighter/shThemeMidnight.css");
				//this.load(root + "js/syntaxhighlighter/shThemeRDark.css");
				this.load(root + "css/shTheme-4what.css");

				this.load(root + "js/syntaxhighlighter/shCore.js");
				//this.load(root + "js/syntaxhighlighter/shAutoloader.js");

				this.load(root + "js/syntaxhighlighter/shLegacy.js"); // v1.5

				this.load(root + "js/syntaxhighlighter/shBrushCss.js");
				this.load(root + "js/syntaxhighlighter/shBrushJava.js");
				this.load(root + "js/syntaxhighlighter/shBrushJScript.js");
				this.load(root + "js/syntaxhighlighter/shBrushPhp.js");
				this.load(root + "js/syntaxhighlighter/shBrushXml.js");

				// v3
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
				this.bind(window, "load", function() {
					dp.SyntaxHighlighter.HighlightAll("code", true, true, false, 1, false); // (name, [showGutter], [showControls], [collapseAll], [firstLine], [showColumns])
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
});

/**
 * @param {Object} data
 * @param {Object} target (optional)
 */
$4what.extend("log", function(data, target) {
	var p = document.createElement("p");
	p.innerHTML = data;
	!target ? document.body.appendChild(p) : target.appendChild(p);
});

/**
 * @param {String} name
 * @return {RegExp}
 */
$4what.extend("file", function(name) {
	return new RegExp("(?:/|\\\\)" + (name || "([^\\s\\./\\\\]+?)") + "\\.[^\\s\\./\\\\]+?$");
});

})();

// init
$4what.include("jquery");
