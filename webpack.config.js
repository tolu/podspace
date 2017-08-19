//@ts-nocheck
const path = require('path');
module.exports = {
  entry: "./js/main.js",
  output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
      rules: [{
        test: /\.[jt]s$/,
        use: [{
          loader: "awesome-typescript-loader",
          options: {
            transpileOnly: true
          }
        }] // ts-loader | awesome-typescript-loader
      }]
  }
}
