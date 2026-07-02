require('dotenv').config();
const mongoose = require('mongoose');

exports.connect = async function (where) {
  let uri = process.env.DB_URI;
  if (where === 'test') uri = process.env.TESTDB_URI;
  if (process.env.CI) uri = 'mongodb://adm:secret@localhost:27017'; //CI test

  try {
    console.log('Attempting MongoDB connection...');
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};

exports.disconnect = async function () {
  await mongoose.connection.close();
};
