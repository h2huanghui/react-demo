const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ROOTPATH = path.join(process.cwd());
const APP_PATH = path.join(ROOTPATH, '/src')
const DevMode =process.env.NODE_ENV === 'development'
module.exports = {
    // entry: path.join(APP_PATH,'/App.js')
    entry: {
        home: path.join(APP_PATH,'/views/home/entry.js'),
        order: path.join(APP_PATH,'/views/order/entry.js'),
    },
    output:{
        filename: '[name]/[name].js',
        path: path.join(ROOTPATH,'/dist')
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test:/\.css$/,
                use: [
                    DevMode?'style-loader':MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader', //postcss-loader配置
                        options:{
                            sourceMap: true,
                            config:{
                                path: 'postcss.config.js' //postcss配置文件
                            }
                        }
                    },
                ]
            },
            {
                test:/\.scss$/,
                use: [
                    DevMode?'style-loader':MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader', //postcss-loader配置
                        options:{
                            sourceMap: true,
                            config:{
                                path: 'postcss.config.js' //postcss配置文件
                            }
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            implementation: require('dart-sass') //用dart-sass代替node-sass ，撒花！！！
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg|gif|png|jpg)(\?|$)/, //文件处理
                use: {
                    loader: 'file-loader',
                    options:{
                        name:'[folder]/[name].[ext]',
                        outputPath:'./assets',
                    }
                }
                
            }
            
        ]
    },
    optimization:{
        splitChunks:{
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/].*\.js$/,
                    chunks: "initial", 
                    name: "common", 
                    enforce: true,
                },
                // commons: {
                //     name: 'styles' ,  // 提取出来的文件命名
                //     // name： ‘common/common’ //  即先生成common文件夹
                //     chunks: 'initial',   // initial表示提取入口文件的公共css及js部分
                //     // chunks: 'all' // 提取所有文件的公共部分
                //     test: '/\.css$/',  // 只提取公共css ，命名可改styles 
                //     minChunks:2,// 表示提取公共部分最少的文件数
                //     minSize: 0  // 表示提取公共部分最小的大小 
                //    // 如果发现页面中未引用公共文件，加上enforce: true
                // }
            }
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: `home/index.html`,
            template: path.join(APP_PATH,'/index.html'),
            chunks:['common','home']
        }),
        new HtmlWebpackPlugin({
            filename: `order/index.html`,
            template: path.join(APP_PATH,'/index.html'),
            chunks:['common','order']
        }),
        new MiniCssExtractPlugin({
            filename: "[name]/[name].css",
            chunkFilename: "[id].css"
        })
    ],
    
}