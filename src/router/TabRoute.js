// import Vue from "vue";

const route = Object.create(null)
route.install = function (vue) {
	// 第一个字符串是 组件名，第二个是组件路径，第三个是包名(如果不指定则已1.js,2.js....n.js命名)
	vue.component('home', (resolve) => {require.ensure([], ()=>resolve(require('@/components/newVue/index.vue')), 'index')})
	vue.component('search', (resolve) => {require.ensure([], ()=>resolve(require('@/components/newVue/search.vue')), 'search')})
	vue.component('mountings', (resolve) => {require.ensure([], ()=>resolve(require('@/components/newVue/mountings.vue')), 'mountings')})
	vue.component('addEquip', (resolve) => {require.ensure([], ()=>resolve(require('@/components/newVue/addEquip.vue')), 'addEquip')})
	vue.component('analysis', (resolve) => {require.ensure([], ()=>resolve(require('@/components/newVue/analysis.vue')), 'analysis')})
	vue.component('faultInput', (resolve) => {require.ensure([], ()=>resolve(require('@/components/newVue/faultInput.vue')), 'faultInput')})
	vue.component('fault', (resolve) => {require.ensure([], ()=>resolve(require('@/components/newVue/fault.vue')), 'fault')})
	vue.component('userManage', (resolve) => {require.ensure([], ()=>resolve(require('@/components/newVue/userManage.vue')), 'userManage')})
}


export default route