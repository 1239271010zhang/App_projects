var mysql  = require('mysql');  
var http = require("http");
var url = require("url");
var mysql  = require('mysql'); 
var data = 'peoplelist';
var result;
//注册账户
http.createServer(function(req,res){
	data = req.url.slice(2).split(',');
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'front', 
	});
	var selectVip = 'SELECT * FROM userlist';
	var exist;
	connection.query(selectVip,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
        }else{
	      	console.log('--------------------------select----------------------------');
	      	console.log(result);
	      	console.log('------------------------------------------------------------\n\n');  
	        for(var i=0;i<result.length;i++){
	        	if(data[0] == result[i].username){
	        		exist = true;
	        		res.writeHead(200, {
			            "Content-Type": "text/plain",
			            // res.writeHead(200, {"Content-Type": "application/json",
			            "Access-Control-Allow-Origin":"*",
			            "Access-Control-Allow-Methods": "GET, POST"
			        });
	        		res.end("0");
	        		break;
	        	}else{
	        		exist = false;
	        	}
	        }
	        if(!exist){
				//创建sql服务
				var connection = mysql.createConnection({     
				  host     : 'localhost',       
				  user     : 'root',              
				  password : '123456lmz',       
				  port: '3306',                   
				  database: 'front', 
				});
				var addVip = 'insert into userlist(username,passworld) values(?,?)';
				var param = [data[0],data[1]];
				connection.query(addVip, param,function (err, result) {
				      if(err){
				        console.log('[INSERT ERROR] - ',err.message);
				      }else{
				      	console.log('--------------------------insert----------------------------');
				      	console.log('insert id: '+result.insertId);
				      	console.log('------------------------------------------------------------\n\n');  
				      	res.writeHead(200, {
				            "Content-Type": "text/plain",
				            // res.writeHead(200, {"Content-Type": "application/json",
				            "Access-Control-Allow-Origin":"*",
				            "Access-Control-Allow-Methods": "GET, POST"
				        });
			    		res.end("1");
				      }
				});
			}
}).listen(8084,"127.0.0.1");

//改密码
http.createServer(function(req,res){
	var data = req.url.slice(2).split(',');
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'front', 
	}); 
	connection.connect(function(err){
		if(err){
			console.log("连接数据库失败");
		}else{
			console.log("连接数据库成功");
		}
	});
	var userSql = "update userlist set password="+data[0]+" where username="+data[1];
//	var param = [1000, 2];
	connection.query(userSql,function (error, result) {
	  if(error)
	  {
	      console.log(error.message);
	  }else{
	    console.log('result: '+result);
        res.writeHead(200, {
            "Content-Type": "text/plain",
            // res.writeHead(200, {"Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods": "GET, POST"
        });
		res.end("修改成功");
	  }
	});
	connection.end(function(){
		
	});
}).listen(8085,"127.0.0.1");

//查询商品列表&&登录
http.createServer(function(req,res){
	var data = req.url.slice(2).split(',');
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'front', 
	}); 
	connection.connect(function(err){
		if(err){
			console.log("连接数据库失败");
		}else{
			console.log("连接数据库成功");
		}
	});
	var selectVip;
	if(data.length=1){
		selectVip = 'SELECT * FROM '+data[0];
	}else{
		selectVip = 'SELECT * FROM '+data[0]+'where username='+data[1];
	}
	connection.query(selectVip,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
        }else{
	      	console.log('--------------------------select----------------------------');
	      	console.log(result);
	      	console.log('------------------------------------------------------------\n\n');  
	        res.writeHead(200, {
	            "Content-Type": "text/plain",
	            // res.writeHead(200, {"Content-Type": "application/json",
	            "Access-Control-Allow-Origin":"*",
	            "Access-Control-Allow-Methods": "GET, POST"
	        });
    		res.end(JSON.stringify(result));
        }
	});
		
}).listen(8090,"127.0.0.1");

//查询商品详细列表
http.createServer(function(req,res){
	var data = req.url.slice(2);
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'front', 
	}); 
	connection.connect(function(err){
		if(err){
			console.log("连接数据库失败");
		}else{
			console.log("连接数据库成功");
		}
	});
	var selectVip = 'SELECT * FROM goodslist where id='+data;
	connection.query(selectVip,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
        }else{
	      	console.log('--------------------------select----------------------------');
	      	console.log(result);
	      	console.log('------------------------------------------------------------\n\n');  
	        res.writeHead(200, {
	            "Content-Type": "text/plain",
	            // res.writeHead(200, {"Content-Type": "application/json",
	            "Access-Control-Allow-Origin":"*",
	            "Access-Control-Allow-Methods": "GET, POST"
	        });
    		res.end(JSON.stringify(result));
        }
	});
		
}).listen(8086,"127.0.0.1");

//添加购物车
http.createServer(function(req,res){
	data = req.url.slice(2).split(',');
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'front', 
	}); 
	connection.connect(function(err){
		if(err){
			console.log("连接数据库失败");
		}else{
			console.log("连接数据库成功");
		}
	});
	var addVip = 'insert into carlist(username,name,price,num) values(?,?,?,?)';
	var param = [data[0],data[1],data[2],data[3]];
	connection.query(addVip, param,function (err, result) {
	      if(err){
	        console.log('[INSERT ERROR] - ',err.message);
	      }else{
	      	console.log('--------------------------insert----------------------------');
	      	console.log('insert id: '+result.insertId);
				console.log(result);
	      	console.log('------------------------------------------------------------\n\n');  
	      }
	 
	});
}).listen(8087,"127.0.0.1");

//删除购物车
http.createServer(function(req,res){
	var data = req.url.slice(2).split(",");
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'front', 
	}); 
	connection.connect(function(err){
		if(err){
			console.log("连接数据库失败");
		}else{
			console.log("连接数据库成功");
		}
	});
	var deleteVip = 'delete from carlist where username='+data[0]+'and name='+data[1];
	connection.query(deleteVip, function(error, result){
	  if(error)
	  {
	    console.log('[DELETE ERROR] - ',error.message);
	  }else{
	    console.log('result: '+result);
        res.writeHead(200, {
            "Content-Type": "text/plain",
            // res.writeHead(200, {"Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods": "GET, POST"
        });
		res.end("修改成功");
	  }
	});
	connection.end(function(){
		
	});
}).listen(8088,"127.0.0.1");

//查看购物车
http.createServer(function(req,res){
	var data = req.url.slice(2);
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'front', 
	}); 
	connection.connect(function(err){
		if(err){
			console.log("连接数据库失败");
		}else{
			console.log("连接数据库成功");
		}
	});
	var selectVip = 'SELECT * FROM carlist where username='+data
	connection.query(selectVip,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
        }else{
	      	console.log('--------------------------select----------------------------');
	      	console.log(result);
	      	console.log('------------------------------------------------------------\n\n');  
	        res.writeHead(200, {
	            "Content-Type": "text/plain",
	            // res.writeHead(200, {"Content-Type": "application/json",
	            "Access-Control-Allow-Origin":"*",
	            "Access-Control-Allow-Methods": "GET, POST"
	        });
    		res.end(JSON.stringify(result));
        }
	});
		
}).listen(8089,"127.0.0.1");

console.log('start serve!');