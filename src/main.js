// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import store from './store'

import "babel-polyfill"

import qs from 'qs';
Vue.prototype.$qs = qs;

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import header from './components/public/header'
import navMenu from './components/public/navMenu'

 

Vue.config.productionTip = false

import {
    faPlay,
    faPause,
    faStop,
    faVolumeUp,
    faVolumeMute,
    faExpand,
} from '@fortawesome/free-solid-svg-icons'
library.add(
    faPlay,
    faPause,
    faStop,
    faVolumeUp,
    faVolumeMute,
    faExpand,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vHead', header);
Vue.component('vNavMenu', navMenu);


Vue.use(ElementUI)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
