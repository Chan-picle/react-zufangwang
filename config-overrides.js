const { 
  override, 
  fixBabelImports, 
  addWebpackResolve,
  addPostcssPlugins,
  addWebpackAlias,
  addDecoratorsLegacy,
  addLessLoader
} = require('customize-cra');

const rewirePostcss = require('react-app-rewire-postcss');
const px2rem = require('postcss-px2rem')

const path = require('path');

module.exports = override(
  // 允许按需引入加载
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  // 后缀名配置
  addWebpackResolve({
    extensions: ['.js', '.json', '.jsx'],
  }),
  // 移动端适配
  // addPostcssPlugins([require("postcss-px2rem")({ remUnit: 37.5 })]),
  // 别名配置
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src/'),
    'as': path.resolve(__dirname, 'src/assets/'),
    'p': path.resolve(__dirname, 'src/pages/')
  }),
  // 装饰器
  addDecoratorsLegacy(),
  //less
  addLessLoader(),
  (config,env)=>{ 
    // 重写postcss
    rewirePostcss(config,{
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            }),
           //关键:设置px2rem 
            px2rem({
                remUnit: 37.5,
                exclude:/node-modules/
            })
        ],
    });


    return config
  }
);