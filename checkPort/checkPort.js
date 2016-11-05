/*检测端口是否被占用:如果没有占用就发邮件通知,用来监听服务是否已经宕机*/

var net = require('net');
var fs=require('fs');
var nodemailer = require('nodemailer');
var smtpPool = require("nodemailer-smtp-pool");
var config = require("./config.js");

if(config.errorPath){
  if(config.errorPath.endsWith("/")){
    errorLog=config.errorPath+"error.log";
  }else{
    errorLog=config.errorPath+"/error.log";
  }
}else{
  console.log("please input errorPath");
  process.exit(1);
}
if(config.infoPath){
  if(config.infoPath.endsWith("/")){
    infoLog=config.infoPath+"info.log";
  }else{
    infoLog=config.infoPath+"/info.log";
  }
}else{
  console.log("please input infoPath");
}

var transporter = nodemailer.createTransport(smtpPool(config.serverMail));
var portArr = config.checkPorts;

function writeLog(namePath,data,isError){
  fs.writeFile(namePath, new Date()+":"+data, function(err){
    if (err){
      throw err;
    }
    if(isError){
      console.log('保存成功');
      process.exit(1);
    }
  });
}

function send(content) {
  transporter.sendMail({
    from: config.serverMail.auth.user,
    to: config.toMail,
    subject: '端口:' + content + 'tomcat已关闭',
    text: "请检查端口:" + content.toString() + "的tomcat", //必须要toString()
  }, function(err, res) {
    if (err) {
      console.log(err);
      writeLog(errorLog,err,true);
    } else {
      writeLog(infoLog,res);
      console.log(res);
    }
  });

}

function portIsOccupied(port) {
  // 创建服务并监听该端口
  var server = net.createServer().listen(port)

  server.on('listening', function() {
    server.close();
    send(port);
  })

  server.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
      console.log("端口:" + port + "的tomcat正常");
    }
  })
}

//启动监听
setInterval(function() {
  for (var i = portArr.length - 1; i >= 0; i--) {
    portIsOccupied(portArr[i]);
  };
}, config.cycle);