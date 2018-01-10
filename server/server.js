  const path = require('path');

  const publicPath = path.join(__dirname, '../public');

  // console.log(__dirname + '/../public');
  // console.log(publicPath);

  const express = require('express');
  var app = express();
  app.use(express.static(publicPath));
  const port = process.env.PORT || 3000;

  // app.get('/', (req, res) => res.send('Hello World!'))

  // app.listen(3000, () => console.log('Example app listening on port 3000!'));

  // app.get('/', function(req,res) {
  //   res.sendFile('index.html');
  // });

  app.listen(port, () => {
    console.log(`server is up on port ${port}`);
  });
