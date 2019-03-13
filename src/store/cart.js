import store from './index';
export default {
        namespaced:true,
        state: {
                cart:null,
                isEdit:false,
                isInit:true,
        },
        getters: {
        },
        mutations: {
                _init(state,payload){
                        state.cart = payload;
                },
                _minus(state,paylod){
                        state.cart[paylod].quantity --;
                },
                _augment(state,paylod){
                        state.cart[paylod].quantity ++;
                },
                changeInitState(state,payload){
                        state.isInit = payload;
                },
                changeEditState(state,payload){
                        if(payload) state.isEdit=false; else state.isEdit = !state.isEdit;
                },
                setOrder(state,payload){
                        let orderData = [];
                        payload.forEach(item=>{
                                orderData.push(state.cart.find(v=>v.cartid===item));
                        });
                        store.commit('order/setOrder',orderData);
                },
                changeCartNum(state,payload){
                        state.cartNum+=payload;
                }
        },
        actions: {
                init({state,commit,rootState:{$http,api}}){
                        if(!state.isInit) return;
                        return $http.post(api.cart.ALL)
                                .then(result=>{
                                        commit('_init',result.data);
                                        commit('changeInitState',false);
                                        return result.ok;
                                })
                },
                minus({state,commit,rootState:{$http,api}},payload){
                      return $http.post(api.cart.REDUCE,{pid:payload.id})
                                .then(result=>{
                                        if(result.ok)commit('_minus',payload.n);
                                        return result.ok
                                });
                },
                augment({state,commit,rootState:{$http,api}},payload){
                       return $http.post(api.cart.ADD,{pid:payload.id,num:1})
                                .then(result=>{
                                        if(result.ok)commit('_augment',payload.n);
                                        return result.ok
                                });
                },
                remove({state,commit,rootState:{$http,api}},payload){
                        return $http.post(api.cart.REMOVE,{pidArr:payload})
                                .then(result=>{
                                        return result.ok
                                });
                }
        }
}