import Vue from 'vue'
import App from './App.vue'
import SkillNode from './components/SkillNode.vue'

import api from './api'

Vue.config.productionTip = false

Vue.component('SkillNode', SkillNode);

new Vue({
  render: h => h(App)
}).$mount('#app')
