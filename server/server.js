//Import dependencies
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {LiveGames} = require('./utils/liveGames');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var games = new LiveGames();

app.use(express.static(publicPath));

//Starting server on port 3000
server.listen(3000, () => {
    console.log("Server started on port 3000");
});

//When a connection to server is made from client
io.on('connection', (socket) => {
    //When host connects
    socket.on('host-join', () =>{
        console.log('connected to host');
        
        var gamePin = Math.floor(Math.random()*90000) + 10000;
        
        games.removeGame(socket.id);
        games.addGame(gamePin, socket.id);
        
        var game = games.getGame(socket.id);
        
        socket.join(game.pin);
        
        console.log('Game Created with pin:', game.pin);
        
    });
    
    //When player connects
    socket.on('player-join', () => {
        console.log('connected to player');
    });
    
    
    
});