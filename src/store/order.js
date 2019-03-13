export default {
        namespaced:true,
        state:{
                orderData:[],
                allOrder:[],
                isInit:true
        },
        getters:{

        },
        mutations:{
                setOrder(state,payload){
                        state.orderData = payload
                },
                _getAllOrder(state,payload){
                        for(let i in payload.order){
                                payload.order[i].data = payload.orderProduct.filter(item=>item.orderid === payload.order[i].id);
                        }
                        state.allOrder = payload.order;
                },
                changeInitState(state, payload){
                        state.isInit = payload;
                }
        },
        actions:{
                getAllOrder({state,commit,rootState:{$http,api}}){
                        if(!state.isInit) return;
                        $http.post(api.order.GET)
                                .then(result=>{
                                        commit('_getAllOrder',result);
                                        commit('changeInitState',false);
                                });
                }
        }
}