const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.png'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@common': path.resolve(__dirname, 'src/common/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@models': path.resolve(__dirname, 'src/models/'),
    },
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "build/app"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  mode: "development",
  devServer: {
    host: "localhost",
    hot: true,
    port: 8090,
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: "./public/favicon.png",
    }),
    new Dotenv()
  ],
};