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
// 基于LocalStorage
export default local
