const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

module.exports = merge(baseConfig,{
    mode:'development',
    devtool:'inline-source-map', //源码调试
    devServer:{
        contentBase:'../dist',
        port:'3333',
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/home/index.html' },
                { from: /^\/home/, to: '/home/index.html' },
                { from: /^\/order.*/, to: '/order/index.html' },
            ]
        }
    }
})