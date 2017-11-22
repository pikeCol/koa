const dbUtils = require('./../utils/db-util')
const user = {
  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create ( model ) {
    let result = await dbUtils.insertData( 'user', model )
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options ) {
    let _sql = `
    SELECT * from user
      where username="${options.username}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
  async getAll() {
    let _sql = `SELECT * from user`;
    let result = await dbUtils.query( _sql )
    return result
  },
  async updateById(id,data) {
    let _sql =`
      UPDATE user SET avatar="${data.avatar}" WHERE id="${id}";
    `
    let result = await dbUtils.query( _sql )
    return result
  },
  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword( options ) {
    let _sql = `
    SELECT * from user
      where password="${options.password}" and username="${options.username}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },




}


module.exports = user
