const { getOptions, interpolateName } = require("loader-utils");

/*
  content是上一个loader传给当前loader的内容，或者源文件内容,默认是字符串类型
  如果你希望得到Buffer，不希望转成字符串，那么就给loader.row置为true。即loader.row若为默认值false则content是字符串，为true就是Buffer

*/
function loader(content){
  let options = getOptions(this) || {}; // 拿到参数
  // 下面的参数 this是loaderContext， filename是文件名生成模板，即webpack配置中的[hash].[ext] content是文件内容
  let url = interpolateName(this, options.filename || "[hash].[ext]", {content}); // 转换名字
  // 向输出目录里输出一个文件
  // this.emitFile是loaderRunner提供的
  this.emitFile(url, content);// 向输出目录里输出一个文件,其实本质就是webpack中的complication.assets[filename]=content,然后webpack会将assets写到目标目录下。所以不是loader去生成文件的。
  return `module.exports = ${JSON.stringify(url)}`; // 这里的loader肯定要返回一个JS模块代码,即导出一个值，这个值将会成为次模块的导出结果
}

loader.raw = true; // loader的参数content会是buffer类型

module.exports = loader;

