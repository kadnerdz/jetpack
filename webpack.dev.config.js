'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const rootPath = path.resolve('.')

const assetPath = path.join(rootPath, 'assets')

const srcPath = path.join(
    assetPath,
    'js'
)

const outputPath = path.join(
    rootPath,
    'public', 'js'
)

const publicPath = path.join(rootPath, 'public')

module.exports = {
    entry: path.resolve(srcPath, 'index.js'),
    output: {
	filename: 'index.js',
	path: outputPath,
	publicPath: publicPath,
	chunkFilename: '[hash]-index.js',	
    },

    resolve: {
	extensions: ['', '.js', '.css', '.scss']
    },

    loaders: [{
	test: /\.js$/i,
	exclude: /node_modules/,
	loader: 'babel-loader',
	query: {
	    presets: ['es2015', 'react'],
	    plugins: ['transform-class-properties']
	}
    },
    {
	test: /\.(sc|c)ss$/i,
	loaders: ExtractTextPlugin.extract('css!sass')
    },
    {
	test: /\.(jpe?g|png|gif|svg)$/i,
	loaders: [
	    // pack the file
	    'file?hash=sha512&digest=hex&name=[hash].[ext]',
	    // compress the file
	    'image-webpack?{optimizationLevel:5}'
	]
    }],

    plugins: [
	new ExtractTextPlugin('[name].[chunkhash].css'),
	new webpack.NoErrorsPlugin()
    ],

    devtool: ['source-map']    
}
