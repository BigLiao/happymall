const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const I18nWebpackPlugin = require('i18n-webpack-plugin')

const languages = {
	"en": null,
  "de": require("./i18n/de.json"),
  "cn": require("./i18n/cn.json")
};
module.exports = Object.keys(languages).map((language) => {
  return {
    entry: {
      'home': './src/page/home/home.js',
      'login': './src/page/login/login.js'
    },
    output: {
      path: path.resolve(__dirname ,'dist', language),
      filename: 'js/[name].js'
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
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new I18nWebpackPlugin(languages[language]),      
      new HtmlWebpackPlugin({
        template: './src/view/index.pug',
        locale: languages[language]
      })
    ]
  }
})