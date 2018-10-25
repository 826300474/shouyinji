import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import filters from './filters'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

import Api from './api/index.js';
Vue.prototype.$api = Api;

import Com from './api/com.js';
Vue.prototype.$comjs = Com;

import Locs from './api/locs.js';
Vue.prototype.$locs = Locs;

let Base64 = require('js-base64').Base64;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.directive('focus', function (el, option) {
    var defClass = 'el-input',
        defTag = 'input';
    var value = option.value || true;
    if (typeof value === 'boolean')
        value = {
            cls: defClass,
            tag: defTag,
            foc: value
        };
    else
        value = {
            cls: value.cls || defClass,
            tag: value.tag || defTag,
            foc: value.foc || false
        };
    if (el.classList.contains(value.cls) && value.foc)
        el.getElementsByTagName(value.tag)[0].focus();
});

Vue.prototype.$bus = new Vue()

/* eslint-disable no-new */
new Vue({
    components: {
        App
    },
    router,
    store,
    template: '<App/>'
}).$mount('#app')