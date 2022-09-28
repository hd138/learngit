## 多文本省略号显示

##### 1.说明

- text-overflow:clip/ellipsis
- clip默认值，不显示省略号
- ellipsis：显示省略号标记

##### 2. 当单行文本溢出显示省略号需要同时设置一下声明

1. 容器要有宽度
2. 强制文本在一行显示：white-space：nowrap；
3. 溢出内容为隐藏：overflow：hidden；
4. 溢出文本显示省略号 ： text-overflow：ellipsis

