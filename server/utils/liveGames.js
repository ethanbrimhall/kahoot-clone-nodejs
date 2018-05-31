class LiveGames {
    constructor () {
        this.games = [];
    }
    addGame(pin, hostId, players){
        var game = {pin, hostId, players};
        this.games.push(game);
        return game;
    }
    removeGame(hostId){
        var game = this.getGame(hostId);
        
        if(game){
            this.games = this.games.filter((game) => game.hostId !== hostId);
        }
        return game;
    }
    removePlayer(hostId, playerId){
        
    }
    getGame(hostId){
        return this.games.filter((game) => game.hostId === hostId)[0]
    }
    addPlayer(hostId, player){
        var game = this.getGame(hostId);
        game.players.push(player);
        return game;
    }
}

module.exports = {LiveGames};