const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
//cors => make acessible to other frameworks
const cors = require('cors');
//creating a server with express
const httpServer = express();
//mixing socket and http server
const server = require('http').Server(httpServer);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('New connection', socket.id);
  socket.on('hello', message => {
    console.log(message);
  });
});

mongoose.connect('mongodb+srv://Rodrigo:senha123@omni8-ovtmr.mongodb.net/omni8?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);

server.listen(3333);
