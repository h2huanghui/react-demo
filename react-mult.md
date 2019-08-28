# webpack搭建react多页面应用

## 先搭建一个单页面应用

#### 创建目录
```
├── config              // webpack配置文件目录
├── package.json        
└── src                 // 源文件目录

```
#### 安装相关依赖

```
  npm i -D webpack webpack-cli html-webpack-plugin webpack-dev-server webpack-merge
```
#### 新建入口文件
在`src`下新建`App.js` 入口js， `inedx.html` 模板html。

#### config文件
基本配置
`webpack.config.base.js`
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOTPATH = path.join(process.cwd());
const APP_PATH = path.join(ROOTPATH, '/src')
module.exports = {
    entry: path.join(APP_PATH,'/App.js'),
    output:{
        filename: 'bundle.js',
        path: path.join(ROOTPATH,'/dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    
}
```
开发环境配置
`webpack.config.dev.js`
```js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

module.exports = merge(baseConfig,{
    mode:'development',
    devtool:'inline-source-map', //源码调试
    devServer:{
        contentBase:'../dist',
        port:'3333'
    }
})

```
生产环境
`webpack.config.prod.js`
```js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

module.exports = merge(baseConfig,{
    mode:'production'
})
```

#### 配置npm scripts
```
"dev":"webpack-dev-server --open --config config/webpack.config.dev.js",
"build":"webpack --config config/webpack.config.prod.js"
```

运行一下~

#### 安装babel-loader
引入react要配置babel
```
npm i -D babel-loader@7 babel-core babel-cli babel-polyfill babel-preset-react babel-preset-env
```
```js
module:{
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
    }]
},

```

根目录下新建`.babelrc`

```js
{
    "presets":["env","react"]
}
```
#### 引入react
安装
```
npm i react react-dom
```
修改`App.js`
```js
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    render(){
        return <h1>Hello UED!</h1>
    }
}

ReactDOM.render(<App />,document.getElementById('root'))
```
`index.html`添加
```html
<div id="root"></div>
```

#### 其他loader

```
npm i -D css-loader style-loader sass-loader dart-sass url-loader postcss-loader autoprefixer
```

```js
{
    test:/\.css$/,
    use: [
        'style-loader',
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
        'style-loader',
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
```
- 如果你使用sass

原来`sass-loader`要依赖`node-sass`（万恶之源），现在可以用`dart-sass`代替。

- 如果你使用`postcss`和`autoprefixer`

根目录新建`postcss.config.js`
```js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
};
```
`package.json`添加 `browserslist` 规则

```js
"browserslist": [
    "defaults",
    "not ie < 9",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
]
```

测试一下

新建`index.scss`
```scss
body{
    background: #999;
    .title{
        color: red;
        transform: rotate(-10deg)
    }
}
```
App.js 引入
```js
import './index.scss'
```

#### mini-css-extract-plugin

build一下，并没有生成css文件，这是因为用了`style-loader`，添加了`<style>`标签。

如果你想生成css文件，引入
```
npm i -D mini-css-extract-plugin
```


```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
```
替换style-loader 为MiniCssExtractPlugin.loader，注意顺序，增加plugin
```js
new MiniCssExtractPlugin({
    filename: "bundle.css",
    chunkFilename: "[id].css"
})
```



#### react-router

其他桶，暂不赘述

安装

```
npm i react-router-dom
```
新建views文件夹，新建两个page，HomePage\DetailPage

修改App.js，采取browserHistory方式的路由

```js
import {BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './views/HomePage'
import DetailPage from './views/DetailPage'

```
```js
<Router>
    <Route path="/" exact component={HomePage}  />
    <Route path="/detail" component={DetailPage} />
</Router>
```

