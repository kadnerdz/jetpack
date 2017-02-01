'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootPath = path.resolve('.')
const assetPath = path.join(rootPath, 'assets')
const publicRoot = 'public'
const publicPath = path.join(publicRoot)
const srcPath = path.join(assetPath, 'js')
const outputPath = path.join(__dirname, publicPath, 'js')

module.exports = {
  entry: path.resolve(srcPath, 'index.js'),
  output: {
    filename: 'index.js',
    path: outputPath,
    publicPath: 'js',
    chunkFilename: '[name].[hash].[chunkhash].js'
  },

  resolve: {
    extensions: ['', '.js', '.css', '.scss']
  },

  module: {
    loaders: [{ test: /\.js$/i,
		exclude: /node_modules/,
		loader: 'babel-loader',
		query: {
		  presets: ['es2015', 'react'],
		  plugins: ['transform-class-properties']
		}
	      },
	      { test: /\.(sc|c)ss$/i,
		loaders: ExtractTextPlugin.extract('css!sass')
	      },
	      { test: /\.(jpe?g|png|gif|svg)$/i,
		loaders: [	    
		  'file?hash=sha512&digest=hex&name=[hash].[ext]', // pack the file	    
		  'image-webpack?{optimizationLevel:5}' // compress the file
		]
	      }]
  },

  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'assets/index.ejs',
      title: 'JETPACK',
      inject: 'body',
      filename: '../index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
	NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
}
