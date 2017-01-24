const express = require('express');
const path = require('path');
const formidable = require('express-formidable');
const fs = require('fs');

const app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/assets/js/dropzone.js', function(req,res) {
  res.sendFile(path.join(__dirname, '/assets/js/dropzone.js'));
});

app.get('/assets/js/gifonly.js', function(req,res) {
  res.sendFile(path.join(__dirname, '/assets/js/gifonly.js'));
});

app.get('/assets/css/dropzone.css', function(req,res) {
  res.sendFile(path.join(__dirname, '/assets/css/dropzone.css'));
});

app.use(formidable());

app.post('/uploads', function(req, res) {
  var savePath = path.join(__dirname, '/uploads/', req.files.file.name)
  fs.rename(req.files.file.path, savePath, function (err) {
    res.redirect("back");
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000')
})
