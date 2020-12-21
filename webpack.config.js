/*
 * @Descripttion: webpack ./src/entry.js -o ./dist/bundle.js
 * @Date: 2020-12-07 11:47:40
 * @LastEditTime: 2020-12-18 16:23:35
 */
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
var website = {
    publicPath: "http://localhost:1717/"
}

module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/entry.js',
        //这里我们又引入了一个入口文件
        // entry2:'./src/entry2.js'
    },
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: path.resolve(__dirname, 'dist'),
        //输出的文件名称
        filename: '[name].js',
        publicPath: website.publicPath
        // filename:'bundle.js'

    },
    //配置webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 1717
    },
    //模块：例如解读CSS,图片如何转换，压缩c
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                        modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)/,///是匹配图片文件后缀名称。
                use: [{
                    loader: 'url-loader',//是指定使用的loader和loader的配置参数
                    options: {
                        limit: 500000,//是把小于500000B的文件打成Base64的格式，写入JS。
                        outputPath: 'images/',
                    }
                }]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins: [
        new htmlPlugin({
            minify: { //minify：是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号。
                removeAttributeQuotes: true
            },
            hash: true,//为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/index.html' //template：是要打包的html模版路径和文件名称。
        }),
        // new extractTextPlugin("css/index.css")//分离CSS
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),//，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找使用css
        })
    ],
}