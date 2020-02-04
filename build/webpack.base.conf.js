const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin} = require('vue-loader')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'www/'
}
module.exports = {
  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }, 
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [ 
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true}
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: {path: 'postcss.config.js'}}
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true}
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true}
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: {path: 'postcss.config.js'}}
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true}
          }
        ]
      }
    ]
  },
  devServer: {
    overlay: true // Вывод ошибок
  },
  resolve: {
    alias: {
      '~': PATHS.src,
      '@': PATHS.src,
      'vue$': 'vue/dist/vue.js'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:  `${PATHS.assets}css/[name].[hash].css`
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`},
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`}
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/www/index.html`,
      filename: './index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/www/screen-3.html`,
      filename: './screen-3.html',
      inject: true
    }),
    // new FaviconsWebpackPlugin({
    //   logo: `${PATHS.src}/static/favicon.png`,
    //   outputPath: '/static/favicons',
    //   cache: false,
    //   prefix: 'static/favicons',
    //   mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
    //   devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default 
    //   favicons: {
    //     appName: 'My Site',
    //     appDescription: 'My awesome App',
    //     developerName: 'Alexander',
    //     developerURL: null, // prevent retrieving from the nearest package.json
    //     background: '#ddd',
    //     theme_color: '#333',
    //     icons: {
    //       coast: false,
    //       yandex: false
    //     }
    //   }
    // })
  ]
}