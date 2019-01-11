var express = require('express');
var router = express.Router();

var games = require('../games').games;

/* GET home page */
router.get('/', function(req, res, next) {
  var pageObj = {};
  pageObj['title'] = 'Game Server';
  pageObj.games = require('../games').games;
  res.render('index', pageObj);
});

module.exports = router;
