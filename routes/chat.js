var express = require('express');
var router = express.Router();

var games = require('../games').games;


/* GET game page. */
router.get('/', function(req, res, next) {
  res.render('chat', {title: "Chat"});
});

module.exports = router;