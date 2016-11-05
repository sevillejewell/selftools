var options={
	"serverMail":{
		"service": "live",
		"host":"smtp.live.com",
		"port":'25',
		"auth": {
		    "user": "***@live.com", //你的账号
		    "pass": "***" //你账号的密码
		},
		"maxConnections": 10, //最大连接数
		"secure": false //use SSL
	},
	"toMail":"*****@qq.com",
  	"cycle":1000*1,	//多长时间检查一次
	"checkPorts":[8080],
	"errorPath":"D:/",
	"infoPath":"a",
}
module.exports=options;