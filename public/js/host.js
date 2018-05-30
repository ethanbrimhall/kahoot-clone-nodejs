var socket = io();

//When host connects to server
socket.on('connect', function() {
    //Tell server that it is host connection
    socket.emit('host-join');
});

socket.on('hey', function(data){
   console.log("Hey whats up from ", data.pin);
});
