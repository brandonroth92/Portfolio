var express = require('express');
var router = express.Router();

var Team = require('../models/team');

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging (to be completed)
  next();
});

router.get('/', function (req, res) {
  res.json({ message: 'welcome to the api!'});
});

// routes that end in /teams =============================
router.route('/teams')
.post(function (req, res) {
  var team = new Team(req.body); // create new instance of team model

  // save new team instance and return it in response
  team.save(function (err, team) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Team created!', team }); 
    }
  });
})
// find and return all teams from database
.get(function (req, res) {
  Team.find(function (err, teams) {
    if (err) {
      res.send(err);
    }
    res.json(teams);
  });
});

// routes that end in /teams/:team_id ======================
router.route('/teams/:team_id')
// find and return specific team by id
.get(function (req, res) {
  Team.findById(req.params.team_id, function (err, team) {
    if (err) {
      res.send(err);
    }
    res.json(team);
  });
})
// update specific team by id
.put(function (req, res) {
  Team.findById(req.params.team_id, function (err, team) {
    if (err) {
      res.send(err);
    }
    // update team info
    Object.assign(team, req.body).save(function (err, team) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Team updated!', team});
    });
  });
})
// delete specific team by id
.delete(function (req, res) {
  Team.remove({
    _id: req.params.team_id
  }, function (err, result) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Successfully deleted', result});
  });
});

module.exports = router;
  
