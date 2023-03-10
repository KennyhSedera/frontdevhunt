import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {sync} from 'vuex-router-sync'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/index'
import Axios from 'axios'
import VueSocketIO from 'vue-socket.io'

import SocketIo  from 'socket.io-client';

Vue.config.productionTip = false

const SocketInstance = SocketIo('//localhost:3030')

Axios.defaults.headers.common['Authorization'] =`Bearer ${store.state.token}`

sync(store, router)

Vue.use(new VueSocketIO({
  debug:true,
  connection:SocketInstance

}))


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
