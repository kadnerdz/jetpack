const express = require('express');
const path = require('path');
const formidable = require('express-formidable');
const fs = require('fs');

const app = express();

/* Basic roues */
app.use(formidable());

app.post('/api/v1/uploads', function(req, res) {
  var savePath = path.join(__dirname, '/uploads/', req.files.file.name)
  fs.createReadStream(req.files.file.path).pipe(fs.createWriteStream(savePath))
    .on('error', e => res.status(500).send(e.message))
    .on('finish', e => res.status(201).send('ok'));
});

/* Handling of dev server */
// borrowed heavily (or entirely...) from:
// https://github.com/christianalfoni/webpack-express-boilerplate/blob/master/server.js

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT

if (isDeveloping) {
  console.log("running development server")
  
  // get our webpack ish
  const webpack = require('webpack')
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
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

  
  app.get('/public/:asset/:filename', (req, res) => {
    console.log(req.path, req.route)
    //const file_name = path.join(config.output.path, '..', 
    // const file = middleware.fileSystem.readFileSync(
      
    // )
    // res.send(file)
    // res.end()
  })
  
  app.get('*', (req, res) => {
    const index_path = path.join(config.output.path, '..', 'index.html')
    const index_file = middleware.fileSystem.readFileSync(
      index_path
    )
    res.set('Content-Type', 'text/html')
    res.send(index_file)
    res.end()
  })
  
}
else {
  console.log("running prod server")  
  app.use(express.static(path.join(__dirname, 'public')))
}

/* listen */
app.listen(3000, function() {
  console.log('Listening on port 3000')
});
