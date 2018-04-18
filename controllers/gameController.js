var gameModel = require('../models/gameModel.js');
 
/**
 * gameController.js
 *
 * @description :: Server-side logic for managing games.
 */

module.exports = {

    create: function(req, res) {
        var newGame = new gameModel({
            p1 : req.body.p1,
            p2 : req.body.p2,
            rounds: req.body.rounds,
            winner: req.body.winner
        });
 
        newGame.save(function(err, game){
            if(err) {
                return res.status(500).json({
                    message: 'Error saving game',
                    error: err
                });
            }
            return res.json({
                message: 'Game saved'
            });
        });
    }
};
