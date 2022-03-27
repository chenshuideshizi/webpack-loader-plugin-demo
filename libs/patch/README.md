# Patch 实现

pitch 实现 (上面实现的 babel-loader，babel1-3 是普通函数，不是 pitch 函数)


pitch function 是先执行的，从左往右执行，执行完毕后执行normal function，从右往左回去,不过执行条件如下

- 比如 a!b!c!module，正常调用顺序应该是 c、b、a，但是真正调用顺序是 a(pitch)、b(pitch)、c(pitch)、c、b、a，如果其中任何一个 pitching loader 返回了值，就相当于在它以及它右边的 loader 已经执行完毕
- 比如如果 b 返回了字符串’result b’,接下来只有 a 会被系统执行，且 a 的 loader 收到的参数是’result b’
- loader 根据返回值可以分成两种，一种是返回 s 代码(一个 module 的代码，含有类似 module export 语句)的 loader，还有不能作为最左边 loader 的其他 loader
- 有时候我们想把两个第一种 loader chain 起来，比如 style-loader!css-loader，问题是 css-loader 的返回值是一串代码，如果按正常方式写 style-loader 的参数就是一串代码字符串
- 为了解决这种问题，我们需要在 style-loader 里执行 require(css-loader!resources)

