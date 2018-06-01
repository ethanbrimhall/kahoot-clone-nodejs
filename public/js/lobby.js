var socket = io();

//When player connects to server
socket.on('connect', function() {
    
    var params = jQuery.deparam(window.location.search);
    
    //Tell server that it is player connection
    socket.emit('player-join', params);
});

//Boot player back to join screen if game pin has no match
socket.on('noGameFound', function(){
    window.location.href = '/';
});

socket.on('hostDisconnect', function(){
    window.location.href = '/';
});


