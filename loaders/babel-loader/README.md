# 常用loader的实现-Babel Loader

babel-loader的主要原理(面试点)就是：调动@babel/core这个包下面的transform方法，将源码通过presets预设来进行转换，然后生成新的代码、map和ast语法树传给下一个loader。这里的presets，比如@babel/preset-env这个预设其实就是各类插件的集合，基本上一个插件转换一个语法，比如箭头函数转换，有箭头函数转换的插件，这些插件集合就组成了预设。


