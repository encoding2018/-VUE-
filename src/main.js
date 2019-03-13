import Vue from 'vue';
import App from './App';
import router from './router';

import store from './store'
import alter from './utils/alert';
import http from './utils/http';
import cookie from './utils/cookie';

Vue.prototype.$cookie = cookie;
Vue.prototype.$alert = alter;
Vue.prototype.$http = http;

import './assets/css/template.css';
import './assets/css/reset.css';
import './assets/js/template';
import './assets/libs/webappREM';

Vue.config.productionTip = false;
Vue.directive('unwrap', {
        bind: function(el, binding){
                el.setAttribute("data-luozz", binding.arg);
                el.onclick = function(){
                        document.querySelector("[data-luozz='" + binding.arg + "']").parentNode.remove();
                }
        }
});
new Vue({
        el: '#app',
        router,
        store,
        components: {App},
        template: '<App/>'
});
