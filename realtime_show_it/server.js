var app = require('express')();
var http = require('http').Server(app);
var io= require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname +'/index.html');
});
io.on('connection',function(socket){
	
	console.log('a new connection id: '+socket.id);
	
	socket.on('chat message',function(data){
		console.log(data);
		io.emit('chat message', data);
		});
		socket.on('code',function(code){
			console.log(code);
			io.emit('code',code);
			
		});
		
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000,'0.0.0.0', function(){
  console.log('listening on *:3000');
});