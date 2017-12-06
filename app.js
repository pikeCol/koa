const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const logger = require('koa-logger')
const path = require('path')
// const renders = require('koa-ejs')

const config = require('./config')

const index = require('./routes/index')


onerror(app)

const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }))

// renders(app, {
//   root: path.join(__dirname, 'views'),
//   layout: false,
//   views: 'html',
//   cache: false,
//   debug: true
// })

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))
// routes
app.use(index.routes(), index.allowedMethods())

module.exports = app
