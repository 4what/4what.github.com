/**
 * for Chrome, FireFox, IE11+, Safari
 *
 * @author 4what
 * @requires impress, jQuery 1.8.3+, jQuery UI, $js
 */
window.Lottery = {
	/**
	 * @param {Object} options
	 */
	init: function(options) {
		var
		defaults = {
			anonymous: true, // {Boolean}
			auto: false, // {Boolean}
			awards: [], // {Object[]} [{"index": 0, "name": "", "amount": 0}, ...] (*)
			cover: "", // {String} (*)
			client: false, // {Boolean}
			donate: new Function("id", ""), // {Function} (*: !client)
			generate: function(callback, award) {
				callback({ "id": 0, "name": "", "src": "" });
			}, // {Function} (*: !client),
			players: null, // {Object[]} [{"id": 0, "src": ""}, ...] (*: !anonymous || client)
			positions: null, // {Object[]}, [{"0px, 0px, 0px"}, ...]
			total: 0 // {Number} (*: anonymous && !positions)
		},
		settings = $.extend(defaults, options),

		reserved = $("#impress div.step").length, // 0: overview, 1: winner
		total = settings.anonymous ? (settings.positions ? settings.positions.length : settings.total) : settings.players.length,

		steps = $(), // frags, shapes
		template = function(src, id) {
			return '<div class="step item"' + (!id ? '' : ' id="item-' + id + '"') + '><img src="' + src + '" alt="" /></div>';
		},

		idle = true,
		live, loaded, locked,

		award = {
			$: $("#award"),
			cookie: {
				k: "awards"
			},
			data: settings.awards
		},
		winner = {
			$: $("#winner"),
			cookie: {
				k: "winners"
			}
		},

		msg = $("#msg"),
		ready = $("#ready");

		function reset() {
			impress().goto(0);
			winner.$.hide();
		}

		function setAward(index, n) {
			if (award.index === index && !n) {
				return;
			}

			if (settings.client && !award.cookie.v) {
				award.cookie.v = (award.cookie.v = $js.cookie(award.cookie.k)) ? award.cookie.v.split(",") : [];

				for (var item, i = 0, l = award.cookie.v.length; i < l; i++) {
					item = award.cookie.v[i];
					if (item) {
						award.data[i].amount = item;
					}
				}
			}

			var
			amount = award.$.find("span"),
			sign = award.$.find("em");

			for (var item, i = 0, l = award.data.length; i < l; i++) {
				item = award.data[i];
				if (parseInt(item.index, 10) === parseInt(index, 10)) {
					if (!n) {
						reset();

						award.index = index;

						award.$.stop(true, true).fadeOut(function() {
							$(this).html(item.name + '<sub>（<span>' + (award.amount = parseInt(item.amount, 10)) + '</span>）<em></em></sub>');
						}).slideDown();
					} else {
						item.amount = award.amount += n;

						if (settings.client) {
							award.cookie.v[i] = award.amount;

							$js.cookie(award.cookie.k, award.cookie.v);
						}

						function refresh() {
							amount.fadeTo("fast", 0.5,function() {
								$(this).html(award.amount);
							}).fadeTo("fast", 1);
						}

						if (n > 0) {
							sign.stop(true, true).hide().html("+" + n).fadeIn(refresh).hide("drop", { direction: "up" });
						} else {
							refresh();
						}
					}

					break;
				}
			}
		}

		function start() {
			if (award.amount === 0) {
				return;
			}

			locked = true;

			function run(data) {
				reset();

				setAward(award.index, -1);

				if (!settings.client) {
					winner.id = data.id;
				}

				winner.$
					.find("img").attr("src", data.src)
					.end().find("p").html(data.name);

				function go() {
					var fn, loop;

					function stop(intervalId) {
						window.clearInterval(intervalId);
						winner.$.show();
						impress().goto("winner");
						locked = false;
					}

					if (!settings.auto) {
						live = true;

						fn = function(intervalId) {
							if (live) {
								impress().goto($js.random(reserved, total + reserved - 1, true));
							} else {
								stop(intervalId);
							}
						};
					} else {
						var
						points = $js.randoms((total > (5 * 1.618) ? 5 : parseInt(total * 0.618, 10)), reserved, total + reserved - 1, true, false),

						i = 0,
						l = points.length;

						fn = function(intervalId) {
							if (i < l) {
								impress().goto(points[i]);
								i++;
							} else {
								stop(intervalId);
							}
						};
					}

					loop = window.setInterval(function() {
						fn(loop);
					}, settings.anonymous ? 500 : 800);
				}

				ready.html("READY").show("drop", { direction: "right" }).delay(1000).hide("drop", function() {
					$(this).html("GO!");
				}).fadeIn(go).delay(1000).hide("puff");
			}

			if (!settings.client) {
				settings.generate(run, award.index);
			} else if (settings.players) {
				function generate() {
					var
					exist,
					index = $js.random(0, settings.players.length - 1, true);

					for (var i = winner.cookie.v.length - 1; i >= 0; i--) {
						if (parseInt(winner.cookie.v[i], 10) === parseInt(settings.players[index].id, 10)) {
							exist = true;
							break;
						}
					}

					if (!exist) {
						winner.name = settings.players[index].name;
						winner.src = settings.players[index].src;

						winner.cookie.v.push(winner.id = settings.players[index].id);

						$js.cookie(winner.cookie.k, winner.cookie.v);

						run(winner);
					} else {
						generate(); // recursion
					}
				}

				if (!winner.cookie.v) {
					winner.cookie.v = (winner.cookie.v = $js.cookie(winner.cookie.k)) ? winner.cookie.v.split(",") : [];
				}

				if (winner.cookie.v.length < settings.players.length) {
					generate();
				} else {
					// TODO
				}
			}
		}

		// init
		award.$.hide();
		winner.$.hide();

		msg.hide();
		ready.hide();

		for (var i = 0; i < total; i++) {
			var html = template(settings.cover);
			if (!settings.anonymous) {
				var player = settings.players[i];
				html = template(player.src, player.id);
			}
			steps.after(
				$(html).attr({
					"data-x": ($js.random(0, 1, true) ? "" : "-") + $js.random(0, 6000, true),
					"data-y": ($js.random(0, 1, true) ? "" : "-") + $js.random(0, 2000, true),
					"data-z": ($js.random(0, 1, true) ? "" : "-") + $js.random(0, 1000, true),
					"data-rotate": $js.random(0, 360, true)
				}).hide().css("top", "-16383px")
			);
		}

		$("#impress").append(steps);

		// load
		$(function() {

			var
			style,
			transforms = [],

			transform = /transform:(.*?);/,
			translate3d = /(translate3d\().*?(\))/,

			imgs = steps.find("img");

			steps.each(function(i) {
				if (settings.positions) {
					style = $(this).attr("style");

					transforms.push(transform.exec(style)[1]);

					$(this).attr("style", style.replace(translate3d, "$1" + (settings.positions[i] || "0, 0, 0") + "$2"));
				}

				$(this).show().animate({
					"top": 0
				}, 2000, function() {
					if (i === total - 1) {
						function showtime() {
							if (idle) {
								function effect(turned) {
									var x, y;

									for (var j = total - 1; j >= 0; j--) {
										x = ($js.random(0, 1, true) ? "" : "-") + $js.random(0, 9999, true) + "px";
										y = ($js.random(0, 1, true) ? "16384" : "-16383") + "px";

										steps.eq(j).animate($js.random(0, 1, true) ? {
											"left": x,
											"top": y
										} : {
											"left": y,
											"top": x
										}, {
											always: function(animation, jumpedToEnd) {
												if ($(this).index() === reserved) {
													if (turned) {
														imgs.attr("src", settings.cover);
													}

													window.setTimeout(function() {
														steps.each(function(k) {
															$(this).animate({
																"left": 0,
																"top": 0
															}, 2000, function() {
																if (k === total - 1) {
																	window.setTimeout(showtime, 500); // recursion
																}
															});

															steps.delay(/*200 - k*/);
														});
													}, 200);
												}
											},
											duration: 2000
										}).end().delay(/*200 - (total - 1 - j)*/);
									}
								}

								if (settings.anonymous && settings.players && settings.players.length >= total) {
									imgs.each(function(j) {
										$(this).fadeTo("fast", 0.5, function() {
											$(this).attr("src", settings.players[j].src);
										}).fadeTo("fast", 1, function() {
											if (j === total - 1) {
												window.setTimeout(function() {
													effect(true);
												}, 500);
											}
										});

										imgs.delay(100);
									});
								} else {
									effect();
								}
							} else {
								if (settings.positions) {
									steps.each(function(j) {
										$(this).css({
											"transform": transforms[j],
											"transition": "all 1s"
										});
									});
								}

								loaded = true;
							}
						}

						window.setTimeout(showtime, 500);
					}
				});

				steps.delay(200 - i);
			});

		});

		// keyup
		$(document).keyup(function(e) {
			idle = false;

			var
			code = e.which,
			key = String.fromCharCode(code);

			if (loaded && !locked) {
				if (/\d/.test(key)) {
					setAward(key);
				} else {
					if (award.index) {
						switch (code) {
							case 32: // space
								start();
								return;
							case 187: // =
								setAward(award.index, 1);
								return;
							case 189: // -
								if (!settings.client && winner.id) {
									settings.donate(winner.id);
								}
								return;
							default:
								break;
						}
					}

					msg.stop(true, true).fadeIn().delay(5000).fadeOut();
				}
			}

			// enter
			if (!settings.auto && live && code === 13) {
				live = false;
			}
		});

		// clear
		if (!settings.client) {
			for (var items = [award.cookie.k, winner.cookie.k], i = items.length - 1; i >= 0; i--) {
				$js.cookie(items[i], null);
			}
		}

		// impress
		impress().init();
	}
};
