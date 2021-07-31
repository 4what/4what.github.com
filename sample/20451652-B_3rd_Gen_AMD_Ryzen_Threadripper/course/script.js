var myWindow;

function openWin() {
	myWindow = window.open("", "myWindow", "width=200,height=100");
	myWindow.document.write("<p>This is 'myWindow'</p>");
}

function closeWin() {
	myWindow.close();
}


$(Monsoon).on('page_enter.monsoon', function() {
	$("html, body").animate({scrollTop: 0}, 0);
});

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});

$(function () {
  $('.example-popover').popover({
    container: 'body'
  })
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})

$('.popupover').popover();
jQuery("body").on("click touchstart", '.popupover', function() {
$(this).popover("show");
    $('.popupover').not(this).popover("hide"); // hide other popovers
    return false;
});
jQuery("body").on("click touchstart", function() {
    $('.popupover').popover("hide"); // hide all popovers when clicked on body
});

$('#popoverId').popover({
    html: true,
    title: 'Popover Title<a class="close" href="#");">&times;</a>',
    content: $('#popoverContent').html(),
});

$('#popoverId').click(function (e) {
    e.stopPropagation();
});

$(document).click(function (e) {
    if (($('.popover').has(e.target).length == 0) || $(e.target).is('.close')) {
        $('#popoverId').popover('hide');
    }
});

function waitFlips(page) {
	var $flips = $(page).find('.card-container > .card > .side:first-child');
	Monsoon.Nav.off();

	var hoverTimer = null;

	$flips.bind('mouseenter', function(e) {
		console.log('mouseenter!!!');
		if(hoverTimer != null) {
			clearTimeout(hoverTimer);
		}

		hoverTimer = setTimeout(function() {
			console.log('mouseenter!!! VIEWED');
			$(e.currentTarget).addClass('viewed');

			//Lets check if they are all viewed
			var sideCount = $(page).find('.card-container > .card > .side:first-child').length;
			var viewedCount = $(page).find('.card-container > .card > .viewed:first-child').length;

			if(viewedCount >= sideCount) {
				Monsoon.Nav.on();
			}
		}, 0); //If your nav isn't enabling possibly reduce this value... the alternate view can cause the mouse leave event


	});

	$flips.bind('mouseleave', function(e) {
		if(hoverTimer != null) {
			clearTimeout(hoverTimer);
		}
	});
}


// This is the script to lock nav until completion of hotspots
$(document).ready(function() {
	Monsoon.Components['clicksee']['_checklock'] = function(container) {
		var $container = $(container);
		var $clicks = $container.find('.click');
		console.log($clicks, $clicks.filter('.viewed, .active'))
		if($clicks.length !== $clicks.filter('.viewed, .active').length) return true;
		$container.trigger('complete.clicksee');
		return false;
	};
});


// This is the script to lock nav until completion of hotspots
$(document).ready(function() {
	Monsoon.Components['hotspots']['_checklock'] = function(container) {
		var $container = $(container);
		var $clicks = $container.find('.click');
		console.log($clicks, $clicks.filter('.viewed, .active'))
		if($clicks.length !== $clicks.filter('.viewed, .active').length) return true;
		$container.trigger('complete.hotspots');
		return false;
	};
});

function waitcClicksee(page) {
	Monsoon.Nav.off();
	$(page).find('.component-clicksee').bind('complete.clicksee', function() {
		Monsoon.Nav.on();
	});
}


function waitHotpots(page) {
    Monsoon.Nav.off();
    $(page).find('.component-hotspots').bind('complete.hotspots', function () {
        Monsoon.Nav.on();
    });
}


// Pages['pg4'] = {
// 	'onLoad': waitcClicksee,
// 	'onExit': function() {
// 		Monsoon.Nav.on();
// 	}
// };

// Pages['pg5'] = {
// 	'onLoad': waitcClicksee,
// 	'onExit': function() {
// 		Monsoon.Nav.on();
// 	}
// };

Pages['pg16'] = {
    onLoad: function(page) {
        $(page)
            .find('.exit-button')
            .on('click', function(e) {
                e.preventDefault();

                try {
                    if(!window.closed) {
                        window.close();
                        if(window.closed) return;
                    }

                    var parentWindow = window.parent !== window && window.parent;

                    if(parentWindow && !parentWindow.closed) {
                        parentWindow.close();
                        if(parentWindow.closed) return;
                    }

                    (parentWindow || window).location.href = 'about:blank';
                } catch(e) {
                    setTimeout(function() {
                        (parentWindow || window).location.href = 'about:blank';
                    }, 500);
                }
            });
    }
};
