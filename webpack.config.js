const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    host: '0.0.0.0',
    hot: true,
    port: 8080,
    contentBase: './dist',
    stats: 'minimal'
  },
  devtool: 'source-map',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      components: path.join(__dirname, 'src', 'components'),
      model: path.join(__dirname, 'src', 'model')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot|png|gif|ico|svg)$/,
        use: [{ loader: 'file-loader', options: { name: '[name].[hash:5].[ext]' } }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      template: path.join(__dirname, 'src', 'index.html')
    })
  ]
};
