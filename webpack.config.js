const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const I18nWebpackPlugin = require('i18n-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const i18n = require('./i18n/i18n.json')
const languages = {
  cn: {},
  en: {}
}
for (const key in i18n) {
  languages['cn'][key] = i18n[key]['cn']
  languages['en'][key] = i18n[key]['en']
}
const config = Object.keys(languages).map((language) => {
  return {
    entry: {
      'home': './src/page/home/home.js',
      'login': './src/page/login/login.js'
    },
    output: {
      path: path.resolve(__dirname ,'dist', language),
      filename: 'js/[name].js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000,
      open: false
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          loader: 'pug-loader',
          query: {
            pretty: true
          }
        },
        {
          test: /\.styl$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: ExtractTextPlugin.extract({
            // fallback: 'style-loader',
            use: 'css-loader!stylus-loader'
          })
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new I18nWebpackPlugin(languages[language]), 
      new ExtractTextPlugin({
        filename: '[name].css'
      }),
      new HtmlWebpackPlugin({
        template: './src/view/index.pug',
        locale: languages[language]
      })
    ]
  }
})

module.exports = config
