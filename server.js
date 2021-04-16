const express = require('express');


const app = express();

const PORT = 4000;

app.use(express.static(__dirname + '/build/'));

app.all('*', function(req, res){
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 
