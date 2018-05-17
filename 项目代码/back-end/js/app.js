$(function(){
	if(!localStorage.getItem('Logined')){
		$login.show();
		location.hash="/login"
	}else{
		$('#admin-app').html("");
		$header.show();
		$menu.show();
		$stage.show();
		$footer.show();
	}
	
	window.onhashchange = function(){
		if(location.hash === '#/index'){
			$('#admin-app').html("");
			$header.show();
			$menu.show();
			$stage.show();
			$footer.show();
		}else if(location.hash === '#/login'){
			$login.show();
			localStorage.removeItem('Logined')
		}else if(location.hash === '#/signUp'){
			$signUp.show();
		}else {
	    	$stage.load(location.hash);
	    }
	}
})
