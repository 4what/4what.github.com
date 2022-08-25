(function() {

	/*
	(function toggle() {
		var headings = document.getElementsByTagName("h2");

		for (var i = headings.length - 1; i >= 0; i--) {
			headings[i].getElementsByTagName("a")[0].onclick = function() {
				var
				icon = this.getElementsByTagName("span")[0],
				section = document.getElementById("chapter-" + this.name);

				icon.innerHTML = icon.innerHTML === "-" ? "+" : "-";
				section.style.display = section.style.display === "none" ? "block" : "none";
			};
		}
	})();
	*/

	/* toggle */
	$("h2 a").click(function() {
		var icon = $(this).find("span").eq(0);
		icon.text(icon.is(":contains('-')") ? "+" : "-");

		$("#chapter-" + $(this).attr("name")).slideToggle("slow");
	});

})();
