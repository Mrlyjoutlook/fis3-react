/******************** fis default settings(fis全局属性设置) **************************/

fis.set('project.md5Connector ', '.'); //文件名+md5方式（name.as13da231）
// fis.set('project.files', ['README.md','package.json']);
fis.set('project.ignore', fis.get('project.ignore').concat([
  'README.md',
  'package.json'
]));

//添加对commonjs支持(fis3-hook-commonjs)
fis.hook('commonjs', {
  baseUrl: './src',
  extList: ['.js', '.jsx', '.es', '.ts', '.tsx']
})

//禁用fis3默认的fis-hook-components,切换成npm(fis3-hook-fis3-hook-node_modules)
fis.unhook('components')
fis.hook('node_modules', {
  ignoreDevDependencies: false // 忽略 devDep 文件
})

/******************** start **************************/

fis.match('/{node_modules, src}/**.{js,jsx}', {
  isMod: true, //设置成是模块化 js
  useSameNameRequire: true,
  rExt: '.js', // 产出后缀为 js
  parser:fis.plugin('babel-6.x',{
    sourceMaps: true
  },{
    presets: ["es2015", "react", "stage-0"]
  }), //编译处理
  preprocessor: [
    fis.plugin('js-require-css'),  //允许js中直接 require css 文件。
    fis.plugin('js-require-file',{
      useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
    })  //允许js中直接 require json,png... 文件。
  ]
});

fis.match('*.css', {
  preprocessor: fis.plugin('autoprefixer', {   //自动给 css 属性添加前缀。
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  })
});

fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});

fis.match('::package', {
  postpackager: fis.plugin('loader',{
    allInOne: true
  })
});

//对*.md文件忽略经过loader处理
fis.match('*.md', {
  loaderLang: false
});

/******************** prod **************************/

fis.media('prod')
  .match('/{node_modules,src}/**.{js,jsx}',{
    moduleId: function (m, path) {
       return fis.util.md5(path);
    }
  })
  .match('*.{js,jsx}', {
    useHash:true,  //添加hash 防止缓存
    optimizer: fis.plugin('uglify-js')  // js 压缩，已内置
  })
  .match('*.{css,less}', {
    useHash: true,
    useSprite: true,  // 对 CSS 进行图片合并
    optimizer: fis.plugin('clean-css')  // css 压缩，已内置
  })
  .match('*.{png,jpg,jpeg,gif}', {
    optimizer: fis.plugin('png-compressor')  // png-compressor 图片压缩，已内置
  })
  .match('::package', {
    spriter: fis.plugin('csssprites'),
    packager:[fis.plugin('deps-pack',{
      'resource/common.js': [
         '/src/index.js:deps',  // 将 /src/index.js 的依赖项加入队列，包含了 /src 中的依赖项 和 /node_modules 中的依赖项
         '!/src/**'  // 移除 /src/** 只保留 /node_module 中的依赖项
      ],
      'resource/app.js':[
          '/src/index.js',  // 将 /src/index.js 加入队列
          '/src/index.js:deps',  // 将 /src/index.js 的所有依赖项加入队列，因为第一步中已经命中了 /node_module 中的所有依赖项，因此这里只打包 /src 中的依赖项
          // '!/src/routes/me/components/Me.js'
      ],
      'resource/me.js':[
        '/src/routes/me/components/Me.js',
        '/src/routes/me/components/Me.js:deps'
      ],
      'resource/lib.js': '/static/lib/**.js',
      'resource/app.css': '/static/styles/**.{less,css}'
    }),fis.plugin('map',{
      useSourceMap:true
    })],
  });
