const express = require('express');
const path = require('path');
const formidable = require('express-formidable');
const fs = require('fs');

const app = express();

app.use(express.static('assets'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(formidable());

app.post('/uploads', function(req, res) {
  var savePath = path.join(__dirname, '/uploads/', req.files.file.name)
  fs.createReadStream(req.files.file.path).pipe(fs.createWriteStream(savePath))
  .on('error', e => res.status(500).send(e.message))
  .on('finish', e => res.status(201).send('ok'));
});

app.listen(3000, function() {
  console.log('Listening on port 3000')
});
