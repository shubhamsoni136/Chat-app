$(function(){
  var socket = io.connect();
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');
  var $users =$('#users');
  var $userArea = $('#userArea');
  var $messageArea= $('#messageArea');
  var $userForm = $('#userForm');
  var $username = $('#username');

  $messageForm.submit(function(e){
    e.preventDefault();
    socket.emit('send message',$message.val());
    $message.val('');
  });
  socket.on('new message',function(data){
    $chat.append('<div class="well"><strong>'+data.users+"</strong>:"+data.msg+'</div>');
  });
  $userForm.submit(function(e){
    e.preventDefault();
    socket.emit('new user',$username.val(),function(data){
      if(data){
        $userArea.hide();
        $messageArea.show();

      }
    });
    $username.val('');
  });
  socket.on('get user',function(data){
    var html ='';
    for(var i=0;i<data.length;i++){
        html+='<li class="list-group-item"><i class="fa fa-circle" style="color:#00E103;font-size:12px"></i>&nbsp'+data[i]+'</li>';
    }
    $users.html(html);
  });
});
