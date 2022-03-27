let less = require('less')

function loader(inputSource){
  // let css;
  // less.render(inputSource, { filename: this.resource }, (err, output) => {
  //   css = output.css;
  // })
  // return css; // 虽然上面css赋值在回调中，但是本身render是同步的，所以可以在这里return。但是假如render是异步，那么就不能够这么写了，异步怎么写，看下面:

  let callback = this.async(); // 这种写法就是即便render是异步，也可以在loader中返回callback的参数值。this.async()这个方法是loader-runner提供的，乳沟调用了async方法，可以把loader的执行变成异步
  less.render(inputSource, { filename: this.resource }, (err, output) => {
    // less-loader本来可以写成callback(err, output.css)，但是作者为了能够使得less-loader放在最后一个，也就是返回的应该是一段JS脚本，所以就写成了下面的写法
    callback(err, `module.exports = ${JSON.stringify(output.css)}`) // 这个callback的是this.async()，而this.async()里面的实现就是调用context.callback，而这里的this就是context，所以你不写let callback = this.async()，在回调中直接用this.callback(null, 内容)是一样的
  })
}

module.exports = loader;
