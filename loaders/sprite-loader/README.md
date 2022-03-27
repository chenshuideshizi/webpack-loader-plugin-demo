# 常用loader的实现-Sprite Loader

- 找出哪些图片要加入雪碧图，所以要加个标识
- 合并出来一个雪碧图，还要计算出它们的大小，位置
- 改变 css 文件，把旧的路径改成新的路径，另外要添加 CSS 规则 background-position
