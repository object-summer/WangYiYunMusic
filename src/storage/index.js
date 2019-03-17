let local = {
  get: function (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  set: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove: function (key) {
    localStorage.removeItem(key)
  },
  clear: function (key) {
    localStorage.clear(key)
  }
}
let session = {
  get: function (key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  set: function (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove: function (key) {
    sessionStorage.removeItem(key)
  },
  clear: function () {
    sessionStorage.clear()
  }
}
// 基于SessionStorage
export {session as sessionStorage}
// 基于LocalStorage
export {local as localStorage}
