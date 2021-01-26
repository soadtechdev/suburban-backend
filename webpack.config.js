const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.join(__dirname, 'src/app.ts'),
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'suburban-ws.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      config: path.resolve(__dirname, 'src/config/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
      interfaces: path.resolve(__dirname, 'src/interfaces/'),
      loaders: path.resolve(__dirname, 'src/loaders/'),
      models: path.resolve(__dirname, 'src/models/'),
      services: path.resolve(__dirname, 'src/services/')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }
    ]
  }
}
