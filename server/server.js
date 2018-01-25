  const path = require('path');
  const http = require('http');
  const socketID = require('socket.io');

  const publicPath = path.join(__dirname, '../public');

  // console.log(__dirname + '/../public');
  // console.log(publicPath);

  const express = require('express');
  var app = express();
  var server = http.createServer(app);
  var io = socketID(server);
  app.use(express.static(publicPath));
  const port = process.env.PORT || 3000;

  // app.get('/', (req, res) => res.send('Hello World!'))

  // app.listen(3000, () => console.log('Example app listening on port 3000!'));

  // app.get('/', function(req,res) {
  //   res.sendFile('index.html');
  // });

  io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
      console.log('User was disconnected');
    });
  });

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
  });
