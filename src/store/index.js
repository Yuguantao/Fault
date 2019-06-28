import Vue from 'vue'
import vuex from 'vuex'
import MainStore from '@/router/MainStore'
Vue.use(vuex)

export default new vuex.Store({
    state: {
        whetherShow:true,
        videoSrc:'',
        changeColorFlag:true,
        setColorFlag:false
    },
    modules: {
        MainStore,
      },
    getters: {
    // 获取 当前显示的 tab name
        setColorFlag (state) {
            state.setColorFlag = state
        }
    }
})