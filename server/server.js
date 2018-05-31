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
        
        games.addGame(gamePin, socket.id, []);
        
        var game = games.getGame(socket.id);
        
        socket.join(game.pin);
        
        console.log('Game Created with pin:', game.pin);
        
        socket.emit('showGamePin', {
            pin: game.pin
        });
        
    });
    
    //When player connects
    socket.on('player-join', (params) => {
        console.log('Player connected');
        for(var i = 0; i < games.games.length; i++){
            if(params.pin == games.games[i].pin){
                
                
                var hostId = games.games[i].hostId;
                
                //add player to game
                games.addPlayer(hostId, socket.id);
                
                //add player to server
                players.addPlayer(socket.id, params.name);
                
                socket.join(params.pin);
                
                var player = players.getPlayer(socket.id);
                
                io.to(params.pin).emit('addPlayerToLobby', player.name);
                
            }
        }
        
        
    });
    
    
    socket.on('disconnect', () => {
        var game = games.getGame(socket.id);
        if(game){
            games.removeGame(socket.id);
            console.log('Game ended with pin:', game.pin);
        }else{
            console.log('Player disconnected');
            players.removePlayer(socket.id);
        }
        
    });
    
    
});