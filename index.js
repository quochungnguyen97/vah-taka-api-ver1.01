const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');


// img url
app.use('/', express.static('asserts'));

// connect to mongodb
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
mongoose.connect('mongodb://admin:hung123@ds012889.mlab.com:12889/vahdb', {useNewUrlParser: true});

mongoose.Promise = global.Promise;

// some middlewares
app.use(cors());

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