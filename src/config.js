const hostsfile = require('./hosts.js')
// ENV
const env = hostsfile.env

// WXAPP VERSION
const version = 1.0

// development and production host
const hosts = hostsfile.hosts

// apis
const api = {
  user: {
    login: {
      method: 'POST',
      url: '/user/wxlogin'
    },
    info: {
      method: 'POST',
      url: '/user/info'
    },
    blog: {
      method: 'POST',
      url: '/user/blog'
    }
  },
  blog: {
    list: {
      method: 'POST',
      url: '/blogs'
    },
    detail: {
      method: 'POST',
      url: '/blogs'
    },
    like: {
      method: 'POST',
      url: '/blogs/like'
    },
    delete: {
      method: 'POST',
      url: '/blogs/delete'
    },
    imageUpload: {
      method: 'POST',
      url: '/blogs/image'
    },
    new: {
      method: 'POST',
      url: '/blogs/new'
    },
    typeList: {
      method: 'GET',
      url: '/blogs/type/list'
    },
    comment: {
      method: 'POST',
      url: '/blogs/comments'
    },
    deleteComment: {
      method: 'DELETE',
      url: '/blogs/comments'
    },
    top: {
      method: 'POST',
      url: '/blogs/top'
    }
  },
  notifications: {
    count: {
      method: 'GET',
      url: '/notifications'
    },
    messages: {
      method: 'GET',
      url: '/notifications/messages'
    },
    read: {
      method: 'PUT',
      url: '/notifications'
    }
  },
  ads: {
    method: 'GET',
    url: '/ads'
  },
  configs: {
    method: 'GET',
    url: '/configs'
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
