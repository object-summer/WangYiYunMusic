import Vue from 'Vue'
import LoginModal from './login'

let LoginModalComponent = Vue.extend(LoginModal)

export default function () {
  let vm = new LoginModalComponent()
  vm.$mount
  document.body.appendChild(vm.$el)
  return vm.open()
}
