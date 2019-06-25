import Vue from 'vue'
import vuex from 'vuex'
import MainStore from '@/router/MainStore'
Vue.use(vuex)

export default new vuex.Store({
    state: {
        whetherShow:true,
        videoSrc:''
    },
    modules: {
        MainStore,
      }
})