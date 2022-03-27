const { getOptions, interpolateName } = require('loader-utils');
// interpolateName方法 重新生成文件名

// 读取源图片文件内容，并且重命名写入到新的输出目录下
function loader(inputSource) {
  const options = getOptions(this) || {}; // 获取参数
  const filename = options.filename || '[hash].[ext]'; // 获取文件名
  // 获取的图片文件名  [name].[hash].[ext]
  const outputFilename = interpolateName(this, filename, {
    content: inputSource
  });
  // 图片文件名 输出的内容inputSource,输出到outputFilename中
  this.emitFile(outputFilename, inputSource);

  return `module.exports = ${JSON.stringify(outputFilename)}`;
}
// 原生的意思，默认情况下loader得到的内容是字符串,如果你想得到二进制文件，需要把raw = true
loader.raw = true;

module.exports = loader;
