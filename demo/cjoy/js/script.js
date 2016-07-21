$(function() {

$(".navbar a:gt(0)").click(function() {
	$("html, body").animate({
		scrollTop: $("a[name='" + $(this).attr("href").slice(1) + "']").offset().top
	}, 500);
});

$(".countdown .wrapper").countdown({
	format: "dHM",
	layout:
		'<ul>' +
		'{d<}<li><div><p>{dn}</p>{dl}</div></li>{d>}' +
		'{h<}<li><div><p>{hn}</p>{hl}</div></li>{h>}' +
		'{m<}<li><div><p>{mn}</p>{ml}</div></li>{m>}' +
		'</ul>'
	,
	until: new Date(2016, 10 - 1, 1)
});

});
