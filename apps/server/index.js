import { join } from 'path';
import { readFile } from 'fs';
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'


import { api } from './api/api.js';

const app = express();

const appPath = '../storage-sync/out'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  methods: ['GET']
}))

app.use(express.static(appPath))

app.use('/api', api)

app.get('/', (req, res) => {
  readFile(join(appPath, 'index.html'), (err, file) => {
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