$(function() {

	var qrcode = $(".qrcode");

	$(".action-qrcode").add(qrcode).hover(function() {
		qrcode.stop().animate({
			bottom: 0
		}, 200);
	}, function() {
		qrcode.stop().animate({
			bottom: "-" + qrcode.height()
		});
	});


	$(".action-top").click(function() {
		$("html, body").animate({
			scrollTop: 0
		}, 500);
	});


	$(".slick").slick({
		prevArrow: ".slick-prev",
		nextArrow: ".slick-next",

		speed: 200
	}).on("afterChange", function(event, slick, currentSlide, nextSlide) {
	});

});
