const userInfoService = require('../services/user-info')
// const userCode = require('../codes/user')
const utils = require('utility')
function pwdMd5(pwd) {
  let salt = 'oe1@)123!NLNKH/?;1;1__2_(@4)' + pwd
  return utils.md5(utils.md5(salt))
}

module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn( ctx ) {
    let formData = ctx.request.body
    let result = {
      success: false,
      msg: '',
      data: {
        type:'',
        avatar:'',
        username:''
      },
      code: '',
      status:''
    }
    formData.password = pwdMd5(formData.password)
    let userResult = await userInfoService.signIn( formData )
    console.log(userResult)
    if ( userResult ) {
      if ( formData.username === userResult.username ) {
        result.success = true
        result.data.avatar = userResult.avatar
        result.data.type = userResult.type
        result.data.username = userResult.username
      }
    } else {
      result.status = 404
      result.msg="用户名或密码错误！"
      ctx.body = result
    }

    if ( result.success === true ) {
      let session = ctx.session
      session.isAuth = true
      session.username = userResult.username
      session.type = userResult.type
      session.id = userResult.id
      result.status = 200
      ctx.body = result
    }
    return
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async register( ctx ) {
    let formData = ctx.request.body
    const {password,...data} = formData
    console.log(formData)
    let result = {
      success: false,
      msg: '',
      data: null,
      status:''
    }
    formData.password = pwdMd5(formData.password)
    let existOne  = await userInfoService.getExistOne(formData)
    if ( existOne  ) {
      result.msg = '用户名已经存在'
      result.status = 404
      result.success = false
      ctx.body = result
      return
    }

    let userResult = await userInfoService.create({
      password: formData.password,
      username: formData.username,
      type: formData.type,
      // create_time:t
    })
    console.log( userResult )

    if ( userResult && userResult.insertId * 1 > 0) {
      result.status = 200
      result.success = true
      ctx.session.id = userResult.insertId
      ctx.session.isAuth = true
      ctx.session.type = formData.type
    } else {
      result.msg = 'error'
    }
    console.log('我是session',ctx.session)
    result.data = data
    result.data.avatar = null
    ctx.body = result
    return
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo( ctx ) {
    let session = ctx.session
    let isLogin = session.isLogin
    let username = session.username

    let result = {
      success: false,
      msg: '',
      data: null,
    }
    if ( isLogin === true && username ) {
      let userInfo = await userInfoService.getUserInfoByUserName( username )
      if ( userInfo ) {
        result.data = userInfo
        result.success = true
      } else {
        result.msg = `FAIL_USER_NO_LOGIN`
      }
    } else {
      // TODO
    }

    ctx.body = result
  },
  async update( ctx ) {
    let data = ctx.request.body
    let result = {
      success:false,
      status:'',
      msg:'',
      data:{}
    }
    let session = ctx.session
    console.log(session)
    if (session.isAuth && session.id) {
      let resultData = await userInfoService.updateById(session.id,data)
        result.success=true
        result.status=200
        result.data=data
        result.data.type=ctx.session.type
        ctx.body = result
        return
    }
    result.success=false,
    result.msg='登录过期'
    result.status=404
    ctx.body = result
    return
  },
  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin( ctx ) {
    let result = {
      success: false,
      msg: `userCode.FAIL_USER_NO_LOGIN`,
      data: null,
      code: 'FAIL_USER_NO_LOGIN',
    }
    let session = ctx.session
    if( session && session.isAuth === true  ) {
      result.success = true
      result.msg = ''
      result.code = ''
    }
    return result
  },
  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getUserList ( ctx ) {
    let result = {
      success: false,
      msg: '',
      data: null,
    }
    let data = await userInfoService.getAllUser();
    console.log('my data',data)
    result.data = data
    result.success=true
    ctx.body = result
  }


}
