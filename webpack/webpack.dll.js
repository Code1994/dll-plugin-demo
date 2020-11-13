const path = require('path')
const webpack  = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['vue', 'element-ui']
  },
  output: {
    path: path.resolve(__dirname, '../static'),
    filename: 'dll/[name].[hash:4].dll.js',
    // dll会将资源打成新的js包 并需要手动在html添加链接引用 所以这里是把资源导出为一个全局变量
    library: '[name]_[hash:4]_dll'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../static/dll')]
    }),
    new webpack.DllPlugin({
      context: __dirname,
      // manifest文件的name值 必须与output.library保持一致
      name: '[name]_[hash:4]_dll',
      // 存放manifest文件的位置 DllReferencePlugin会根据这个文件进行寻找模块与全局变量之间的关系
      path: path.resolve(__dirname, './dll', '[name].manifest.json')
    })
  ]
}

// 注意点：
/*
1.output.library必须与DllPlugin配置项中的name相同

2.DllPlugin配置项的context必须与DllReferencePlugin配置项的context相同，而且二者必填。（最后webpack.config.js与webpack.dll.js在同一集目录下）

3.需要在html模板中手动引入dll文件。
*/ 