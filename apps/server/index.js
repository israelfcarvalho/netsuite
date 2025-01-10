const path = require('path');
const fs = require('fs')
const express = require('express');

const app = express();

const appPath = '../storage-sync/out'

app.use(express.static(appPath))

app.get('/', (req, res) => {
  fs.readFile(path.join(appPath, 'index.html'), (err, file) => {
    if (err) {
      res.status(500);
      res.send('Compilando...');
    } else {
      res.send(file.toString());
    }
  });
});

app.listen(5000, function(){
    console.log('Developing server listen on port 5000!\n');
});