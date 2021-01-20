const express = require('express');

const app = express();
const PORT = 4004;

app.use(express.static(__dirname + '/'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 
