// server.js
var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
 
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
      console.log(this.celsius + "°C");
      celsius = this.celsius
    });
});

app.get('/open', function(req, res, next){
  console.log('open')
  open.high()
  setTimeout( function(){
    open.low()
  }, 500 );
  res.send('OK')
  
})

app.get('/close', function(req, res, next){
  console.log('close')
  close.high()
  setTimeout( function(){
    close.low()
  }, 500 );
  res.send('OK')
  
})