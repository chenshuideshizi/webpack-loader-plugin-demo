const path = require('path')

const webpackConfig = {
  mode: 'development',
  entry: {
    babel: './src/entry-babel-loader.js',
    file: './src/entry-file-loader.js',
    removeConsole: './src/entry-remove-console.js', // 移除 remove
    babelLodash: './src/entry-lodash' // lodash 按需引入
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
            presets: ['@babel/preset-env']
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
  }
}

if (process.env.run_env === 'dev_loader') {
  webpackConfig.resolveLoader = {
    modules: [path.resolve(__dirname, '../loaders'), 'node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['main'],
  }
}

module.exports = webpackConfig
