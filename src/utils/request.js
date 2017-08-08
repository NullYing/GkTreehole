import wepy from 'wepy'
import interfaces from '../interfaces'

export default async function request (options) {
  if (options.header) {
    options.header['x-wechat-session'] = wepy.getStorageSync('_session')
  } else {
    options.header = {
      'x-wechat-session': wepy.getStorageSync('_session')
    }
  }

  let response = await wepy.request(options)

  if (response.statusCode === 401) {
    await interfaces.login()
    return await request(options)
  } else if (response.statusCode === 500) {
    wepy.showModal({
      title: '提示',
      content: `服务器错误，请截图本提示，发送到Q群：437249421。`
    })
  } else {
    if (response.statusCode === 200 && response.data.errorcode !== 0 && response.data.errorcode !== 404) {
      wepy.hideToast()
      wepy.showModal({
        title: '提示',
        content: response.data.errmsg,
        showCancel: false
      })
    }
    return response
  }
}
