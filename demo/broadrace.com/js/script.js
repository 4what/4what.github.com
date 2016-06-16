new Swiper(".swiper-container", {
	nextButton: ".swiper-button-next",
	prevButton: ".swiper-button-prev"
});


$(".goto-top").click(function() {
	$("html, body").animate({
		scrollTop: 0
	}, 500);
});
