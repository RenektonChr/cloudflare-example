const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 确保正确检测环境变量
const isDevelopment = process.env.NODE_ENV !== 'production';
console.log(`Building in ${isDevelopment ? 'development' : 'production'} mode`);

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevelopment ? 'bundle.[fullhash].js' : 'bundle.[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: isDevelopment,
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 确保React Refresh仅在开发模式下启用
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel')
              ].filter(Boolean),
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      templateParameters: {
        PUBLIC_URL: '/public',
      },
    }),
    // 确保MiniCssExtractPlugin在生产模式下启用
    !isDevelopment && new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    // 确保ReactRefreshWebpackPlugin仅在开发模式下启用
    isDevelopment && new ReactRefreshWebpackPlugin({
      overlay: false, // 可以禁用错误覆盖层，避免某些问题
    }),
  ].filter(Boolean),
  // 生产模式下启用缓存和模块连接以提高性能
  cache: isDevelopment ? false : {
    type: 'filesystem',
  },
  optimization: {
    concatenateModules: !isDevelopment,
    // 添加生产环境优化
    minimize: !isDevelopment,
    splitChunks: !isDevelopment ? {
      chunks: 'all',
    } : false,
  },
};