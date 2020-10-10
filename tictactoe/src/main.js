import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Vue.component('tic-tac-toe', TicTacToe);
// Vue.component('cell', Cell);

new Vue({
  render: h => h(App),
}).$mount('#app')
