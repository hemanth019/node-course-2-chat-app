  const path = require('path');
  const http = require('http');
  const socketID = require('socket.io');

  const {generateMessage, generateLocationMessage} = require('./utils/message');
  const {isRealString} = require('./utils/validation');
  const {Users} = require('./utils/users');
  const publicPath = path.join(__dirname, '../public');

  // console.log(__dirname + '/../public');
  // console.log(publicPath);

  const express = require('express');
  var app = express();
  var server = http.createServer(app);
  var io = socketID(server);
  var users = new Users();
  app.use(express.static(publicPath));
  const port = process.env.PORT || 3000;

  // app.get('/', (req, res) => res.send('Hello World!'))

  // app.listen(3000, () => console.log('Example app listening on port 3000!'));

  // app.get('/', function(req,res) {
  //   res.sendFile('index.html');
  // });

  io.on('connection', (socket) => {
    console.log('New user connected');

    //socket.emit from Admin text welcome to the chat app

    //socket.broadcast.emit from Admin text New user joined


    socket.on('join', (params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and room name are required.');
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      //socket.leave('The office fans');

      //io.emit -> io.to('The office fans').emit
      //socket.broadcast.emit -> socket.broadcast.to('The office fans').emit
      //socket.emit

      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
      callback();
    });

    socket.on('createMessage', (message, callback) => {
      var user = users.getUser(socket.id);

      if(user && isRealString(message.text)) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      }

      callback();
    });

    socket.on('createLocationMessage', (coords) => {
      var user = users.getUser(socket.id);

      if(user) {
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      }

    });


    socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);

      if(user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
      }
    });
  });

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
  });
