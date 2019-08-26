const path = require('path');

module.exports = {
  mode: 'development',

  stats: {
    warnings: true,
  },

  entry: {
    foo: './src/foo.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    strictExportPresence: true,
  }
}
