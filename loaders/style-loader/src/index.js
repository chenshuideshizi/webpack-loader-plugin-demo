const { Console } = require("console");
const loaderUtils = require('loader-utils');

function loader(){

}

/*
  参数：
  remainingRequest 剩下的请求
  previousRequest 前面的请求
  data 数据

*/

loader.pitch = (remainingRequest, previousRequest, data) => {
  console.log('remainingRequest', remainingRequest);
  console.log('previousRequest', previousRequest)
  console.log('data', data, loaderUtils.stringifyRequest(this, '!!' + remainingRequest));
  let script = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)}); // 依赖的值为!!C:/Users/yuhua7/Desktop/webpack/4.webpack-loader/loaders/less-loader.js!C:/Users/yuhua7/Desktop/webpack/4.webpack-loader/src/style.less
    document.head.appendChild(style);
    module.exports = '';
  `;
  // 这个返回的js脚本给了webpack了
  // webpack会把这个js脚本转成AST抽象语法树,分析脚本中的依赖，也就是上面的require，加载依赖，依赖(require的参数)为!!C:/Users/yuhua7/Desktop/webpack/4.webpack-loader/loaders/less-loader.js!C:/Users/yuhua7/Desktop/webpack/4.webpack-loader/src/style.less，那么这个参数有两个感叹号!!，这代表只走行内，也就是说其实只需要一个内联loader去处理，所以会去走内联loader处理文件。
  return script;
}

module.exports = loader;
