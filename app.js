const deckCont = require('./controller/DeckController.js');

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/items', deckCont.getAll);
app.get('/items/:dname', deckCont.get);
app.post('/items', deckCont.postCreateUpdate);
app.get('/deleteitem/:dname', deckCont.getDelete);

exports.app = app;
