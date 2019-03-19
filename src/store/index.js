import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
    state: {
        numId: '1',
        systemInfoU: [],
        systemInfoD: [],
        systemId: '1',
        locationId: '1',
        position: '',
        pageCount: '1',
        totalPage: "",
        charaPara: [],
        pageIndex: '1',
        totalCount: "",
        listPara: [],
        slidersArr: []
    }
})