// loaders/babel-loader.js
const babel = require('@babel/core');
const loaderUtils = require('loader-utils');
const path = require('path');
/** loader只是一个函数 */
module.exports = function loader(inputSource) {
  // 获取配置参数options的数据
  const options = loaderUtils.getOptions(this);
  // 默认配置
  const baseOptions = {
    ...options, // 合并配置
    // presets: ['@babel/preset-env'],
    sourceMaps: true, // 告诉babel我要生成sourceMao
    filename: path.basename(this.resourcePath)
  };
  // 代码 map文件  ast语法树
  const { code, map, ast } = babel.transform(inputSource, baseOptions);
  // 我们可以把source-map ast 都传递给webpack，这样webpack就不需要自己把源代码转语法树，也不需要自己生成source-map
  return this.callback(null, code, map, ast);
};
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // webpack loader的选项配置
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  }
  // ...
};
