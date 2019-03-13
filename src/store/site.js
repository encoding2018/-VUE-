export default {
        namespaced:true,
        state: {
                site: [],
                isEdit:false,
                EditId:0,
                isSelect:false,
                isSelectEdit:false,
                pitchSite:{},
                isInit:true,
                isChange:false
        },
        getters: {

        },
        mutations: {
                _getSite(state,payload){
                        state.site = payload;
                        state.pitchSite = payload[0];
                },
                changeEditState(state,payload){
                        state.isEdit = payload.state;
                        state.EditId = payload.EditId;
                },
                changeSelect(state,payload){
                        state.isSelect = payload.state;
                        if(payload.siteId) state.pitchSite = state.site.find(item=>item.id===payload.siteId);
                },
                changeIsSelectEdit(state,payload){
                        state.isSelectEdit = payload;
                },
                changeInitState(state,payload){
                        state.isInit = payload;
                }
        },
        actions: {
                getSite({state, commit, rootState: {$http, api}}){
                        if(!state.isInit) return;
                        return $http.post(api.site.GET)
                                .then(result => {
                                        commit('_getSite',result.data);
                                        commit('changeInitState',false);
                                        return result.ok;
                                })
                }
        }
}