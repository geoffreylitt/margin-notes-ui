// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Essay from './Essay'
import BostonRBDemo from './BostonRBDemo'
require('prismjs')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#essay',
  components: { BostonRBDemo },
  template: '<BostonRBDemo/>'
})
