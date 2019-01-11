var MongoClient = require('mongodb').MongoClient;
const DB_URL = 'mongodb://localhost:27017';
const db_name = 'games';
const user_collection = 'users';


// user schema:
/*
{
    _id: 'mongo assigned user id',
    name: user_name,
    socket: 'a socket object representing a users session'
}
*/
// a user is deleted from the database everytime a user disconnects
// a user is added to the database everytime they connect

var MongoClient = require('mongodb').MongoClient;

const mongo_client = {};

mongo_client.add_user(user_name, socket, callback){
    console.log(user_name);
    MongoClient.connect(DB_URL, function(err, client) {
        if (err) callback(err, null);
        var db = client.db(db_name);
        var users = db.collection(user_collection);
        var ins_obj = {name: user_name, st: session_token};
        users.findOne(ins_obj, function(err, data){
            if(data){
                err = "User Name Taken";
                data = null
                callback (err, data);
            }else{
                users.insertOne(ins_obj, function(err, res) {
                    if (err) callback(err, null);
                    else{
                        client.close();
                        callback (err, res.insertedId);
                    }
                });
            }
        });
        
    });
}

mongo_client.get_user(user_id, callback){
    MongoClient.connect(DB_URL, function(err, client) {
        if (err) callback(err, null);
        var db = client.db(db_name);
        var users = db.collection(user_collection);
        users.findOne({_id: user_id}, function(err, data){
            client.close();
            callback (err, data);
        });
    });
}

function remove_user(user_id, callback){
    MongoClient.connect(DB_URL, function(err, client) {
        if (err) callback(err, null);
        var db = client.db(db_name);
        var users = db.collection(user_collection);
        users.deleteOne({_id: user_id}, function(err, data){
            client.close();
            callback (err, data);
        });
    });
}


// add_user('ryan', (err, uid)=>{
//     console.log(uid);
//     get_user(uid, (err, userObj)=>{
//         console.log(userObj);
//     });
// });

// add_user('ryan', (err, uid)=>{
//     if(uid){
//         console.log(uid);
//         get_user(uid, (err, userObj)=>{
//             console.log(userObj);
//             remove_user(uid, ()=>{});
//         });
//     }else{
//         console.log(err);
//     }
    
// });

module.exports = mongo_client;
