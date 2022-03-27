const { getOptions, interpolateName } = require("loader-utils");
const mime = require('mime');

/*
  content是上一个loader传给当前loader的内容，或者源文件内容,默认是字符串类型
  如果你希望得到Buffer，不希望转成字符串，那么就给loader.row置为true。即loader.row若为默认值false则content是字符串，为true就是Buffer

*/
function loader(content){
  // console.log(content)
  let options = getOptions(this) || {}; // 拿到参数
  let { limit, fallback } = options;
  if (limit) {
    limit = parseInt(limit, 10);
  }
  const mimeType = mime.getType(this.resourcePath);
  if (!limit || content.length < limit) {
    let base64 = `data:${mimeType};base64,${content.toString('base64')}`;
    return  `module.exports = ${JSON.stringify(base64)}`;
  } else {
    // 这里不能用require('file-loader')，因为如果这样写的话，会去node_modules中找，而不是我们自己的file-loader了。源码是可以的，因为源码总file-loader就是装在node_modules中
    return require(fallback).call(this, content);
  }
}

loader.raw = true; // loader的参数content会是buffer类型

module.exports = loader;
