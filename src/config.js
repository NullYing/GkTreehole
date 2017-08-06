// ENV
const env = 'development' // 'development' or 'production'

// WXAPP VERSION
const version = 1.0

// development and production host
const hosts = {
  development: 'https://dev.gxgk.cc',
  production: 'https://shudong.gxgk.cc'
}

// apis
const api = {
  user: {
    /**
     * login api
     * need header:
     * {
     *   'x-wechat-code': code,
     *   'x-wechat-encrypted': encryptedData,
     *   'x-wechat-iv': iv
     * }
     */
    login: {
      method: 'POST',
      url: '/shudong/user/wxlogin'
    },
    info: {
      method: 'POST',
      url: '/shudong/user/info'
    },
    blog: {
      method: 'GET',
      url: '/v2/user'
    }
  },
  blog: {
    list: {
      method: 'GET',
      url: '/shudong/blogs'
    },
    detail: {
      method: 'GET',
      url: '/shudong/blogs'
    },
    like: {
      method: 'POST',
      url: '/blog/like'
    },
    delete: {
      method: 'POST',
      url: '/blog/delete'
    },
    imageUpload: {
      method: 'POST',
      url: '/blog/image'
    },
    new: {
      method: 'POST',
      url: '/v2/blogs'
    },
    comment: {
      method: 'POST',
      url: '/v2/comments'
    },
    deleteComment: {
      method: 'DELETE',
      url: '/v2/comments'
    }
  },
  notifications: {
    count: {
      method: 'GET',
      url: '/shudong/notifications'
    },
    messages: {
      method: 'GET',
      url: '/shudong/notifications/messages'
    },
    read: {
      method: 'PUT',
      url: '/shudong/notifications'
    }
  },
  ads: {
    method: 'GET',
    url: '/shudong/ads'
  },
  configs: {
    method: 'GET',
    url: '/shudong/configs'
  }
}

module.exports = {
  env,
  version,
  api: disposeUrl(api, hosts[env])
}

function disposeUrl (obj, prefix) {
  Object.keys(obj).forEach(v => {
    if (obj[v].url) {
      obj[v].url = prefix + obj[v].url
    } else {
      obj[v] = disposeUrl(obj[v], prefix)
    }
  })

  return obj
}
