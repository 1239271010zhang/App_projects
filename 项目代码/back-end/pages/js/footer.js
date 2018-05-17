var $footer = (function(){
	html = ''
	+'<div class="admin-app__footer"><p>&copy;集团后台<p></div>'
	
	
	function show(config){
		$(app.config.appContainer).append(html);
	}
	
	return {show:show};
})();
