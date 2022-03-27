const less = require('less');
// const loaderUtils = require('loader-utils');

module.exports = function loader(source) {
  const callback = this.async();
  // less转化程css
  less.render(
    source,
    {
      filename: this.resource
    },
    (err, output) => {
      // 编译然后获取css代码返回
      callback(err, output.css);
    }
  );
};
