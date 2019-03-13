import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';

import cookie from '../utils/cookie';

import index from '../views/index';
import category from '../views/category';
import cart from '../views/cart';
import user from '../views/user';
import productList from '../views/productList';
import productDetails from '../views/productDetails';
import login from '../views/login';
import register from '../views/register';
import change from '../views/changePwd';
import center from '../views/center';
import siteAdd from '../views/siteChange';
import site from '../views/site';
import orderDetails from '../views/orderDetails';
import orderAll from '../views/orderAll';
Vue.use(Router);

const router = new Router({
        routes: [
                {path: '/', name: 'index', component: index},
                {path: '/index/floor/:id', name: 'indexFloor', component: productList},
                {path: '/category', name: 'category', component: category},
                {path: '/category/list/:id', name: 'categoryFloor', component: productList},
                {path: '/cart', name: 'cart', component: cart},
                {path: '/user', name: 'user', component: user},
                {path: '/user/login', name: 'login', component: login},
                {path: '/user/register', name: 'register', component: register},
                {path: '/user/change', name: 'change', component: change},
                {path: '/product/:id', name: 'product', component: productDetails},
                {path:'/center',name:'center',component:center},
                {path:'/site',name:'site',component:site},
                {path:'/site/change',name:'siteAdd',component:siteAdd},
                {path:'/order',name:'order',component:orderDetails},
                {path:'/order/all/:id',name:'orderAll',component:orderAll}
        ]
});

router.beforeEach((to,from,next)=>{
        let {fullPath} = to,reg=/^\/$|^\/index|^\/category|^\/user|^\/product/,
                reg2 = /\/user|\/cart/,{isLogin} = store.state;
        if(reg.test(fullPath))next();
        else{
                if(isLogin) next();                                                                               // 登陆直接next
                else{                                                                                                  //
                        let state = reg2.test(fullPath);
                        if(state) next();                                                                          // 用户页&购物车页 直接next()
                        else
                                store.dispatch('isLogin')                                                    // 未登录跳转至登录页
                                        .then(result=>{if(result)next(); else next('/user/login')})
                }
        }
});

export default router;
