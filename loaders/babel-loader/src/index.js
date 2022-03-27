const babel = require('@babel/core');
const path = require('path')

function loader(inputSource, map, ast){ // 上一个loader的源码。映射，和抽象语法树
  const options = {
    presets: ["@babel/preset-env"], // 转换靠预设。预设是插件的集合
    sourceMaps: true, // 如果这个参数不传，默认值为false，不会生成sourceMap
    filename: path.basename(this.resourcePath) // 生成的文件名

  }
  // 返回有三个值，code转换后的es5代码，map转换后的代码到转换前的戴梦得映射，ast是转换后的抽象语法树
  let transRes = babel.transform(inputSource, options);

  // loader的返回值可以是一个值，也可以是多个值
  // return inputSource; // 返回一个值,用return
  return this.callback(null, transRes.code, transRes.map, transRes.ast); // 返回多个值, 必须调用this.callback(err, 后面的参数是传递给下一个loader的参数)。这个callback是loader-runner提供的一个方法，内置的。这个this默认是loader-runner内部的context，默认是空对象，但是在loader-runner执行的过程中会天机爱很多方法和属性，包括这个callback方法。
}

module.exports = loader;
