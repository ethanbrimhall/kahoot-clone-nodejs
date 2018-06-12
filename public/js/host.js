var socket = io();

//When host connects to server
socket.on('connect', function() {
    
    document.getElementById('numPlayers').innerHTML = "Players: 0";
    document.getElementById('players').value = "";
    
    //Tell server that it is host connection
    socket.emit('host-join');
});

socket.on('showGamePin', function(data){
   document.getElementById('gamePinText').innerHTML = data.pin;
});

//Adds player's name to screen and updates player count
socket.on('updatePlayerLobby', function(data){
    
    var numberOfPlayers = 0;
    document.getElementById('players').value = "";
    
    for(var i = 0; i < data.length; i++){
        numberOfPlayers += 1;
        document.getElementById('players').value += data[i].name + "\n";
        document.getElementById('numPlayers').innerHTML = numPlayers;
    }
    
    document.getElementById('numPlayers').innerHTML = "Players: " + numberOfPlayers;
});

//Tell server to start game if button is clicked
function startGame(){
    socket.emit('startGame');
}
function endGame(){
    window.location.href = "/";
}

//When server starts the game
socket.on('gameStarted', function(id){
    console.log('Game Started!');
    window.location.href="/host/game/" + "?id=" + id;
});

