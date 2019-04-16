const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// img url
app.use('/asserts', express.static('asserts'));

// connect to mongodb
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
mongoose.connect('mongodb://admin:hung123@ds012889.mlab.com:12889/vahdb', {useNewUrlParser: true});

mongoose.Promise = global.Promise;

// some middlewares
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
});

// init routes
app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/categories', require('./routes/categories'));

app.listen(process.env.port || 8000, function(){
  console.log('server started');
});