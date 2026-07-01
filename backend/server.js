require('dotenv').config();
const dbcon = require('./model/DbConnection');
dbcon.connect();

const ExpApp = require('./app');

let port = process.env.PORT || 4000;

ExpApp.app.listen(port, function () {
  console.log(`Server running in ${port}`);
});
