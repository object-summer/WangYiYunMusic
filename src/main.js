// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// axios
import axios from 'axios'
import {mixins} from './mixin/index.js'
// vuex
import Vuex from 'vuex'
import store from './store'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 路由
import router from './router'

// template and css

import App from './App'
import './css/main.styl'
// 混入路由跳转
import routerMixin from './router/mixin'
import 'amfe-flexible'
import './utils/flex'
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.mixin(routerMixin)

// 组件集合
Vue.mixin(mixins)
// Vue.mixin({
//   computed: {
//     thirdParty () {
//       return !!store.state.thirdParty
//     },
//     loggedIn () {
//       return !!store.state.auth
//     },
//     userInfo () {
//       return store.state.userInfo || {}
//     },
//     memberAccount () {
//       return store.state.memberAccount || {}
//     },
//     userImage () {
//       return store.getters.userImage
//     },
//     inElectron () {
//       return inElectron
//     }
//   },
//   methods: {
//     // 下载客户端 0 pc 1 android 2 ios 3 app
//     downloadClient (idx) {
//       switch (idx) {
//         case 0:
//           window.open(this.Config.PC_DOWNLOAD_URL)
//           break
//         case 1:
//           window.open(this.Config.ANDROID_APP_URL)
//           break
//         case 2:
//           window.open(this.Config.IOS_APP_URL)
//           break
//         case 3:
//           window.open(this.Config.APP_DOWNLOAD_URL)
//           break
//       }
//     },
//     getEncodeURI (url) {
//       return encodeURI(url)
//     },
//     getPlainName (name) {
//       return name && (name + '').replace(/\$\$/g, ' ') || ''
//     },
//     getAllBrands () {
//       return new Promise((resolve, reject) => {
//         if (store.state.brands && store.state.brands.length > 0) {
//           resolve(store.state.brands)
//         } else {
//           if (getAllBrandsResolveStack.length === 0) {
//             let brands
//             this.Service.call('common/brand/all', 'GET').then(data => {
//               store.commit('setBrands', data)
//               brands = data || []
//             })['finally'](() => {
//               _.forEach(getAllBrandsResolveStack, e => {
//                 e(brands)
//               })
//               getAllBrandsResolveStack = []
//             })
//           }
//           getAllBrandsResolveStack.push(resolve)
//         }
//       })
//     },
//     getBrandName (code) {
//       return new Promise((resolve, reject) => {
//         this.getAllBrands().then(brands => {
//           for (let brand of brands) {
//             if (brand.brandCode === code) {
//               resolve(brand.brandName)
//               return
//             }
//           }
//           reject(new Error())
//         })
//       })
//     },
//     getBrandIcon (code) {
//       return new Promise((resolve, reject) => {
//         this.getAllBrands().then(brands => {
//           for (let brand of brands) {
//             if (brand.brandCode === code) {
//               resolve(brand.iconUrl ? store.state.baseImageUrlPrefix + brand.iconUrl : null)
//               return
//             }
//           }
//           reject(new Error())
//         })
//       })
//     },
//     // 返回Promise, notReturn 表示登录后不返回当前页面
//     checkLogin (redirect, notReturn) {
//       redirect = true
//       return new Promise((resolve, reject) => {
//         if (!this.loggedIn) {
//           if (!redirect) {
//             this.openLoginModal().then(() => {
//               resolve(true)
//             }, () => {
//               reject(new Error())
//             })
//           } else {
//             this.routeTo(notReturn ? '/login' : {path: '/login', query: {backUrl: this.$route.fullPath}})
//             reject(new Error())
//           }
//         } else {
//           resolve(true)
//         }
//       })
//     },
//     confirmModal (title, text, btnTextList, defaultBtnIdx, options) {
//       return confirmModal.apply(this, arguments)
//     },
//     // 询问是否购买进价服务
//     askForPriceService () {
//       return confirmModal('进价查看提示', '您还未购买 <b>进价查看服务</b>, 是否前往购买?', ['取消', '去看看']).then(rst => {
//         if (rst === 1) {
//           router.push('/usercenter/buyservice?type=6')
//         }
//       })
//     },
//     // 返回Promise
//     openLoginModal () {
//       return loginModal()
//     },
//     getImageUrl (url, hasDefault, maxHeight) {
//       if (url) {
//         url = encodeURI(url)
//         if (url.indexOf('cdn') > -1 || url.indexOf('aliyuncs') > -1) {
//           if (maxHeight) {
//             return Utils.isSupportWebP() ? `${url}?x-oss-process=style/thum_webp_h400` : `${url}?x-oss-process=style/thum_png_h400`
//           } else {
//             return `${url}`
//           }
//         } else {
//           if (maxHeight) {
//             return `${url}?imageMogr2/auto-orient/thumbnail/x${maxHeight}/format/jpg/blur/1x0/quality/100|imageslim`
//           } else if ((_.endsWith(url, '.tif') || _.endsWith(url, '.TIF'))) {
//             return url + '?imageView2/0/format/png/q/100|imageslim'
//           }
//         }
//       }
//       return url || null
//     },
//     // 打开车型查询界面
//     openVinModelPartsSearchPage () {
//       vinModelPartsSearchPage.apply(this, arguments)
//     },
//     // 打开客服详情界面
//     openKefuModal () {
//       store.commit('setImVisible', true)
//     },
//     // 打开零件详情界面
//     openPartsDetail (source, partIdOrPart, brandCode, mainGroupId, subGroupId, selectorId, partCode, marketCode, addSCCallback) {
//       // let type = this.localStorage.get('PartDetailViewType')
//       // let method = type ? partsDetailView : partsDetailModal
//       // partsDetailModal.apply(this, arguments)
//       switchTabsModal('零件详情', ModelTabsPartsDetail, {source, partIdOrPart, brandCode, mainGroupId, subGroupId, selectorId, partCode, marketCode, addSCCallback})
//     },
//     //
//     // 打开配件详情界面
//     openOnlyPartsDetail (partsDetail, currentParts, columns) {
//       return OnlyPartsDetailModal(partsDetail, currentParts, columns)
//     },
//     // 打开品牌件详情界面
//     openPartsBrandsDetail (brandPart) {
//       switchTabsModal('品牌件详情', ModelTabsBrandPartsDetail, {brandPart})
//     },
//     // 打开零件适用车型组图查看
//     openPartsModelPictures (title, hotpoints) {
//       return partsModelPictures(title, hotpoints)
//     },
//     // 打开邀请用户界面
//     openInviteModal () {
//       return inviteModal()
//     },
//     // 打开分享界面
//     openShareUrlModel (shareUrl) {
//       return shareUrlModal(shareUrl)
//     },
//     // 打开积分兑换界面
//     openExchangeModal () {
//       return exchangeModal()
//     },
//     // 打开更多品牌
//     openMoreBrandModal () {
//       return moreBrandModal()
//     },
//     // 打开通知界面
//     openNotificationModal () {
//       return notificationModal()
//     },
//     // 打开积分规则介绍页面
//     openIndexPointRuleModal () {
//       return pointRuleModal()
//     },
//     openGuideLayerModal () {
//       return guideLayerModal()
//     },
//     // 打开开票详情界面
//     openInvoiceDetailModal (data) {
//       return invoiceDetailModal(data)
//     },
//     openInvoiceEnsureModal (data) {
//       return invoiceEnsureModal(data)
//     },
//     // 打开意见反馈界面
//     openFeedbackModal () {
//       return feedbackModal()
//     },
//     // 打开用户注册协议界面
//     openRegisterRuleModal () {
//       return registerRuleModal()
//     },
//     // 打开隐私政策界面
//     openPrivacyRuleModal () {
//       return privacyRuleModal()
//     },
//     // 打开下载客户端界面
//     openDownloadModal () {
//       return downloadModal()
//     },
//     // 打开VIN选择对话框
//     openVinSelectionModal (multiModel) {
//       return vinSelectionModal(multiModel)
//     },
//     // 打开图片查看对话框
//     checkPictureModal (url, title) {
//       return checkPictureModal(url, title)
//     },
//     // 打开VIN车型配置对话框
//     checkModelAttributesModal (features) {
//       return checkModelAttributesModal(features)
//     },
//     // 打开品牌件模块中选择品牌筛选条件的对话框
//     openBrandPartsFilterSelectModal (title, list, item) {
//       return brandPartsFilterSelectModal.apply(this, arguments)
//     },
//     checkVinCached (queryInRoute) {
//       let vd = store.state.vinDetail
//       if (!vd || vd.vin !== queryInRoute.vin) return false
//       for (let key in vd._params) {
//         if (vd._params.hasOwnProperty(key) && vd._params[key] !== queryInRoute[key]) return false
//       }
//       return true
//     },
//     printPreviewModal (cont) {
//       return printPreviewModal.apply(this, arguments)
//     },
//     reloadShoppingCartCount,
//     addPartToShoppingCart,
//     // 播放添加零件到零件清单的动画
//     addToShoppingCart (dom, part, source, count) {
//       let doAdd = () => {
//         if (dom && dom.getBoundingClientRect) {
//           let rect = dom.getBoundingClientRect()
//           let iconDom = document.createElement('div')
//           let iconSize = 20
//           iconDom.className = 'add-cart-icon'
//           iconDom.innerHTML = '<i class="qpzs-icon-tianjia"></i>'
//           iconDom.style.width = `${iconSize}px`
//           iconDom.style.height = `${iconSize}px`
//           let top01 = rect.top - (rect.height - iconSize) / 2
//           let right01 = document.body.clientWidth - rect.right
//           iconDom.style.right = `${right01}px`
//           iconDom.style.top = `${top01}px`
//           document.body.appendChild(iconDom)
//           let tTop = 0
//           let tRight = 140
//           Velocity(iconDom, {
//             right: `${tRight}px`
//           }, {
//             duration: 500,
//             easing: 'ease-in'
//           })
//           Velocity(iconDom, {
//             top: `${tTop}px`
//           }, {
//             duration: 500,
//             easing: 'ease-out',
//             queue: false,
//             complete () {
//               addPartToShoppingCart(part, source, count)['finally'](() => {
//                 reloadShoppingCartCount()
//               })
//               Velocity(iconDom, {
//                 scale: 0
//               }, {
//                 duration: 200,
//                 queue: false,
//                 easing: 'linear',
//                 complete () {
//                   document.body.removeChild(iconDom)
//                 }
//               })
//             }
//           })
//         }
//       }
//       if (!source && part.brandCode) {
//         this.getBrandName(part.brandCode).then(name => {
//           doAdd(dom, part, name, count)
//         }, () => {
//           doAdd(dom, part, '', count)
//         })
//       } else {
//         doAdd(dom, part, source, count)
//       }
//     },
//     // 打开新窗口
//     openNewWin (href) {
//       if (this.inElectron) {
//         try {
//           let electron = window.require('electron')
//           let remote = electron.remote
//           remote.getGlobal('sharedObj').electron = {auth: store.state.auth}
//           const BrowserWindow = remote.BrowserWindow
//           let win = new BrowserWindow({
//             minWidth: 1024,
//             minHeight: 800,
//             frame: true,
//             titleBarStyle: 'hidden',
//             modal: true,
//             parent: remote.getCurrentWindow(),
//             webPreferences: {
//               allowRunningInsecureContent: true
//             }
//           })
//           // win.webContents.openDevTools()
//           win.maximize()
//           win.loadURL(window.location.origin + href)
//         } catch (e) {}
//       } else {
//         window.open(href)
//       }
//     },
//
//     // 没有VIN解析权限时的操作对话框
//     permissionNeededVinSearch () {
//       this.$nextTick(() => {
//         if (this.thirdParty) {
//           this.confirmModal('VIN解析失败', '您暂时无法进行VIN解析', ['知道了'])['finally'](() => {
//             this.routeReplace('/vin')
//           })
//         } else {
//           this.confirmModal('VIN解析次数不足', '您暂时还没有VIN解析查询权限 <br>您可选择<b>积分兑换VIN解析次数</b>或<b>购买VIN解析服务</b>继续查询', [`积分兑换(${this.memberAccount.score})`, '购买服务']).then(index => {
//             if (index === 1) {
//               this.routeTo({path: '/usercenter/buyservice'})
//             } else if (index === 0) {
//               this.routeTo({path: '/usercenter/bonuspoints'})
//             }
//           }, () => {
//             this.routeReplace('/vin')
//           })
//         }
//       })
//     },
//     // 零件查询次数不足提示
//     extendPartsSearchTimes () {
//       if (this.thirdParty) {
//         this.confirmModal('零件查询失败', '零件查询次数已达上限!', ['知道了'])
//       } else {
//         this.confirmModal('零件查询次数已达上限', '零件查询的次数已不足<br>您可以购买<b style="margin: 0 4px;">[零件查询扩展包]</b>以继续使用此功能', ['取消', '去看看']).then(index => {
//           if (index === 1) {
//             this.routeTo({path: '/usercenter/buyservice', query: {type: 7}})
//           }
//         })
//       }
//     },
//     // 品牌件没有权限
//     permissionNeededBrandsSearch () {
//       this.$nextTick(() => {
//         if (this.thirdParty) {
//           this.confirmModal('品牌件查询失败', '您暂无品牌件查询权限', ['知道了'])
//         } else {
//           this.confirmModal('品牌件查询无权限', '您暂无品牌件查询权限<br>您可以购买<b style="margin: 0 4px;">[品牌件查询服务]</b>以查看品牌件信息', ['取消', '去看看']).then(index => {
//             if (index === 1) {
//               this.routeTo({path: '/usercenter/buyservice', query: {type: 8}})
//             }
//           })
//         }
//       })
//     }
//   }
// })
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.config.devtools = true
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
