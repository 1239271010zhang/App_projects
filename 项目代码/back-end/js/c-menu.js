var $menu = (function(){
	var $menuDOM = (function(){
		var $dom = $('<div class="admin-app-menu"><ul></ul></div>');
		var $ulDOM = $dom.find('ul');
		
		app.menuDate.forEach(function(m){
			var $menuBarDOM = $(''
				+'<div class="menu-bar">'
					+'<i class="iconfont"></i>'
					+'<span></span>'
					+'<i class="iconfont icon-arrowdown"></i>'
				+'</div>');
			var $menuItemsDOM = $('<div class="menu-items"></div>');
			
			var $icon = $menuBarDOM.find('i:first-child');
			var $title = $menuBarDOM.find('span');
			
			$icon.addClass(m.icon);
			$title.html(m.title);
			
			m.items.forEach(function(s){
				var $menuItemDOM = $(''
				+'<div class="item">'
					+'<p></p>'
				+'</div>'
				);
				var $item = $menuItemDOM.find('p');
				
				$item.html(s.title);
				$item.attr('data-href',s.url);
				$menuItemsDOM.append($menuItemDOM);
			});
			var $liDOM = $('<li></li>');
			$liDOM.append($menuBarDOM);
			$liDOM.append($menuItemsDOM);
			$ulDOM.append($liDOM);
		});
		return $dom;
	})();
	function show(config){
		$(app.config.appContainer).append($menuDOM);
		var $menuBar = $('.menu-bar'),
			$menuItem = $('.item'),
			$lastmenuBar = null;
		$menuBar.click(function(e){
			var $menu = $(e.target).parents('li');
			var $items = $menu.find('.menu-items');
			var display = $items.css('display') === 'none'?'block':'none';
			$items.css('display',display);
			
			//箭头方向
			var arrowStyle = {'up': 'icon-arrowup', 'down': 'icon-arrowdown'};
			var $menubars = $menu.find('.menu-bar>i:last-child');
			if($menubars.hasClass(arrowStyle.down)){
				$menubars.removeClass(arrowStyle.down);
				$menubars.addClass(arrowStyle.up);
			}else{
				$menubars.removeClass(arrowStyle.up);
				$menubars.addClass(arrowStyle.down);
			}
			
			if(($lastmenuBar !== null) && ($lastmenuBar.get(0) !== $menu.get(0))){
				$lastmenuBar.find('.menu-items').css('display','none');
				$lastmenuBar.find('.menu-bar>i:last-child').removeClass(arrowStyle.up);
				$lastmenuBar.find('.menu-bar>i:last-child').addClass(arrowStyle.down);
			}
			$lastmenuBar = $menu;
		})
		
		function getPanel(router) {
		    var panel = router.replace(/-(.)/g, function(letter){
		      return letter;
		    }).replace(/#\//,'').replace(/-/g,'');
			localStorage.setItem("panel",panel);
		    return panel;
		};
		//侧边栏点击事件
		$menuItem.click(function(e){
			var $menuItem = $(e.currentTarget).find('p').attr('data-href');
			var panel = getPanel($menuItem);
			console.log(panel);
			if(panel.indexOf("list")>0){
				//创建http服务
				var obj = {
					'panel':panel
				}
				console.log(obj.panel);
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
	//			    console.log(xhr.readyState,xhr.status);
				    if (xhr.readyState == 4) {
				        //表示服务器的相应代码是200；正确返回了数据
				        if(xhr.status == 200){
				            var message = xhr.responseText;
				            var result = JSON.parse(message);
				            app[panel] = result;
//				            console.log(typeof result[0].img)
//				            console.log(result[0].img.substr(1,result[0].img.length-2))
//				            console.log(result[0].img.substr(1,result[0].img.length-2).split(",")[0]);
				            //stage局部刷新
				            location.hash = $menuItem;
				        }
				    }
				};
				xhr.open("get","http://127.0.0.1:8083?"+obj.panel,true);//使用POST方法
		        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
		        xhr.send();
		    }else{
		    	location.hash = $menuItem;
		    }
		})
	}
	
	return {show:show};
})();
