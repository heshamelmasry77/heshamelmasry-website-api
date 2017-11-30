var express = require('express'),
    app = express(),
    port = process.env.PORT || 3008,
    mongoose = require('mongoose'),
    Project = require('./api/models/projectListModel'), //created model loading here
    bodyParser = require('body-parser'),
    cors = require('cors');

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
      useMongoClient: true
    },
    function(err) {
      if (!err) {
        console.log('we are connected to mongodb server');
      } else {
        console.log('can\'t connect to mongodb server' + err);
      }
    });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

var whitelist = [
  'https://afternoon-falls-87430.herokuapp.com',
  'http://localhost:9000',
  'http://localhost:3000',
  'https://www.heshamelmasry.website',
  'http://www.heshamelmasry.website'];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// app.use(function(req, res, next) {
//   var allowedOrigins = ['https://afternoon-falls-87430.herokuapp.com','http://localhost:9000','http://localhost:3000','https://www.heshamelmasry.website','http://www.heshamelmasry.website'];
//   var origin = req.headers.origin;
//   if(allowedOrigins.indexOf(origin) > -1){
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, application/json');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });
var routes = require('./api/routes/projectListRoutes'); //importing route
routes(app, cors(corsOptions)); //register the route

app.listen(port);

console.log('heshamelmasry website RESTful API server started on: ' + port);

// Adding a middleware
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});