// import Vue from "vue";

const route = Object.create(null)
route.install = function (vue) {
	// 第一个字符串是 组件名，第二个是组件路径，第三个是包名(如果不指定则已1.js,2.js....n.js命名)
	vue.component('home', (resolve) => {require.ensure([], ()=>resolve(require('@/components/index.vue')), 'index')})
	vue.component('search1', (resolve) => {require.ensure([], ()=>resolve(require('@/components/search1.vue')), 'search1')})
	vue.component('addEquip1', (resolve) => {require.ensure([], ()=>resolve(require('../../src/components/addEquip1.vue')), 'addEquip1')})
	vue.component('analysis', (resolve) => {require.ensure([], ()=>resolve(require('../../src/components/analysis.vue')), 'analysis')})
	vue.component('faultInput', (resolve) => {require.ensure([], ()=>resolve(require('../../src/components/analysis.vue')), 'faultInput')})
	vue.component('fault', (resolve) => {require.ensure([], ()=>resolve(require('../../src/components/analysis.vue')), 'fault')})
	vue.component('userManage', (resolve) => {require.ensure([], ()=>resolve(require('../../src/components/analysis.vue')), 'userManage')})
}


export default route