var MongoClient = require('mongodb').MongoClient
                  , assert = require('assert');
// Connection URL
var url = 'mongodb://abc:abc@ds129166.mlab.com:29166/motorvehiclecollison';

// Use connect method to connect to the server
var dbHelper  = function (db) {
  if (db) this.db = db;
};
var instance = new dbHelper();

dbHelper.prototype.connect = function () {
  MongoClient.connect(url, function(err, db) {
    if (err) console.log(err);
    console.log("Connected successfully to server");
    if (db) instance.db = db.db('motorvehiclecollison');
    console.log(instance);
    dbHelper.prototype.createCollection(instance.db, null);
  });
};

dbHelper.prototype.createCollection = function (db, callback) {
// db.createCollection('streetData', {capped: false, autoIndexId: true}, function (err, callback) {
//   if (err) console.log(err);
//   if (typeof callback === 'function') callback();
//   instance.insertData(true);
// });
};

dbHelper.prototype.insertData = function (data, trigger) {
    console.log('Total number of data entries to enter is -->', data.length);
    for (var i = 0; i < data.length - 1; i++)
    instance.db.collection('streetData').insertOne( data[i] );
};

dbHelper.prototype.find = function (query, res) {
  instance.db.collection('streetData').find({"OnStreet": query.toString()}).limit(5).toArray(function (err, docs) {
    if (err) console.log(err);
    console.log(docs);
    res.end(JSON.stringify(docs));
});
};

module.exports = instance;
