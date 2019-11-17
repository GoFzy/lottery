lottery 抽奖转盘
本项目使用 `React-Koa2` 框架进行了抽奖转盘的实现

# 一、项目启动
```sh
# 安装依赖
$ npm install

# 启动项目
$ npm run start

# windows 环境下启动项目(无法一次运行多个命令)
$ npm run server
$ npm run dev

# 编译项目
$ npm run build
```
项目启动成功后，可以在 `locahost:8180` 进行本地开发  
`npm run build` 编译成功，可以在本地服务器`locahost:3000/dist` 访问打包结果

# 二、目录结构
```sh
lottery
|—— build                   webpack文件配置
│     ├── webpack.dev.js      基本配置文件
│     ├── webpack.common.js   公用配置文件
|—— front                   前端
│     ├── page                html页面
│     ├── src                 源代码
│     │     ├── assets          静态资源
│     │     ├── component       组件资源
│     │     ├── index.js        前端入口文件
|—— server                  服务端
│     ├── bin                 启动文件
│     ├── public              静态资源
│     ├── routes              路由文件
│     ├── app.js              服务端入口
```  