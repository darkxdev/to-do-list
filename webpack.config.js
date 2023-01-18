/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    styles: './src/style.css'
  },
  devServer: {
    static: './dist',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
