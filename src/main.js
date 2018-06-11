import Vue from 'vue'
import App from './App'
import SkillNode from './components/SkillNode.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
