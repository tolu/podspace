
const path = require('path');
module.exports = {
  entry: {
    js: './dist/main.js'
  },
  output: {
      filename: 'es6_bundle.js',
      path: path.resolve(__dirname, 'dist')
  }
}
