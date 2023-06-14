# webpack

痛点:只能处理 JavaScript 文件, 所以为了能处理其他类型的文件,引入了 loader 文件转换器的概念, 处理其他文件类型的文件输出成 esmodule 模块的 js 代码,这样 webpack 就能识别进行打包

## loader

_一个 loader 就是一个 nodejs 模块，他导出的是一个函数，这个函数只有一个入参，这个参数就是一个包含资源文件内容的字符串，而函数的返回值就是处理后的内容。_

**默认情况下,每个 loader 都会有一个 pitch 函数**

- 一.执行顺序
  默认情况下 loader 的执行方式从左往右执行每个 loader 默认的 pitch 函数,执行完之后再从右往左执行每个 loader 函数

  eg: [loader1, loader2, loader3]

  `loader1.pitch-->loader2.pitch-->loader3.pitch-->loader3-->loader2-->loader1`

  **注:当有 loader 显式的定义 pitch 函数并且函数有返回值的时候, 这时候会阻断 loader 链, 把当前的 pitch 函数的反回值直接发送到上一个 loader 函数,然后从右往左执行剩下的 loader**

  eg:[loader1,{loader2,pitch},loader3 ]

  `loader1.pitch-->loader2.pitch-->loader1`

#### pitch (包含三个参数)

1.remainingRequest：loader 链中排在自己后面的 loader 以及资源文件的绝对路径以`!`作为连接符组成的字符串。
2.precedingRequest：loader 链中排在自己前面的 loader 的绝对路径以`!`作为连接符组成的字符串。
3.data：每个 loader 中存放在上下文中的固定字段，可用于 pitch 给 loader 传递数据。

## 插件 plugin

### webpack5 特性

一. 处理图片文件方式不同

v4.xx 之前 处理文件需要用到`url-loader` 或者是`file-loader`, url-loader 会内置 file-loader,使用的时候需要注意两个 loader 配置会冲突,需要注释一个 loader 的配置.不然在使用 url-loader 处理图片的时候,会导致图片出不来不显示

**raw-loader**：将文件作为字符串导入
**file-loader**：处理文件的路径并输出文件到输出目录
**url-loader**：有条件将文件转化为 base64 URL，如果文件大于 limit 值，通常交给 file-loader 处理。
**html-loader** : 处理 html 文件里面的 img v5 版本已经放弃,换成了 html-withimg-loader

```javascript
module:{
    rules:[
        test: /\.(jpe?g|png|svg|gif)/i,
        use:[
            {
                loader:'url-loader',
                options:{
                        limit:8*1024 //大于8k的图片文件会自动转到file-loader处理
                }
            }
        ],
         type: "javascript/auto",   //v5版本需要添加这个,不然图片显示不出
    ]
}

```

v5 处理图片文件不再需要使用 loader 的形式,是以**资源模块**来代替处理文件的 loader

资源模块有以下 4 种配置
1.asset/resource： 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
2.asset/inline： 导出一个资源的 data URI。之前通过使用 url-loader 实现。
3.asset/source： 导出资源的源代码。之前通过使用 raw-loader 实现。
4.asset： 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

**注:资源模块配置互斥不能同时使用**

```javascript
//第一种
module: {
  rules: [
    {
      test: /\.(jpe?g|png|svg|gif)/i,
      type: "asset/resource",
      generator: {
        filename: "img/[name][ext][query]", // 局部指定输出位置
      },
    },
  ];
}
//第二种
module: {
  rules: [
    {
      test: /\.(jpe?g|png|svg|gif)/i,
      type: "asset/inline",
    },
  ];
}
//第三种  (不常用)

//第四种
//可以通过以下配置可以将满足需求的图片输出dataURL,其他原样输出,
module: {
  rules: [
    {
      test: /\.(jpe?g|png|svg|gif)/i,
      type: "asset",
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024, // 限制于 8kb 大于8kb的图片将源文件输出,否则输出dataURL
        },
      },
    },
  ];
}
```
