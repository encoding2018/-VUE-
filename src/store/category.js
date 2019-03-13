export default {
        namespaced: true,
        state: {
                categoryData:[],
                isInit:true
        },
        getter: {},
        mutations: {
                _init(state,payload){
                        state.categoryData=payload;
                        state.isInit = false;
                },
                _update(state,payload){
                        state.categoryData.push(...payload);
                },
        },
        actions: {
                init({state, commit, rootState: {$http, api}}, payload){
                        if(!state.isInit) return;
                        $http.post(api.category.ALL,{cid:payload})
                                .then(result => {
                                        commit('_init',result);
                                });
                },
                update({state, commit, rootState: {$http, api}}, payload){
                        $http.post(api.category.UPDATE,{cid:payload})
                                .then(result => commit('_update',result));
                }
        }
}