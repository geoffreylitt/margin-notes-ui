// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Essay from './Essay'
require('prismjs')

Vue.config.productionTip = false

let VueTruncate = require('vue-truncate-filter')
Vue.use(VueTruncate)

/* eslint-disable no-new */
new Vue({
  el: '#essay',
  components: { Essay },
  template: '<Essay/>'
})
