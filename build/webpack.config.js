const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
