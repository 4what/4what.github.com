(function() {

var
file, name,
pathname = window.top.location.pathname,
re = $4what.file().exec(pathname);

if (re) {
	file = re[0];
	name = re[1];
}

if (name === "index" || (!re && /\/$/.test(pathname))) {
	// include
	$4what.include("jqueryui");

	// onload
	$js.bind(window, "load", function() {
		setFont();
	});

	// font
	function setFont() {
		try {
			var anchors = document.getElementById("overview").getElementsByTagName("a");
			for (var i = 0, l = anchors.length; i < l; i++) {
				anchors[i]
					//.style.fontSize = $js.random(0.5, 2) * 1.618 + "em";
					.className = "font-" + $js.random(1, 10, true);
			}
		} catch (e) {}
	}
} else {
	switch (name) {
		case "works":
			// include
			$4what.include("jquery-lightbox");

			$(function() {

/*
				// jQuery lightBox
				$("ul.gallery div a").lightBox({
					imageLoading: "js/jquery/plugin/lightbox/0.5/images/lightbox-ico-loading.gif",
					imageBtnPrev: "js/jquery/plugin/lightbox/0.5/images/lightbox-btn-prev.gif",
					imageBtnNext: "js/jquery/plugin/lightbox/0.5/images/lightbox-btn-next.gif",
					imageBtnClose: "js/jquery/plugin/lightbox/0.5/images/lightbox-btn-close.gif",
					imageBlank: "js/jquery/plugin/lightbox/0.5/images/lightbox-blank.gif",

					txtImage: "",
					txtOf: "/"
				});
*/

			});
			break;
		default:
			break;
	}
}

})();
