const webpack = require('webpack');
const { resolve } = require('./webpack.common');

const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const isProd = NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'none' : '#cheap-module-eval-source-map',
  target: 'web',
  entry: {
    component: [resolve('front/src/index.js')]
  },
  output: {
    path: resolve('server/public/dist'),
    filename: '[name].min.js',
    publicPath: '/dist/',
  },
  resolve: {
    modules: [
      resolve('front/'),
      resolve('node_modules'),
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve('front/')],
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|sass)$/,
        include: [resolve(('front/'))],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: [resolve(('front/'))],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': isProd ? 'production' : 'development',
    }),
    new webpack.HashedModuleIdsPlugin({}),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ],
  devServer: {
    contentBase: resolve('front/public'),
    compress: false,
    hot: true,
    host: '0.0.0.0',
    port: 8180,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    ]
  }
}