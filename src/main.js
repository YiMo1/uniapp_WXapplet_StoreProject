import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import uView from "uview-ui";
import myRequest from './utils/api.js';

Vue.use(uView);
Vue.prototype.$myRequest = myRequest;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
