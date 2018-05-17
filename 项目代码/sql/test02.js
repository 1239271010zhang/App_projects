var http = require("http");
var url = require("url");
var mysql  = require('mysql'); 
var result;

//添加数据
http.createServer(function(req,res){
	var data = req.url.slice(2).split(",");
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'pet', 
	});
	var selectVip = 'SELECT * FROM adminlist';
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
				  database: 'pet', 
				});
				var addVip = 'insert into adminlist(id,username,password) values(0,?,?)';
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
        }
	});
}).listen(8080,"127.0.0.1");

//删
http.createServer(function(req,res){
	var data = req.url.slice(2);
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'pet', 
	}); 
	connection.connect(function(err){
		if(err){
			console.log("连接数据库失败");
		}else{
			console.log("连接数据库成功");
		}
	});
	var deleteVip = 'delete from '+data.substr(0,data.indexOf("-"))+' where ' + data.substr(data.indexOf("-")+1);
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
}).listen(8081,"127.0.0.1");

//改
http.createServer(function(req,res){
	var data = req.url.slice(2);
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'pet', 
	}); 
	connection.connect(function(err){
		if(err){
			console.log("连接数据库失败");
		}else{
			console.log("连接数据库成功");
		}
	});
	var userSql = "update adminlist set password="+JSON.stringify(data.substr(0,data.indexOf("-")))+" where username="+JSON.stringify(data.substr(data.indexOf("-")+1));
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
}).listen(8082,"127.0.0.1");

//查询表
http.createServer(function(req,res){
	var data = req.url.slice(2);
	console.log(data);
	//创建sql服务
	var connection = mysql.createConnection({     
	  host     : 'localhost',       
	  user     : 'root',              
	  password : '123456lmz',       
	  port: '3306',                   
	  database: 'pet', 
	}); 
	connection.connect(function(err){
		if(err){
			console.log("连接数据库失败");
		}else{
			console.log("连接数据库成功");
		}
	});
	var selectVip = 'SELECT * FROM '+data
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
		
}).listen(8083,"127.0.0.1");
console.log('start serve!');