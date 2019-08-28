const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ROOTPATH = path.join(process.cwd());
const APP_PATH = path.join(ROOTPATH, '/src')
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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