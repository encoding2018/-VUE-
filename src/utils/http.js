import axios from 'axios';
import $alert from './alert';
import store from '../store';

let http = {},
        contentTypes = {get: 'application/x-www-form-urlencoded', post: 'application/json'},
        alwaysPendingPromise = new Promise(() => {}); // 一个永远是挂起状态的promise

axios.interceptors.request.use( //请求拦截器
        config => {return config;},
        error => {return Promise.reject(error);}
);
axios.interceptors.response.use( //响应拦截器
        result => {return result.data;},
        error => {return Promise.reject(error);}
);

['get', 'post'].forEach(item => {
        http[item] = (url, params) => {
                params = item === 'get'?{params: params}:{data: params};
                let config = {
                        withCredentials:true,   //是否携带cookie数据
                        timeout: 5000,             // axios发送ajax后最长等待时间
                        headers: {'Content-Type': contentTypes[item]},
                        method: item === 'get'?item:'post',
                        url,
                        ...params,
                };
                return axios(config)
                        .then(({status, message, data}) => {
                                if(message) alert(message);
                                switch(status){
                                        case 200:                       // 成功
                                                return data;
                                        case 401:                       // 未登录
                                                $alert.info('登录已过期，请重新登陆');
                                                store.commit('openAllInit');
                                        default:                         // 其它情况
                                                return alwaysPendingPromise;
                                }
                        })
                        .catch(error => {
                                $alert.info(error);
                                return alwaysPendingPromise;
                        })
        }
});
export default http;