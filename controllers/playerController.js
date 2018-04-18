var playerModel = require('../models/playerModel.js');

/**
 * playerController.js
 *
 * @description :: Server-side logic for managing players.
 */

module.exports = {

  list: function(req, res) {
    playerModel.find(function(err, players) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting players.'
        });
      }
      return res.json(players);
    });
  },

  createOrUpdate: function(req, res) {
    playerModel.findOne({ name: req.body.name }, function(err, player) {
      if (err) {
        return res.status(500).json({
          message: 'Error checking if player already exists',
          error: err
        });
      }

      if (!player) {
        var newPlayer = new playerModel({
          name: req.body.name,
          wins: req.body.winner ? 1 : 0
        });

        newPlayer.save(function(err, player) {
          if (err) {
            return res.status(500).json({
              message: 'Error saving player',
              error: err
            });
          }
          return res.json({
            message: 'Player saved'
          });
        });
      } else {
        player.wins = req.body.winner ? player.wins + 1 : player.wins;
        player.save(function(err, player) {
          if (err) {
            return res.status(500).json({
              message: 'Error updating player wins.'
            });
          }
          if (!player) {
            return res.status(404).json({
              message: 'No such player'
            });
          }
          return res.json({
            message: 'Player updated'
          });
        });
      }
    });
  }
};
