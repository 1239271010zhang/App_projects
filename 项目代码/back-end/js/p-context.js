var $contextListPanel = (function() {
  function show(config) {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append(''
	    +'<div class="mbx">内容管理>内容列表</div>'
	    	+'<h1>$contextListPanel</h1>');
  }
  return {show: show};
})();