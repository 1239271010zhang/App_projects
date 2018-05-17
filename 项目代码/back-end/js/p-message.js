var $messageListPanel = (function() {
  function show(config) {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append(''
    	+'<div class="mbx">消息管理>消息列表</div>'
    	+'<h1>$messageListPanel</h1>');
  }
  return {show: show};
})();