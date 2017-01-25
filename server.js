const express = require('express');
const path = require('path');
const formidable = require('express-formidable');
const fs = require('fs');

const app = express();

// borrowed heavily from:
// https://github.com/christianalfoni/webpack-express-boilerplate/blob/master/server.js
const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  // get our webpack ish
  const webpack = require('webpack')
  const webpackMiddleware = require('webpack-dev-middleware')
  const webackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.dev.config.js')

  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  
  app.get('*', (req, res) => {
    middleware.fileSystem.createReadStream('./index.html').pipe(res);
  })
}
else {
  
}
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
