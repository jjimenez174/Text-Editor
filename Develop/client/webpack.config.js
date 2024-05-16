// Imports
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
   // Webpack plugin that generates html file 
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor',
      }),
     // service workder 
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    // manifest.json file
      new WebpackPwaManifest({
        finderprints: false,
        inject:true,
        name: 'Text Editor',
        short_name: 'Text',
        description: 'write notes',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            size: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
// CSS loaders and babel to webpack
    module: {
      rules: [
        {
          test: /\.css$/i,   
          use: ['style-loader', 'css-loader'], 
        },
       {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presents: ['@babel/present-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/transfrom-runtime',
            ],
          },
        },
       },   
      ],
    },
  };
};
