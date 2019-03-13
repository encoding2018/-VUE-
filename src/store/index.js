import Vue from 'vue';
import Vuex from 'vuex';
import store from './index';

import api from '../utils/api';
import $http from '../utils/http';

import template from './template';
import home from './home';
import category from './category';
import product from './product';
import cart from './cart';
import site from './site';
import order from './order';

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
                api,
                $http,
                isLogin:false,
                username:'',
                isInit:true,
        },
        getters: {},
        mutations: {
                _changeLoginState(state,payload){
                        let {username} = payload;
                        state.isLogin = payload.state;
                        state.username = state.isLogin ? `+86 ${username.slice(0,4)}****${username.slice(7,11)}` : '登录/注册'
                },
                changeInitState(state,payload){
                        state.isInit = payload;
                },
                openAllInit(state){
                        state.isInit = true;
                        store.commit('cart/changeInitState',true);
                        store.commit('order/changeInitState',true);
                        store.commit('site/changeInitState',true);
                }
        },
        actions: {
                isLogin({state,commit}){
                        if(!state.isInit) return;                                               //已登录不需要发送验证信息
                        return state.$http.post(state.api.user.ACCOUNT)
                                .then(({ok,username})=>{
                                        commit('_changeLoginState',{state:ok,username});
                                        commit('changeInitState',false);
                                        return ok;
                                });
                }
        },
        modules: {
                template,
                home,
                category,
                product,
                cart,
                site,
                order
        }
});