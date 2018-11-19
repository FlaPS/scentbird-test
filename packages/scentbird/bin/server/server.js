import webpack from 'webpack'
import express from 'express'
import bodyParser from 'body-parser'
import historyApiFallback from 'connect-history-api-fallback'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../webpack.config'
import path from 'path'

const port      = 5100
const app       = express()
const compiler  = webpack(webpackConfig)
const assetsBase = path.join(__dirname, '../',  '../', 'assets/')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(historyApiFallback())
app.use(webpackMiddleware(compiler,
    {
        logLevel: 'debug',
        serverSideRender: false
    }
))
app.use(express.static(assetsBase))


app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})
