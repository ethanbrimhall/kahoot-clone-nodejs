//Import dependencies
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {LiveGames} = require('./utils/liveGames');
const {Players} = require('./utils/players');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var games = new LiveGames();
var players = new Players();

app.use(express.static(publicPath));

//Starting server on port 3000
server.listen(3000, () => {
    console.log("Server started on port 3000");
});

//When a connection to server is made from client
io.on('connection', (socket) => {
    //When host connects
    socket.on('host-join', () =>{

        var gamePin = Math.floor(Math.random()*90000) + 10000;
        
        games.addGame(gamePin, socket.id);
        
        var game = games.getGame(socket.id);
        
        socket.join(game.pin);
        
        console.log('Game Created with pin:', game.pin);
        
        socket.emit('showGamePin', {
            pin: game.pin
        });
        
    });
    
    //When player connects
    socket.on('player-join', (params) => {
        
        var gameFound = false;
        
        for(var i = 0; i < games.games.length; i++){
            if(params.pin == games.games[i].pin){
                
                console.log('Player connected to game');
                
                var hostId = games.games[i].hostId;
                
                
                //add player to game
                players.addPlayer(hostId, socket.id, params.name);
                
                socket.join(params.pin);
                
                var playersInGame = players.getPlayers(hostId);
                
                io.to(params.pin).emit('updatePlayerLobby', playersInGame);
                gameFound = true;
            }
        }
        
        if(gameFound == false){
            socket.emit('noGameFound');
        }
        
        
    });
    
    
    socket.on('disconnect', () => {
        var game = games.getGame(socket.id);
        if(game){
            
            games.removeGame(socket.id);
            console.log('Game ended with pin:', game.pin);
            
            var playersToRemove = players.getPlayers(game.hostId);
            
            for(var i = 0; i < playersToRemove.length; i++){
                players.removePlayer(playersToRemove[i].playerId);
            }
            
            io.to(game.pin).emit('hostDisconnect');
        }else{
            console.log('Player disconnected');
            var player = players.getPlayer(socket.id);
            if(player){
                var hostId = player.hostId;
                var game = games.getGame(hostId);
                var pin = game.pin;
            
                players.removePlayer(socket.id);
                var playersInGame = players.getPlayers(hostId);
            
                io.to(pin).emit('updatePlayerLobby', playersInGame);
            }
            

        }
        
    });
    
    
});