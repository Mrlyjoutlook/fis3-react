#React,FIS3
Construction of react application based on fis3.

why not use webpack？

相对整个前端项目工程化问题，单单靠webpack还是不够，FIS3和webpack在定位上不一样的，FIS3是相对于整个前端项目工程化的构建，webpack则是对于SPA和模块管理打包，算是工程化的一部分。FIS3解决webpack一些无法满足的地方，同样的，没有webpack一些吸引人和好用的地方，以上纯属于个人观点。webpack和gulp都用过，一直在寻找对于不同应用的项目适合自己解决方案。这个项目算是author(本人)对FIS3的上手和对前端工程化探索。

##Npm Script
- `打包` npm run dist
- `本地开发测试` npm start(ctr+c 只会停止文件监听，并不会停止本地服务器)
- `代码风格检测` npm run lint
- `清除打包目录` npm run clean
- `停止本地开发测试服务器` npm stop

##Features

- support es6,jsx
- support redux,react-router
- support less

##Directory Structure

```
fis3-react/
├── dist/  //执行npm run dist打包后文件目录  
├── mock/  //mock模拟数据
├── src/
│     ├── action/  //建议相关的types和action为一个文件
│     ├── components/
│     ├── config/  // 自行发挥
│     ├── reducers/  //redux reducers
│     ├── routes/  //按路由结构划分组件及目录
│     ├── store/  //redux store
│     ├── util/  //自行发挥
│     └── routes.js
├──static/
│     ├──lib/  //类库，如jq,loadsh
│     ├── styles/  //样式
│     └── images/  //	图片
```

#FIS3
解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题

##FIS3 构建工作原理
FIS3 是基于文件对象进行构建的，每个进入 FIS3 的文件都会实例化成一个 File 对象，整个构建过程都对这个对象进行操作完成构建任务。
分为构建流程和编译流程。[官方文档](http://fis.baidu.com/fis3/docs/build.html#%E6%9E%84%E5%BB%BA%E6%B5%81%E7%A8%8B)

---
![FIS3 运行原理](https://raw.githubusercontent.com/fex-team/fis3/master/doc/docs/api/img/fis-compile-flow.png)

---

##FIS3 构建流程(打包过程)
- prepackager（打包前处理）
- packager（标准打包阶段）
- spriter（图片合并等）
- postpackager（打包后处理）

##FIS3 编译流程(单文件编译)
- lint（代码审查）
- parser（编译）
- preprocessor（fis内置标准前处理）
- standard（fis内置标准处理）
- postprocessor（fis内置语法标准处理后）
- optimizer（代码优化）

##FIS3 插件（注意和灵活使用的插件）
[fis3-packager-deps-pack](https://github.com/fex-team/fis3-packager-deps-pack)

- 原来的 packTo 将被忽视，在此插件配置项中设置。
- 每个规则都会按顺序将命中的文件加入到列表或者从列表中移除，顺序不同会带来不一样的结果。
- :deps 用来命中目标文件的依赖文件，不包含自己。
- :asyncs 用来命中目标文件的异步依赖，不包含自己。
- !xxx 叹号打头的规则，会把命中的文件，从现有的列表中去除。


##mock 假数据模拟
server.conf 配置文件 [官方文档](http://fis.baidu.com/fis3/docs/node-mock.html)

```
指令名称 正则规则 目标文件
```

- `指令名称` 支持 rewrite 、 redirect 和 proxy。
- `正则规则` 用来命中需要作假的请求路径。
- `目标文件` 设置转发的目标地址，需要配置一个可请求的 url 地址。

eg:http://127.0.0.1:8080/api/user

##FIS3构建React工程 遗留问题
- 按需加载，使用amd requirejs本地开发可以实现按需加载，打包时候在于`fis.match('::package', {packager:[fis.plugin('deps-pack',{})})`的配置问题。如果自己写的话，小项目可以应付的来，大项目的话这个地方相当麻烦。如何实现自动化，正在解决...
- 前端路由跳转后刷新，找不到对应路由。问题点应该在于SPA的路由和本地服务器端路由不是同一层，可能需要SPA->SSR才行，或者换本地服务器？。但项目定位为SPA的构建项目。正在解决...

如果有哪位同学发现或者已经解决可以一起探讨下。lssues

rep正在继续完善途中...