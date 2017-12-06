const userModel = require('./../models/user-info')

const user = {
  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */

   async create( user ) {
     let result = await userModel.create(user)
     return result
   },
   async getAllUser (type) {
     if (type) {
       let resultData = userModel.getFilterByType(type)
       return resultData
     }
     let resultData = userModel.getAll()
     return resultData
   },
   /**
    * 查找存在用户信息
    * @param  {object} formData 查找的表单数据
    * @return {object|null}      查找结果
    */
   async getExistOne( formData ) {
     let resultData = await userModel.getExistOne({
       'password': formData.password,
       'username': formData.username
     })
     return resultData
   },


      /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
    async signIn( formData ) {
      let resultData = await userModel.getOneByUserNameAndPassword({
        'password': formData.password,
        'username': formData.username
      })
      
      return resultData
    },


  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
    async getUserInfoByUserName( userName ) {

      let resultData = await userModel.getUserInfoByUserName( userName ) || {}
      return resultData
    },

    async updateById(id,data) {
      let resultData = await userModel.updateById(id, {
        avatar:data.avatar,
        company:data.company,
        desc:data.desc,
        money:data.money,
        title:data.title
      })
      return resultData
    },
    async getInfoById(id) {
      let resultData = await userModel.getInfoById(id)
      return resultData
    }
}

module.exports = user
