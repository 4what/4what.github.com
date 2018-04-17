(function() {

/*
	(function toggle() {
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
	})();
*/

	// toggle
	$("h2 a").click(function() {
		$("#chapter-" + $(this).attr("name")).slideToggle("slow");
		$(this).find("span").text($(this).is(":contains('-')") ? "+" : "-");
	});

})();
