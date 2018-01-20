var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(8080);

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/new.js',function(req,res){
  res.sendFile(path.join(__dirname,'new.js'));
});
app.get('/main.css',function(req,res){
  res.sendFile(path.join(__dirname, 'main.css'));
});
app.get('/logo.png',function(req,res){
  res.sendFile(path.join(__dirname, 'logo.png'));
})

io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log('Connected:%s socket connected',connections.length);

  socket.on('disconnect',function(){
    users.splice(users.indexOf(socket.username),1);
    updateUsernames();
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnect:%s socket connected',connections.length);
  });

  socket.on('send message',function(data){
    io.sockets.emit('new message',{msg:data,users:socket.username});
  });

  socket.on('new user',function(data,callback){
    callback(true);
    socket.username=data;
    users.push(socket.username);
    updateUsernames();
  });

  function updateUsernames(){
    io.sockets.emit('get user',users)
  }
});
