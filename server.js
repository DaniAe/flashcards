const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
app.use(morgan('dev'));

let hostname = 'localhost';
let port = 4000;
app.use(express.static('public'));

app.get('/items', function (req, res, next) {
  fs.readFile('./public/data.json', function (err, data) {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      const items = JSON.parse(data);
      res.json(items);
    }
    res.end();
  });
});

app.listen(port, hostname, function () {
  console.log(`Server running in ${hostname}:${port}`);
});