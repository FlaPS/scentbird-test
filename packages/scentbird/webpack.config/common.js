import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'


const basePath = (file) => path.resolve(__dirname, '../', file)

const webpackConfig = {

  entry: {
    app: [
        basePath('src/index.tsx')
    ]
  },

  output: {
    path: basePath('build'),
    filename: '[name].[hash:6].js',
    chunkFilename: '[id].[hash:6].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },

      {
        test: /.ts?$|.tsx?$/,
        exclude: /\.story\.tsx?$/,
          use: [
              /*
              {
                  loader: "babel-loader",
                  options: {
                      cacheDirectory: true,
                  }
               },
              */
              {
                loader:'ts-loader',
                options: {
                    allowTsInNodeModules: true,
                    transpileOnly: true
                }
              }
          ]
      }
    ],
  },

  resolve: {
    modules: [
      basePath('src'),
      'node_modules',
    ],
    extensions: [ '.scss', '.ts', '.tsx', '.js', '.jsx' ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Scentbird',
      template: basePath('src/index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
}


export default webpackConfig
