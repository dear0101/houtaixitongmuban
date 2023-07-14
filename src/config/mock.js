const Mock = require("mockjs");
const Random = Mock.Random;
// mock一组数据
// const produceNewsData = function () {
//   let articles = [];
//   for (let i = 0; i < 100; i++) {
//     let newArticleObject = {
//       title: Random.csentence(5, 30), //  Random.csentence( min, max )
//       thumbnail_pic_s: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
//       author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
//       date: Random.date() + " " + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
//     };
//     articles.push(newArticleObject);
//   }

//   return {
//     articles: articles,
//   };
// };

module.exports = function (middlewares, devServer) {
  if (!devServer) {
    throw new Error("webpack-dev-server is not defined");
  }
  const app = devServer.app;
  //前置, 在其他中间件调用之前触发unshift,然后执行第一个.
  middlewares.unshift({
    name: "userInfo",
    path: "/get/user/info",
    middleware: (req, res) => {
      res.send("Hello World!fwfe");
    },
  });
  app.post("/gaga", (req, res) => {
    res.send("132fwaeawfe");
  });
  // mockServer(devServer.app);
  return middlewares;
};
