var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io= require('socket.io')(http);
var process=require('process')
//const kill = require('kill-port')
var bodyParser = require('body-parser');
app.use(bodyParser());

//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);
console.log(process.pid);

app.get('/' , function (req , res ) {

	res.sendFile( __dirname + '/index.html',function(data){
		console.log("html file sent to server");
	});

});
io.on('connection',function(socket){
	
	console.log('a new connection id: '+socket.id);
	
	/*/socket.on('chat message',function(data){
		//console.log(data);
		//io.emit('chat message', data);
		//});*/
		socket.on('code',function(code){
			console.log(code);
			io.emit('code',code);
			
		});
		
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


app.post('/compileit' , function (req , res ) {

	var code = req.body.code;
	var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;
    if((lang === "C") || (lang === "C++"))
    {
        if(inputRadio === "true")
        {
        	var envData = { OS : "windows" , cmd : "g++"};
        	compiler.compileCPPWithInput(envData , code ,input , function (data) {
        		if(data.error)
        		{
        			res.send(data.error);
        		}
        		else
        		{
        			res.send(data.output);
        		}
        	});
	   }
	   else
	   {

	   	var envData = { OS : "windows" , cmd : "g++"};
        	compiler.compileCPP(envData , code , function (data) {
        	if(data.error)
        	{console.log(data.output+'hi friends');
        		res.send(data.error);
        	}
        	else
        	{
				console.log(data.output);
        		res.send(data.output);
        	}

            });
	   }
    }
    if(lang === "Java")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows" };
            console.log(code);
            compiler.compileJavaWithInput( envData , code , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "windows" };
            console.log(code);
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
                res.send(data);
            });

        }

    }
    if( lang === "Python")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compilePythonWithInput(envData , code , input , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compilePython(envData , code , function(data){
                res.send(data);
            });
        }
    }
    if( lang === "CS")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compileCSWithInput(envData , code , input , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compileCS(envData , code , function(data){
                res.send(data);
            });
        }

    }
    if( lang === "VB")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compileVBWithInput(envData , code , input , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compileVB(envData , code , function(data){
                res.send(data);
            });
        }

    }

});

app.get('/fullStat' , function(req , res ){
    compiler.fullStat(function(data){
        res.send(data);
    });
});


app.listen(3000,'0.0.0.0',function(){
console.log('listening to port '+ 5000);
});
