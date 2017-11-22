const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')

const routers = router
  .get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
  .get('/user/list', userInfoController.getUserList)
  .post('/user/register', userInfoController.register)
  .post('/user/login', userInfoController.signIn)
  .post('/user/update', userInfoController.update)


module.exports = routers
