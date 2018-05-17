var $playList3Panel = (function() {
  function show(config) {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append(''
	    +'<div class="mbx">活动管理>新人立减券</div>'
	    +'<table id="table">'
    	+'<tr></tr>'
    	+'</table>');
    var ThArr = ['编号','立减券类型','总数','剩余量','备注','操作'];
    for(var i=0;i<ThArr.length;i++){
    	$('#table tr').append(''
    	+'<th>'+ThArr[i]+'</th>')
    }
    app.playlist3.forEach(function(m){
    	$('#table').append(''
    	+'<tr>'
    	+'<td>'+m.id+'</td>'
    	+'<td>'+m.name+'</td>'
    	+'<td>'+m.Totalnum+'</td>'
    	+'<td>'+m.Remnum+'</td>'
    	+'<td style="text-align:left;">'+m.text+'</td>'
    	+'<td><button>删除</button></td>'
    	+'</tr>')
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
				xhr.open("get","http://127.0.0.1:8081?"+localStorage.getItem("panel")+"-"+"id="+id,true);//使用POST方法
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
        xhr.send();
	  });
  }
  return {show: show};
})();