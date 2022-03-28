const babel = require('@babel/core');
const path = require('path')

/**
 *
 * @param {*} inputSource -上一个loader的源码
 * @param {*} map - 源码的映射
 * @param {*} ast - 源码的抽象语法树
 * @returns
 */
function loader(inputSource, map, ast){
  console.log('---- babel-loader ----')
  const options = this.getOptions()

  const babelOptions = {
    // presets: ['@babel/preset-env'],
    ...options,
    sourceMaps: true,
    filename: path.basename(this.resourcePath)

  }
  /**
   * transRes有三个值，
   * transRes.code: 转换后的es5代码，
   * transRes.map: 转换后的代码到转换前的戴梦得映射，
   * transRes.ast: 是转换后的抽象语法树
   */
  let transRes = babel.transform(inputSource, babelOptions);

  /**
   * loader的返回值可以是一个值，也可以是多个值
   * (1)返回一个值,用return, return inputSource;
   * (2)返回多个值, 必须调用this.callback(err, 后面的参数是传递给下一个loader的参数)。
   *    this.callback 是loader-runner提供的一个方法，内置的。
   *    这个this默认是loader-runner内部的context，默认是空对象，但是在loader-runner执行的过程中会天机爱很多方法和属性，包括这个callback方法。
   */
  return this.callback(null, transRes.code, transRes.map, transRes.ast);
}

module.exports = loader;
