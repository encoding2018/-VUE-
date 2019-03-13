import Vue from 'vue';

export default {
        namespaced: true,
        state: {
                product: [],
                banner: [],
                bannerMenu: [],
                poster: [],
                isInit: true
        },
        getters: {
        },
        mutations: {
                _init(state, payload){
                        for(let i in payload){state[i] = payload[i]}
                        state.isInit = false;
                },
                _update(state,payload){
                        state.product.push(...payload);
                }
        },
        actions: {
                init({state, commit, rootState: {$http, api}}, payload){
                        if(!state.isInit) return;
                        $http.post(api.index.All)
                                .then(result => {
                                        commit('_init', result);
                                })
                },
                update({state, commit, rootState: {$http, api}}, payload){
                        return $http.post(api.index.UPDATE, {cid: payload})
                                .then(result => {
                                        commit('_update',result);
                                        return 'ok';
                                });
                },
        }
}