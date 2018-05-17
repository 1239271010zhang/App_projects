var $login = (function(){
	var html = ''
		+'<div class="login">'
			+'<h1>集团后台登录</h1>'
			+'<form>'
				+'<label>用户名　</label>'
				+'<input type="text" />'
				+'<br />'
				+'<label>密　码　</label>'
				+'<input type="text" />'
				+'<br />'
				+'<label>验证码　</label>'
				+'<input type="text" id="inp-yzm"/>'
				+'<br />'
				+'<input type="submit" value="登 录"/>'
			+'</form>'
		+'</div>'
	function show(config){
		$(config.container).html(html);
	}
	return {show:show}
})();





/*<div id="admin-app">
	<div class="login">
		<h1>集团后台登录</h1>
		<form>
			<label>用户名　</label>
			<input type="text" />
			<br />
			<label>密　码　</label>
			<input type="text" />
			<br />
			<label>验证码　</label>
			<input type="text" id="inp-yzm"/>
			<!--<img src="" id="img-yzm"/>-->
			<br />
			<input type="submit" value="登 录"/>
		</form>
	</div>
</div>*/