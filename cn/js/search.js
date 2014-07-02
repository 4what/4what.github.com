(function() {

/* jQuery */
$(function() {

	// subnav
	$("#subnav li a").each(function() {
		var
		item = $(this).find("span"),
		name = $(this).attr("name"),
		pathname = window.top.location.pathname;
		if ($4what.file(name).test(pathname) || (name === "index" && /\/$/.test(pathname))) {
			$(this).find("em").css("background", item.css("background-color")).addClass("highlight");
		} else {
			item = item.andSelf();
			function handler(sign) {
				item.animate({
					"width": sign + "=15"
				}, "fast");
			}
			$(this).mouseenter(function() {
				handler("+");
			}).mouseleave(function() {
				handler("-");
			});
		}
	});

});

})();
