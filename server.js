// server.js
var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  

var plot = require('./plot') 
var port = 3000; 
var celsius = 17

httpServer.listen(port);  
console.log('Server available at http://localhost:' + port);  
var open;
var close;
 
//Arduino board connection
 
var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    open = new five.Pin(13);
    close = new five.Pin(12);
    var temperature = new five.Temperature({
      controller: "TMP36",
      pin: "A0"
    });   
    temperature.on("data", function() {
      celsius = this.celsius
    });
});

// Server
app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html')
})

app.get('/temperature', function(req, res){
  res.send({temperature : celsius})
})

app.get('/blinds/up', function(req, res, next){
  console.log('open')
  open.high()
  setTimeout( function(){
    open.low()
  }, 500 );
  res.send('OK')
  
})

app.get('/blinds/down', function(req, res, next){
  console.log('close')
  close.high()
  setTimeout( function(){
    close.low()
  }, 500 );
  res.send('OK')
  
})

setInterval(function(){
  plot(celsius)
}, 60*1000*5)
