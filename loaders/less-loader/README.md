# 常用loader的实现-Less Loader


less-loader的原理(面试点)：主要是借助less模块的render方法，将less语法进行转换成css语法，然后返回或者额调用this.callback()传递给下一个loader。但是由于less-loader原本设计的时候，是想让less-loader可以作为最后一个loader使用的，所谓的最后一个loader，也就是说最后的返回值是一个js模块，也就是说module.exports = xxx这种，所以less-loader在返回结果的时候，将转换后的内容，外面套了一层module.exports = 转换后的内容。

那么这里变成了module.exports导出后，给到css-loader，css-loader只是处理了import、url等语法，将内容给到了style-loader，style-loader也就要跟着改变，因为style-loader的作用是创建一个style脚本，将css内容包裹在style标签中去，然后把style插入到document.head中。那么这里的关键就是拿到样式内容，这个内容刚才说了，被module.exports包裹了，那怎么拿到？直接require就可以了，因为module.exports本来就是js模块的导出格式，所以直接require就可以了。

实际上，在真正的style-loader、css-loader和less-loader的执行过程是这样的(面试点)：

​ 先执行loader的pitch函数，pitch函数是从左往右的，从上到下的，也就是先执行style-loader的pitch，这个函数主要是创建一个script脚本，这个脚本主要是创建一个style标签，style标签的innerHTML就是css样式，然后将style标签插入document.head中，然后将这个script脚本返回。注意，这边是有返回值的。pitch-loader一旦有返回值，那么后面的css-loader和less-loader都将不会直接，也不会执行当前loader的normal-loader，既然都不会执行了，那么style标签的css内容哪里来呢？其实，他在创建style标签后，它又require了css-loader和less-loader这两个内联loader，是走了内联loader才获取到的。内联loader从右往左，从下往上，也就是先执行less-loader，然后执行css-loader，最后将内容返给stylel-loader，这样才得到了css内容，赋值给style标签的innerHTML，然后插入到document.head中，这样才完成了整个样式的loader处理。
————————————————
版权声明：本文为CSDN博主「俞华」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_17175013/article/details/119425847
