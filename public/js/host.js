var socket = io();

//When host connects to server
socket.on('connect', function() {
    //Tell server that it is host connection
    socket.emit('host-join');
});

socket.on('showGamePin', function(data){
   document.getElementById('gamePinText').innerHTML = data.pin;
});

//Adds player's name to screen and updates player count
socket.on('addPlayerToLobby', function(player){
    document.getElementById('players').value += player + "\n";
    var numPlayers = document.getElementById('numPlayers').innerHTML;
    numPlayers = numPlayers.substring(9);
    numPlayers = parseInt(numPlayers);
    numPlayers += 1;
    document.getElementById('numPlayers').innerHTML = "Players: " + numPlayers;
});

//Removes player's name from screen and updates player count
socket.on('removePlayerFromLobby', function(data){
    
});

