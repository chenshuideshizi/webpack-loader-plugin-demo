/** loaders/loader1 */
// 最后到给loader1
function loader(inputSource) {
  // console.log('index') // loader3 // loader2
  console.log('loader1');
  return inputSource + ' // loader1';
}
// pitch function
loader.pitch = function(remindingRequest, previousRequest, data) {
  console.log('pitch1');
};

module.exports = loader;

/** loaders/loader2 */
// 第二个给loader2
function loader(inputSource) {
  // console.log('index') // loader3
  console.log('loader2');
  return inputSource + ' // loader2';
}
// pitch function
loader.pitch = function(remindingRequest, previousRequest, data) {
  console.log('pitch2');
};

module.exports = loader;

/** loaders/loader3 */
// 先给loader3
function loader(inputSource) {
  // 文件内容 inputSource
  // return inputSource + ' // loader3';
  // 异步写法如下
  const callback = this.async();
  setTimeout(() => {
    console.log('loader3');
    callback(null, inputSource + ' // loader3');
  }, 1000);
}
// pitch function
loader.pitch = function(remindingRequest, previousRequest, data) {
  console.log('pitch3');
  return 'let name = "loader3";'; // let name = "loader3"; // loader2 // loader1
};

module.exports = loader;

// 执行顺序如下
pitch1;
pitch2;
pitch3;
loader2;
loader1;
// 获得结果是:
let name = 'loader3'; // loader2 // loader1
