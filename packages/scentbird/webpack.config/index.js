import base from './common'
import development from './development'
import production from './production'
console.log('config is ', base.module)

const appEnv = process.env.NODE_ENV || 'development'
let webpackConfig

if (appEnv !== 'development') {
  webpackConfig = production(base)
}
else {
  webpackConfig = development(base)
}


export default webpackConfig
