import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VuePapaParse from "vue-papa-parse";
import Vuex from "vuex";
import { store } from "./store";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VuePapaParse);

new Vue({
  vuetify,
  store,
  VuePapaParse,
  render: (h) => h(App),
}).$mount("#app");
