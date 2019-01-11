var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  // mongo database for managing users
  
  const MongoClient = require('mongodb').MongoClient;
  const DB_URL = 'mongodb://localhost:27017';
  const db_name = 'users';

  let pageObj =  {users: []};
  MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, client){
    if(err) console.log(`FAILED TO CONNECTED TO: ${DB_URL}`)
    else{
      console.log(`CONNECTED TO: ${DB_URL}`);
      const col = client.db(db_name).collection(db_name);
      col.find({}).toArray(function(err, items){
        //console.log(items)
        for(let item of items) {
          pageObj.users.push(item);
        }
        client.close();
        res.render('users', pageObj);
      });
    }
  });
  

});

module.exports = router;
