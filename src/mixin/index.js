import loginModal from '../components/loginModal'
const mixins = {
  methods: {
    openLoginModal() {
      return loginModal()
    }
  }
}
export {mixins}
