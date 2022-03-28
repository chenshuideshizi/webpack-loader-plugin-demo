const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    babel: './src/entry-babel.js',
    file: './src/entry-file.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules']
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../loaders'), 'node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main'],
  }
}
