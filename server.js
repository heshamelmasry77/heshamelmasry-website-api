var express = require('express'),
  app = express(),
  port = process.env.PORT || 3008,
  mongoose = require('mongoose'),
  Project = require('./api/models/projectListModel'), //created model loading here
  bodyParser = require('body-parser');
//
// // mongoose instance connection url connection
mongoose.Promise = global.Promise;


if (process.env.hasOwnProperty('MONGODB_URI')) {
  var db_string = process.env.MONGODB_URI;
} else {
  db_string = 'mongodb://localhost:27017/heshamelmasryWebsite';
  mongoose.set('debug', true);
}

mongoose.connect(db_string, {
    useMongoClient: true},
  function(err) {
    if (!err) {
      console.log('we are connected to mongodb server');
    } else {
      console.log('can\'t connect to mongodb server' + err);
    }
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/projectListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('heshamelmasry website RESTful API server started on: ' + port);

// Adding a middleware
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});