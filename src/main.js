import Vue from 'vue'
import App from './App'
import SkillNode from './components/SkillNode.vue'

Vue.config.productionTip = false

Vue.component('SkillNode', SkillNode)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
