(function() {

// include
$4what.include("jqueryui");

// onload
$js.bind(window, "load", function() {
	breadcrumb();

	// clock
	window.setInterval('$js.clock("clock")', 500);
});

// breadcrumb
function breadcrumb() {
	var
	anchors = document.getElementById("navbar").getElementsByTagName("a"),
	name,
	pathname = window.top.location.pathname,
	yes = "highlight",
	no = "original";
	for (var item, i = 0, l = anchors.length; i < l; i++) {
		item = anchors[i];
		name = item.name;
		if ($4what.file(name).test(pathname) || (name === "index" && /\/$/.test(pathname))) {
			item.className = yes;
		} else {
/*
			item.onclick = function() {
				for (var j = anchors.length - 1; j >= 0; j--) {
					anchors[j].className = no;
				}
				this.className = yes;
			};
*/
		}
	}
}

$(function() {

	// logo
	$("#logo").show("bounce", {
		distance: 20
	}, 2000);

});

})();
