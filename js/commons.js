(function () {

/**
 * @requires $js
 */
var $4what = function () {
	var self = this;

	/**
	 * @param {Object} data
	 * @param {Object} target?
	 */
	self.log = function (data, target) {
		var p = document.createElement("p");
		p.className = "log";
		p.innerHTML = data;

		(target || document.body).appendChild(p);
	};

	/**
	 * @requires SyntaxHighlighter
	 *
	 * @param {String} root
	 */
	self.syntaxhighlighter = function (root) {
		var version = "3.0.83";

		$js.include(root + "js/syntaxhighlighter/" + version + "/shCoreDefault.css");
		$js.include(root + "css/syntaxhighlighter.css");

		$js.include(root + "js/syntaxhighlighter/" + version + "/shCore.js");
		//$js.include(root + "js/syntaxhighlighter/" + version + "/shAutoloader.js");

		$js.include(root + "js/syntaxhighlighter/" + version + "/shLegacy.js");

		$js.include(root + "js/syntaxhighlighter/" + version + "/shBrushCss.js");
		$js.include(root + "js/syntaxhighlighter/" + version + "/shBrushJava.js");
		$js.include(root + "js/syntaxhighlighter/" + version + "/shBrushJScript.js");
		$js.include(root + "js/syntaxhighlighter/" + version + "/shBrushXml.js");

		$js.bind(window, "load", function () {

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

			dp.SyntaxHighlighter.HighlightAll("code", true, false, false, 1, false); // (name, [showGutter], [showControls], [collapseAll], [firstLine], [showColumns])
		});
	}

	self.toggle = function () {
		var headings = document.getElementsByTagName("h2");

		for (var i = headings.length - 1; i >= 0; i--) {
			headings[i].getElementsByTagName("a")[0].onclick = function () {
				var section = document.getElementById("chapter-" + this.name);
				section.style.display = section.style.display === "none" ? "block" : "none";
			};
		}
	}
};

$4what.prototype = $js;

window.$4what = new $4what();

})();
