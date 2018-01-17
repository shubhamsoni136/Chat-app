var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'index.html'));
});

io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log('Connected:%s socket connected',connections.length);

  socket.on('disconnect',function(){
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnect:%s socket connected',connections.length);
  });

  socket.on('send message',function(data){
    io.sockets.emit('new message',{msg:data});  
  });
});
