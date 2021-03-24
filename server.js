const express = require('express');


const app = express();
<<<<<<< HEAD
const PORT = 4011;
=======
const PORT = 4005;
>>>>>>> deploy

app.use(express.static(__dirname + '/'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 
