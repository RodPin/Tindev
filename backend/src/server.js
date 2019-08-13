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

const connectedUsers = {};

io.on('connection', socket => {
  const {user} = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://Rodrigo:senha123@omni8-ovtmr.mongodb.net/omni8?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

//node middleware to send connectedusers to controllers
httpServer.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);

server.listen(3333);
