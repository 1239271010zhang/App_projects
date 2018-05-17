var $peopleListPanel = (function() {
  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append(''
	    +'<div class="mbx">用户管理>用户列表</div>'
	    +'<table id="table">'
	    +'<tr>'
	    +'</tr>'
	    +'</table>');
	  var ThArr = ['用户ID','用户性别','账号','宠物种类','宠物年龄','宠物性别','操作'];
	  for(var i=0;i<ThArr.length;i++){
	  	$('#table tr').append('<th>'+ThArr[i]+'</th>')
	  };
	  app.peoplelist.forEach(function(m){
	  	$('#table').append(''
	  		+'<tr>'
	  		+'<td>'+m.userid+'</td>'
	  		+'<td>'+m.usersex+'</td>'
	  		+'<td>'+m.username+'</td>'
	  		+'<td>'+m.species+'</td>'
	  		+'<td>'+m.years+'</td>'
	  		+'<td>'+m.sex+'</td>'
	  		+'<td><button>删除</button></td>'
	  		+'</tr>');
	  });
	  $('#table').on('click','button',function(){
	  	$(this).parents('tr').remove();
				var id = $(this).parents('tr').find("td")[0].innerText;
				console.log(id)
				//创建http服务
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
	//			    console.log(xhr.readyState,xhr.status);
				    if (xhr.readyState == 4) {
				        //表示服务器的相应代码是200；正确返回了数据
				        if(xhr.status == 200){
				        	
				        }
				    }
				};
				xhr.open("get","http://127.0.0.1:8081?"+localStorage.getItem("panel")+"-"+"userid="+id,true);//使用POST方法
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
        xhr.send();
	  });
  }

  return {show: show};
})();