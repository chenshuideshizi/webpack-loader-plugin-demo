# 常用loader的实现-File Loader

file-loader的原理(面试点)就是通过laoder的参数拿到文件的内容，然后解析出file-loader配置中的名字，解析名字其实就是替换[hash]、[ext]等，然后向输出目录里输出一个文件，这个文件的内容就是loader的参数，名字就是刚刚说的解析出的名字。但是，实际上，并不是在loader里输出文件的，loader只是向webpack的complication的assets中，添加的文件id和内容，最终还是webpack将文件写进硬盘的。
