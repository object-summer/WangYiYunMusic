import Vue from 'vue'
import LoginModal from './login'
import router from '../../router/index'
let LoginModalComponent = Vue.extend({
  components: {LoginModal},
  template: '<LoginModal/>',
  router
})
export default function () {
  let vm = new LoginModalComponent()
  vm.$mount()
  document.body.appendChild(vm.$el)
  let modal = vm.$children[0]
  return modal.open.apply(modal, arguments)
}
