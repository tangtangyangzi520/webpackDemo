# 环境

node14.15.1

# 初始化

mkdir webpack_demo
cd webpack_demo
npm install -g webpack
npm n init
npm install --save-dev webpack

## 打包命令

webpack ./src/entry.js -o ./dist/bundle.js
./src/entry.js为打包的文件
/dist/bundle.js为打包后的文件

## 配置入口文件和出口文件

    //入口文件的配置项
    entry:{
        entry:'./src/entry.js',
        //这里我们又引入了一个入口文件
        // entry2:'./src/entry2.js'
    },
    //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        // filename:'[name].js'
        filename:'bundle.js'
    }

## 配置devServer

    安装webpack-dev-server
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }

## 配置启动命令

"scripts": {
    "server": "webpack-dev-server"
  },

## 运行npm run server

监听 http://localhost:1717/

# 安装style-loader

npm install style-loader --save-dev  它是用来处理css文件中的url()等
npm install --save-dev css-loader 它是用来将css插入到页面的style标签

# loaders配置

rules: [
    {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
    }
]

安装@babel/preset-env插件把es6代码转换成低版本浏览器能识别的代码
配置：
.babelrc文件
{
    "presets": ["@babel/preset-env"]
}
{
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
            presets: ['@babel/preset-env']
        },
}

配置完成就能将文件进行压缩

## html文件发布

安装
npm install --save-dev html-webpack-plugin
配置插件 打包HTML文件
new htmlPlugin({
    minify:{
        removeAttributeQuotes:true
    },
    hash:true,
    template:'./src/index.html'

})

# 安装file-loader和url-loader css图片处理

npm install --save-dev file-loader url-loader
file-loader 解决引用路径的问题
url-loader 相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了
url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。

# css分离与图片路径处理

extract-text-webpack-plugin 把CSS单独提取
npm install --save-dev extract-text-webpack-plugin

# 打包后的图片并没有放到images文件夹

使用html-withimg-loader
npm install html-withimg-loader --save

# 打包Less sass文件

npm install --save-dev less
npm n install --save-dev less-loader

npm n install --save-dev node-sass
npm install --save-dev sass-loader

# 自动处理css3属性前缀

安装两个包postcss-loader 和autoprefixer（自动添加前缀的插件）
npm install --save-dev postcss-loader autoprefixer

# 消除未使用的css

npm install postcss-cli autoprefixer