const express = require('express');
const path = require('path');

const app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/assets/js/dropzone.js', function(req,res) {
  res.sendFile(path.join(__dirname, '/assets/js/dropzone.js'));
});

app.get('/assets/css/dropzone.css', function(req,res) {
  res.sendFile(path.join(__dirname, '/assets/css/dropzone.css'));
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
