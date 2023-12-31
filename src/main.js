import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { TOASTCONFIG } from "./constants/toastConfig";
import Flutterwave from "flutterwave-vue-v3";
import { db } from "./services/Firebase/firebase";

Vue.config.productionTip = false;

Vue.use(Toast, TOASTCONFIG);
Vue.use(Flutterwave, { publicKey: process.env.VUE_APP_FLUTTERWAVE_KEY });


new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export { db };
