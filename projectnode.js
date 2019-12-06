const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get('/', (req,res) => {
res.send('Welcome to REST API with Node.js Tuorial!!!');
});


/*one get Services by Manpreet Pal Kaur*/
app.get('/api/tracker', (req,res) => {
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("customerdb");
	dbo.collection("tracker").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
	});
	});
});


/*one PUT service by Manpreet Pal Kaur */

app.put('/api/tracker/update', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("customerdb");
  var myquery = { "exp_del_date": "2013-10-06" };
  var newvalues = { $set: {"exp_del_date": "2019-12-12" } };
  dbo.collection("tracker").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send("1 document updated");
    db.close();
  });
});

});
/*One Post service by Manpreet Pal Kaur */
app.post('/api/tracker/insert', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("customerdb");
  var myobj = { "tracker_id": "49","ord_id": "12", "shipping_details":"home", "exp_del_date":"2019-08-18"};
  dbo.collection("tracker").insertOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document inserted");
    console.log("1 document inserted");
    db.close();
  });
});
});

/*One Post service by Manpreet Pal Kaur */
app.delete('/api/tracker/delete', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("customerdb");
  var myobj = { "tracker_id": "49"};
  dbo.collection("tracker").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});


const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));
