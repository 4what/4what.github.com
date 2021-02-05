(function() {
	Monsoon.Nav.__updateNavButtons = Monsoon.Nav.updateNavButtons;
	Monsoon.Nav.updateNavButtons = (function() {
		$('#dropdownMenuNavigation').attr('disabled', !this.enabled);
		Monsoon.Nav.__updateNavButtons();
	}).bind(Monsoon.Nav);
})();
