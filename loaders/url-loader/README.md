# 常用loader的实现-URL Loader
(面试点)url-loader是file-loader的升级版，内部包含了file-loader。url-loader配置的时候回配置一个limit，这个配置的值代表小于limit的值的时候，转成base64，大于的时候还是文件，比如说原本是图片，那大于limit就还是图片。

所以，url-loader主要就是先判断大小(内容的buffer的lenth)是否大于limit，大于就走file-loader，否则就用toStrng('base64')转成base64。
