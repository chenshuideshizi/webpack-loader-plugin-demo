const loaderUtils = require('loader-utils');

function loader(source) {
  // // source是css代码
  // const script = `
  //       const style = document.createElement('style'); // 创建style标签
  //       style.innerHTML = ${JSON.stringify(source)};
  //       document.head.appendChild(style); // 然后放入head中
  //   `;
  return script; // 然后把脚本返回 ,这里因为pitch方法的问题，用不到
}

loader.pitch = function(remainingRequest, previousRequest, data) {
  // source是css代码
  // 下面的require直接跳过自己，然后执行 css-loader!!xxx.css
  // 如果不加!! 死循环
  // !! noPrePostAutoLoaders 不要前置，后置，普通loader，只要内联loader
  /*
    "!!../loaders/css-loader.js!../loaders/less-loader.js!./index.less"
    "!!../loaders/css-loader.js!./style.css"
    "!!../loaders/css-loader.js!./base.css"
  */
  const script = `
    const style = document.createElement('style'); // 创建style标签
    style.innerHTML = require(${loaderUtils.stringifyRequest(
      this,
      '!!' + remainingRequest
    )});
    document.head.appendChild(style); // 然后放入head中
`;
  return script; // 然后把脚本返回
};
// pitch如果有两个最左侧的loader要联合使用
module.exports = loader;
