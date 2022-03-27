const { getOptions } = require('loader-utils');
const fileLoader = require('file-loader');
const mime = require('mime');
/** 如果文件大小小于limit，就不再生成新的文件，而是返回base64 */
function loader(inputSource) {
  // 获取参数
  const options = getOptions(this) || {};
  const filename = options.filename || '[hash].[ext]'; // 获取文件名
  const limit = options.limit || 1024 * 100; // 100kb以上提取出去
  // 小于，内嵌
  if (inputSource.length < limit) {
    // 获取此图片的mime类型
    const contentType = mime.getType(this.resourcePath);
    let base64 = `data:${contentType};base64,${inputSource.toString('base64')}`;
    return `module.exports = ${JSON.stringify(base64)}`; // 直接返回base64的代码
  }
  // 指定this
  return fileLoader.call(this, inputSource);
}
// 原生的意思，默认情况下loader得到的内容是字符串,如果你想得到二进制文件，需要把raw = true
loader.raw = true;

module.exports = loader;

