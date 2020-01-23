const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'cashback';
const client = new MongoClient(url, {useNewUrlParser: true});

exports.insertInfos = function insertInfos(infos){
   client
    .connect()
    .then(function(){
        const db = client.db(dbName);
        const collection = db.collection('infos');
        collection
         .insertMany(infos)
         .then(function(){
           client.close();
         });
    }); 
}

exports.getInfos = async function getInfos(){
   return new Promise(function(resolve, reject){
        client
        .connect()
        .then(function(){
            const db = client.db(dbName);
            const collection = db.collection('infos');
            collection
            .find({})
            .toArray(function(err, result){
                client.close();
                resolve(result);
            });
        })
    });
}