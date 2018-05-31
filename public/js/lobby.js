var socket = io();

//When player connects to server
socket.on('connect', function() {
    
    var params = jQuery.deparam(window.location.search);
    
    //Tell server that it is player connection
    socket.emit('player-join', params);
});


