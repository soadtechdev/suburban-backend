const { join } = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: join(__dirname, 'dist/app.js'),
  mode: 'production',
  output: {
    path: join(__dirname, 'build'),
    filename: 'goldi-ws.js'
  },
  target: 'node',
  externals: [nodeExternals()]
}