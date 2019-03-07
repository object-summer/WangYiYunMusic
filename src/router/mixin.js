import router from './index'

export default {
  methods: {
    routeTo (location) {
      router.push(location)
    },
    routeReplace (location) {
      router.replace(location)
    },
    routeBack (idx) {
      router.go(idx || -1)
    }
  }
}
