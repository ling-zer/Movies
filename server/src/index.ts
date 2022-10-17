// 数据库
// express
// 验证：class-validator

import "reflect-metadata"
import Express from "express"
import MovieRouter from "./routes/MovieRoute"
import UploadRouter from "./routes/UploadRoute"
import history from "connect-history-api-fallback"
import compression from "compression"

const app = Express();
app.use(compression());
app.use(history());

app.use("/", Express.static("public/build")); // 访问/ , 把他映射到public/build
app.use("/upload", Express.static("public/upload")); // 配置访问静态资源的中间件

app.use(Express.json()); // 配置中间件，用于解析请求消息体中的json格式数据

// 使用postman测试
app.use("/api/movie", MovieRouter)

// 文件上传
// 通常情况下，服务器会提供一个统一的api接口，用于处理上传的文件
app.use("/api/upload", UploadRouter);

app.listen(3000);