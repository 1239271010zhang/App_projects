var $footer = (function(){
	function show(config){
		$(app.config.appContainer).append('<div class="admin-app-footer"><p>2018&copy;P.E.T项目<p></div>');
	}
	
	return {show:show};
})();
