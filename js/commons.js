/**
 * @param {Object} data
 * @param {Object} target?
 */
function Log(data, target) {
	var id = "logs";

	if (!target) {
		target = document.getElementById(id);

		if (!target) {
			target = document.createElement("div");
			target.id = id;

			document.body.appendChild(target);
		}
	}

	var p = document.createElement("p");
	p.innerHTML = data;

	target.appendChild(p);
};


/**
 * @requires SyntaxHighlighter, X
 *
 * @param {String} root
 */
var Highlighter = function (root) {
	var version = "3.0.83";

	X.include(root + "js/syntaxhighlighter/" + version + "/shCoreDefault.css");
	X.include(root + "css/syntaxhighlighter.css");

	X.include(root + "js/syntaxhighlighter/" + version + "/shCore.js");
	X.include(root + "js/syntaxhighlighter/" + version + "/shLegacy.js");

	X.include(root + "js/syntaxhighlighter/" + version + "/shBrushCss.js");
	X.include(root + "js/syntaxhighlighter/" + version + "/shBrushJava.js");
	X.include(root + "js/syntaxhighlighter/" + version + "/shBrushJScript.js");
	X.include(root + "js/syntaxhighlighter/" + version + "/shBrushPlain.js");
	X.include(root + "js/syntaxhighlighter/" + version + "/shBrushXml.js");

	X.bind(window, "load", function () {
		//SyntaxHighlighter.defaults["auto-links"] = true;
		//SyntaxHighlighter.defaults["class-name"] = "";
		//SyntaxHighlighter.defaults["collapse"] = false;
		//SyntaxHighlighter.defaults["first-line"] = 1;
		SyntaxHighlighter.defaults["gutter"] = false;
		//SyntaxHighlighter.defaults["highlight"] = [];
		//SyntaxHighlighter.defaults["html-script"] = false;
		//SyntaxHighlighter.defaults["light"] = false;
		//SyntaxHighlighter.defaults["pad-line-numbers"] = false;
		//SyntaxHighlighter.defaults["smart-tabs"] = true;
		SyntaxHighlighter.defaults["quick-code"] = false;
		//SyntaxHighlighter.defaults["tab-size"] = 4;
		SyntaxHighlighter.defaults["toolbar"] = false;

		SyntaxHighlighter.all();

		dp.SyntaxHighlighter.HighlightAll("code");
	});
};


var Toggle = function () {
	var headings = document.getElementsByTagName("h2");

	for (var i = headings.length - 1; i >= 0; i--) {
		headings[i].getElementsByTagName("a")[0].onclick = function () {
			var section = document.getElementById("section-" + this.name);
			section.style.display = section.style.display === "none" ? "block" : "none";
		};
	}
};
