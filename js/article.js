(function() {

// include
if ($4what.file().exec(window.location.pathname)[1] === "wiki") {
	$4what.include("syntaxhighlighter");
}

// onload
$4what.bind(window, "load", function() {
	//toggle();
});

// toggle
function toggle() {
	var headings = document.getElementsByTagName("h2");
	for (var i = headings.length - 1; i >= 0; i--) {
		headings[i].getElementsByTagName("a")[0].onclick = function() {
			var
			ico = this.getElementsByTagName("span")[0],
			section = document.getElementById("chapter-" + this.name);
			ico.innerHTML = ico.innerHTML === "-" ? "+" : "-";
			section.style.display = section.style.display === "none" ? "block" : "none";
		};
	}
}

/* jQuery */
$(function() {

	// toggle
	$("h2 a").click(function() {
		$("#chapter-" + $(this).attr("name")).slideToggle("slow");
		$(this).find("span").text($(this).is(":contains('-')") ? "+" : "-");
	});

});

})();
