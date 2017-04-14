const PORT = 3000;


var fs = require('fs');
var http = require('http');
var server = new http.Server(handleRequest);
var io = require('socket.io')(server);

var connected = 0

io.on('connection', function(socket){
  var name = 'User ' +connected;
  var color = 'gray';
  connected++;

  //send to everyone
socket.on('message',function(text){
    io.emit('message', {
      user: name,
      text: text,
      color: color
    });
});

socket.on('color', function(newColor){
    color = newColor;
});

  //send to one person
  socket.emit('welcome', "Welcome user " + name + "!");
});




function handleRequest(req, res) {
  switch(req.url) {
    case '/':
    case '/index.html':
      fs.readFile('public/index.html', function(err, data){
        if(err){
        }
          res.setHeader("Content-Type", "text/html");
          res.end(data);

      });
      break;
    case '/simple-chat.css':
      fs.readFile('public/simple-chat', function(err, data){
        if(err){
        }
          res.setHeader("Content-Type", "text/css");
          res.end(data);

      });
      break;
    case '/simple-chat.js':
      fs.readFile('public/simple-chat.js', function(err, data){
        if(err){
        }
          res.setHeader("Content-Type", "text/js");
          res.end(data);


      });
      break;
  }
}

server.listen(PORT, function(){
  console.log("Listening on port: " + PORT);
});
