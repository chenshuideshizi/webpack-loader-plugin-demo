const postcss = require('postcss');
const path = require('path');
const loaderUtils = require('loader-utils');
const spritesmith = require('spritesmith'); // 多张小图转化成大图
const Tokenizer = require('css-selector-tokenizer');
// const fs = require('fs');

function createPlugin(options, that) {
  return function(css) {
    // 捕获导入,如果多个就执行多次
    css.walkAtRules(/^import$/, function(rule) {
      // 拿到每个导入
      const values = Tokenizer.parseValues(rule.params);
      // console.log(JSON.stringify(values));
      // {"type":"values","nodes":[{"type":"value","nodes":[{"type":"string","value":"./base.css","stringType":"'"}]}]}
      // 找到url
      const url = values.nodes[0].nodes[0]; // 第一层的第一个的第一个
      options.importItems.push(url.value);
    });
    // 遍历每个css属性
    css.walkDecls(decl => {
      // 把value转换成树
      const values = Tokenizer.parseValues(decl.value);

      values.nodes.forEach(value => {
        value.nodes.forEach(item => {
          // 拿到每项值
          // 判断是不是url,并且以 ?sprite 结尾
          if (item.type === 'url' && item.url.endsWith('?sprite')) {
            // 这样需要变成雪碧图
            // 拼接成图片的绝对路径  that.context表示被加载的资源的目录
            const url = path.resolve(that.context, item.url);
            // 图片url都换成雪碧图的路径
            item.url = options.spriteFilename;
            // 按理，我要在当前规则下添加一条background-position，这条规则
            // 但是现在添加不了，因为我还不知道要怎么添加,所以先保存起来
            options.rules.push({
              url, // 原本图片的绝对路径，未来拿来合并雪碧图用
              rule: decl.parent // 当前的规则 parent就是一个css选择器 .one .two .three
            });
          } else if (item.type === 'url') {
            const url = item.url;
            item.url = `_CSS_URL_${options.urlItems.length}_`;
            options.urlItems.push(url); // ['./bg.jpg']
          }
        });
      });
      // 直接把url地址改成雪碧图的名字
      decl.value = Tokenizer.stringifyValues(values);
    });

    // 映射,添加规则，占位
    options.rules
      .map(item => item.rule)
      .forEach((rule, index) => {
        rule.append(
          // 加一项属性,就是规则
          postcss.decl({
            prop: 'background-position',
            value: `_BACKGROUND_POSITION_${index}_`
          })
        );
      });
  };
}
/* 合成雪碧图的loader */
function loader(inputSource) {
  const options = {
    spriteFilename: 'sprite.jpg', // 雪碧图的名字
    rules: [], // 存放规则
    urlItems: [], // 不拿来切成雪碧图的图片url
    importItems: [] // 存放导入的资源
  };
  const callback = this.async(); // 获取回调函数
  // 拿到导入路径，拼接
  const importCss = options.importItems
    .map(imp => {
      // stringifyRequest 可以把绝对路径转化成相对路径
      return `require(${loaderUtils.stringifyRequest(this, imp)})`; // 拼接
    })
    .join('\n'); // 拿到一个个import
  // 解析成树, 创建，通过插件
  const pipeline = postcss([createPlugin(options, this)]);
  // 解析输入的内容
  pipeline.process(inputSource, { from: undefined }).then(resCss => {
    // console.log(resCss.css);
    const sprites = options.rules.map(item =>
      item.url.slice(0, item.url.lastIndexOf('?'))
    );
    // 让人家自己生成
    let cssStr = JSON.stringify(resCss.css);
    // 对@import进行删除，替换成require了
    cssStr = cssStr.replace(/@import\s+?["'][^'"]+?["'];/g, '');
    // 对不是雪碧图的也进行替换
    cssStr = cssStr.replace(/_CSS_URL_(\d+?)_/g, function(matched, group) {
      // 索引拿到，然后拿到这个,替换掉原来的_CSS_URL_0_哪些
      const imgURL = options.urlItems[+group];
      // console.log('图片路径', imgURL);
      // "background: url('"+require('./bg.jpg')+"') center no-repeat;"
      return `"+require('${imgURL}').default+"`;
    });
    // 合并雪碧图
    spritesmith.run({ src: sprites }, (err, result) => {
      if (err) {
        callback(null, `module.exports = ${cssStr};`);
        return;
      }
      // 替换占位
      const coordinates = result.coordinates;
      Object.keys(coordinates).forEach((key, index) => {
        const position = coordinates[key];
        cssStr = cssStr.replace(
          `_BACKGROUND_POSITION_${index}_`,
          ` -${position.x}px -${position.y}px ` // 替换成对应的变量xy
        );
      });
      // 写入图片
      //   fs.writeFileSync('./test-sprite.jpg', result.image, 'utf-8');
      this.emitFile(options.spriteFilename, result.image);
      // 加入规则 background-position: xxx;

      // 返回结果
      callback(
        null,
        `
        ${importCss}
        module.exports = ${cssStr};`
      );
    });
  });
}
// 原生的意思，默认情况下loader得到的内容是字符串,如果你想得到二进制文件，需要把raw = true
loader.raw = true;

module.exports = loader;
