const route = Object.create(null)
route.install = function (vue) {
  // 第一个字符串是 组件名，第二个是组件路径，第三个是包名(如果不指定则已1.js,2.js....n.js命名)
	vue.component('addEquip', (resolve) => {require.ensure([], ()=>resolve(require('@/src/components/addEquip.vue')), 'addEquip')})
	vue.component('faultInput', (resolve) => {require.ensure([], ()=>resolve(require('@/src/components/faultInput.vue')), 'faultInput')})
}


export default route
