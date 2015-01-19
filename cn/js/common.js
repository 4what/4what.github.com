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
	$4what.bind(window, "load", function() {
		//setFont();
	});

	// font
	function setFont() {
		try {
			var anchors = document.getElementById("overview").getElementsByTagName("a");
			for (var i = 0, l = anchors.length; i < l; i++) {
				anchors[i]
					.style.fontSize = $4what.random(0.5, 2) * 1.618 + "em";
					//.className = "font-" + $4what.random(1, 10, true);
			}
		} catch (e) {}
	}

	/* jQuery */
	$(window).load(function() {

		// spotlight (for IE7-, Std)
		//window.setTimeout(function() {
			$("#overview li").eq(-1).delay(2000).effect("pulsate", 2000);
		//}, 2000);

	});
} else {
	switch (name) {
		case "works":
			// include
			$4what.include("jquery-lightbox");

			/* jQuery */
			$(function() {

				// jQuery lightBox
				$("ul.gallery p a").lightBox({
					imageLoading: "js/jquery/plugin/lightbox/0.5/images/lightbox-ico-loading.gif",
					imageBtnPrev: "js/jquery/plugin/lightbox/0.5/images/lightbox-btn-prev.gif",
					imageBtnNext: "js/jquery/plugin/lightbox/0.5/images/lightbox-btn-next.gif",
					imageBtnClose: "js/jquery/plugin/lightbox/0.5/images/lightbox-btn-close.gif",
					imageBlank: "js/jquery/plugin/lightbox/0.5/images/lightbox-blank.gif"
				});

			});
			break;
		default:
			break;
	}
}

})();
