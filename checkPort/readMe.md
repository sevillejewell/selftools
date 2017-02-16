1,公司用的微服务架构,so 服务比较多,有时候可能会宕机一些服务,so 有node写个插件检查是否宕机
  使用步骤:
    1,安装node,配置node环境
    2,下载插件,在当前目录下下载依赖包 npm install
    3,配置config.js
    4,启动 npm run start(也可以在jenkins里面创建一个项目用来检查,这样更简单实用)
