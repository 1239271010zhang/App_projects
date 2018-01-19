$(function(){
	//获取localstorage中的昵称
	$(function(){
		if(localStorage.getItem('userName') !== null){
			$('#left_name>p').html(localStorage.getItem('userName'))
		}else{
			$('#left_name>p').html('管理员昵称')
		}
	})
	//获取上传头像
	$(function(){
		var path = localStorage.getItem('img_path');
		var img = $('.left_img>img')[0];
		if(path !== null){
			img.src = path;
		}else{
			img.src = "../img/chushi_img.jpg";
		}
	})
})
