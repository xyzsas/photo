import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import axios from 'axios'

Vue.use(Croppa)
Vue.prototype.$ajax = axios.create({
  baseURL: 'https://sas.aauth.link/'
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
