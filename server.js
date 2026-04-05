const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
app.use(morgan('dev'));

let hostname = 'localhost';
let port = 4000;
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/items', function (req, res) {
  fs.readFile('./public/data.json', function (err, data) {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      const items = JSON.parse(data);
      res.json(items);
    }
  });
});

// CREATE or UPDATE a deck
app.post('/items', function (req, res) {
  let name = req.body.deck_name;
  let desc = req.body.deck_desc;
  let imgUrl = req.body.img_url;
  const originalName = req.body.original_name;

  if (originalName !== '') {
    fs.readFile('./public/data.json', function (err, data) {
      const items = JSON.parse(data);
      const index = items.findIndex((deck) => deck.name === originalName);

      if (index >= 0) {
        items[index].name = name;
        items[index].description = desc;
        items[index].imgUrl = imgUrl;

        fs.writeFile(
          './public/data.json',
          JSON.stringify(items),
          function (err) {
            res.redirect('decks.html');
          }
        );
      }
    });
  } else {
    const newDeck = {
      name: name,
      description: desc,
      imgUrl: imgUrl,
      cards: 0,
    };

    fs.readFile('./public/data.json', function (err, data) {
      const items = JSON.parse(data);
      items.push(newDeck);

      fs.writeFile('./public/data.json', JSON.stringify(items), function (err) {
        res.redirect('decks.html');
      });
    });
  }
});

// DELETE a deck by name
app.get('/deleteitem/:dname', function (req, res) {
  let dname = req.params.dname;

  fs.readFile('./public/data.json', function (err, data) {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      const items = JSON.parse(data);
      let pos = -1;
      for (let i = 0; i < items.length; i++) {
        if (items[i].name === dname) {
          pos = i;
        }
      }
      if (pos >= 0 && pos < items.length) {
        items.splice(pos, 1);

        fs.writeFile(
          './public/data.json',
          JSON.stringify(items),
          function (err) {
            res.redirect('../decks.html');
          }
        );
      }
    }
  });
});

app.listen(port, hostname, function () {
  console.log(`Server running in ${hostname}:${port}`);
});
