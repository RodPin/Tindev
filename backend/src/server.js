const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

//creating a server with express

const server = express();

mongoose.connect('mongodb+srv://Rodrigo:senha123@omni8-ovtmr.mongodb.net/omni8?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

server.use(express.json());
server.use(routes);

server.listen(3333);
