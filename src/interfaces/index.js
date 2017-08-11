import wepy from 'wepy'
import { api } from '../config'

const interfaces = {
  async getloginData () {
    const loginData = await wepy.login()
    return loginData
  },
  async getUserInfo () {
    const userinfo = await wepy.getUserInfo()
    return userinfo
  },
  async login () {
    let userinfoRaw = {}
    let userinfo = {}
    let logininfo = {}
    try {
      let logindata = await interfaces.getloginData()
      logininfo = await wepy.request({
        url: api.user.login.url,
        method: api.user.login.method,
        dataType: 'json',
        data: {
          'code': logindata.code
        }
      })
      if (!logininfo.data.data.wxinfo){
        userinfoRaw = await interfaces.getUserInfo()
        userinfo = await wepy.request({
          url: api.user.info.url,
          method: api.user.login.method,
          dataType: 'json',
          data: {
            'session_id': logininfo.data.data.session_id,
            'rawData': userinfoRaw.rawData,
            'iv': userinfoRaw.iv,
            'encryptedData': userinfoRaw.encryptedData,
            'signature': userinfoRaw.signature
          }
        })
        userinfo = userinfo.data.data.wxinfo
      } else {
        userinfo = logininfo.data.data.wxinfo
      }

      await wepy.setStorage({
        key: '_session',
        data: logininfo.data.data.session_id
      })

      await wepy.setStorage({
        key: 'userinfo',
        data: userinfo
      })
    } catch (e) {
      wepy.showModal({
        title: '提示',
        content: `获取用户信息失败，请关闭重新进入。${e.message}`
      })
    }
    return userinfo
  }
}

export default interfaces
