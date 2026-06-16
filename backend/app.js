const deckCont = require('./controller/DeckController.js');
const cardCont = require('./controller/CardsController.js');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/items', deckCont.getAll);
app.get('/items/:dname', deckCont.get);
app.post('/items', deckCont.postCreateUpdate);
app.get('/deleteitem/:_id', deckCont.getDelete);

app.get('/cards', cardCont.getAll);
app.get('/cards/:cname', cardCont.get);
app.post('/cards', cardCont.postCreateUpdate);
app.get('/cards/:_id', cardCont.getDelete);

exports.app = app;
