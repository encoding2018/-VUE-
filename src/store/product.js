export default {
        namespaced: true,
        state: {
                product: {}
        },
        getters: {},
        mutations: {
                _init(state, payload){
                        state.product = payload
                }
        },
        actions: {
                init({state, commit, rootState: {$http, api}}, payload){
                        return $http.post(api.product.ALL, {id: payload})
                                .then(result => {
                                        commit('_init', result);
                                        return 'ok';
                                });
                }
        }
}