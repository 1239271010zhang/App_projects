var $signUp = (function(){
	var $signUpDOM = ''
		+'<div class="login">'
			+'<h1>管理后台注册</h1>'
			+'<form>'
				+'<label>用户名　</label>'
				+'<input type="text" id="username"/><i>　*</i>'
				+'<br />'
				+'<label>密　码　</label>'
				+'<input type="password" id="psw"/><i>　*</i>'
				+'<br />'
				+'<label>确　认　</label>'
				+'<input type="password" id="psw2"/><i>　*</i>'
				+'<br />'
//				+'<label>验证码　</label>'
//				+'<input type="text" id="inp-yzm"/>'
//				+'<br />'
				+'<input type="submit" value="注 册"/>'
			+'</form>'
		+'</div>';
	function show(config){
		$(app.config.appContainer).html('');
		$(app.config.appContainer).html($signUpDOM);
		
		var $form = $('form');
		function validate(){
			if($('#username').val() !== ""){
				if($('#psw').val() !== ""){
					if($('#psw').val() === $('#psw2').val()){
						return true;
					}
				}
			}
		}
		$form.submit(function(e){
			e.preventDefault();
			//合法性校验
			if(validate()){
				//创建http服务
				var obj={
					"username":$('#username').val(),
					"password":$('#psw').val()
				}
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
//				    console.log(xhr.readyState,xhr.status);
				    if (xhr.readyState == 4) {
				        //表示服务器的相应代码是200；正确返回了数据
				        if(xhr.status == 200){
				        	var message = xhr.responseText;
				        	console.log(message);
				            location.hash = '#/login';
				        }
				    }
				};
				xhr.open("post","http://127.0.0.1:8080?"+obj.username+","+obj.password,true);//使用POST方法
		        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
		        xhr.send();
			}
		});
	}
	return {show:show};
})();