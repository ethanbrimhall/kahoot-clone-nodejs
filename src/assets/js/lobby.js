var socket = io();

//When player connects to server
socket.on('connect', function() {
    
    var params = jQuery.deparam(window.location.search); //Gets data from url
    
    //Tell server that it is player connection
    socket.emit('player-join', params);
});

//Boot player back to join screen if game pin has no match
socket.on('noGameFound', function(){
    window.location.href = '../';
});
//If the host disconnects, then the player is booted to main screen
socket.on('hostDisconnect', function(){
    window.location.href = '../';
});

//When the host clicks start game, the player screen changes
socket.on('gameStartedPlayer', function(){
    window.location.href="/player/game/" + "?id=" + socket.id;
});


